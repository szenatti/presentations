//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { useRef, useState, type FormEvent } from "react";
import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import {
    CircleCheck,
    LoaderCircle,
    Pencil,
    Save,
    TriangleAlert,
} from "lucide-react";
import { useAuth } from "@/hooks/auth.context";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import {
    budgetCategories,
    budgetDepartments,
    filterMonths,
    filterYears,
} from "@/queries/finance-overview";
import { findExistingBudget, saveBudget } from "@/services/budget.service";
import { Card } from "./card.component";
import { FilterSelect, type FilterOption } from "./filter-select.component";

type Option = FilterOption;

/** Build `{ value, label }` options from a two-column query result. */
function optionsFrom(
    result: CachedQueryResult | undefined,
    valueIndex: number,
    labelIndex: number,
): Option[] {
    if (result?.status !== "success") return [];
    return result.table.rows
        .filter((row) => row[valueIndex] != null && row[labelIndex] != null)
        .map((row) => ({ value: String(row[valueIndex]), label: String(row[labelIndex]) }));
}

interface SubmittedBudget {
    year: number;
    monthNumber: number;
    departmentKey: string;
    categoryKey: string;
    budget: number;
    departmentName: string;
    categoryName: string;
    monthName: string;
    updated: boolean;
}

/**
 * Budget Planner — enter (or update) a monthly budget for a department + cost
 * category. Saving upserts a single `BudgetEntry` row and refreshes the budget
 * history table without reloading the page.
 */
export function BudgetPlanner({ onSaved }: { onSaved?: () => void }) {
    const { session } = useAuth();
    const createdBy = session?.user?.email ?? session?.user?.id ?? "unknown";

    const years = useSemanticModelQuery(filterYears());
    const months = useSemanticModelQuery(filterMonths());
    const departments = useSemanticModelQuery(budgetDepartments());
    const categories = useSemanticModelQuery(budgetCategories());

    const yearOptions = optionsFrom(years.data, 0, 0);
    const monthOptions = optionsFrom(months.data, 0, 1); // [MonthNumber, MonthName]
    const departmentOptions = optionsFrom(departments.data, 0, 1); // [Key, Name]
    const categoryOptions = optionsFrom(categories.data, 0, 1); // [Key, Name]

    const [year, setYear] = useState("");
    const [monthNumber, setMonthNumber] = useState("");
    const [departmentKey, setDepartmentKey] = useState("");
    const [categoryKey, setCategoryKey] = useState("");
    const [budgetAmount, setBudgetAmount] = useState("");
    const [comment, setComment] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<SubmittedBudget | null>(null);
    const [existingId, setExistingId] = useState<string | null>(null);
    const [lookupLoading, setLookupLoading] = useState(false);
    const lookupToken = useRef(0);

    const amountNumber = Number(budgetAmount);
    const amountValid = budgetAmount.trim() !== "" && Number.isFinite(amountNumber) && amountNumber >= 0;
    const canSubmit =
        Boolean(year && monthNumber && departmentKey && categoryKey) && amountValid && !saving;

    const labelFor = (options: Option[], value: string) =>
        options.find((option) => option.value === value)?.label ?? value;

    /**
     * When all four keys are chosen, load any existing budget for that
     * combination and prefill the amount/comment so the user edits the current
     * value. A monotonic token guards against out-of-order responses when the
     * selection changes quickly.
     */
    async function maybeLoadExisting(combo: {
        year: string;
        monthNumber: string;
        departmentKey: string;
        categoryKey: string;
    }) {
        if (!(combo.year && combo.monthNumber && combo.departmentKey && combo.categoryKey)) {
            setExistingId(null);
            return;
        }
        const token = ++lookupToken.current;
        setLookupLoading(true);
        try {
            const existing = await findExistingBudget({
                financialYear: Number(combo.year),
                monthNumber: Number(combo.monthNumber),
                departmentKey: combo.departmentKey,
                categoryKey: combo.categoryKey,
            });
            if (token !== lookupToken.current) return;
            if (existing) {
                setExistingId(existing.id);
                setBudgetAmount(String(existing.budgetAmount));
                setComment(existing.comment ?? "");
            } else {
                setExistingId(null);
                setBudgetAmount("");
                setComment("");
            }
        } catch {
            if (token === lookupToken.current) setExistingId(null);
        } finally {
            if (token === lookupToken.current) setLookupLoading(false);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!canSubmit) return;

        setSaving(true);
        setSaveError(null);
        try {
            const result = await saveBudget({
                financialYear: Number(year),
                monthNumber: Number(monthNumber),
                departmentKey,
                categoryKey,
                budgetAmount: amountNumber,
                comment: comment.trim() || undefined,
                createdBy,
            });
            setSubmitted({
                year: Number(year),
                monthNumber: Number(monthNumber),
                departmentKey,
                categoryKey,
                budget: amountNumber,
                departmentName: labelFor(departmentOptions, departmentKey),
                categoryName: labelFor(categoryOptions, categoryKey),
                monthName: labelFor(monthOptions, monthNumber),
                updated: result.updated,
            });
            setExistingId(result.id);
            onSaved?.();
        } catch (err) {
            setSaveError(err instanceof Error ? err.message : String(err));
            setSubmitted(null);
        } finally {
            setSaving(false);
        }
    }

    return (
        <Card
            title="Enter monthly budget"
            subtitle="One budget line per month, department, and cost category"
        >
            <div className="flex flex-col gap-l">
                <form onSubmit={handleSubmit} className="flex flex-col gap-l">
                    <div className="grid grid-cols-1 gap-m sm:grid-cols-2">
                        <FilterSelect
                            label="Year"
                            allLabel="Select year"
                            value={year}
                            options={yearOptions}
                            disabled={years.isLoading}
                            onChange={(value) => {
                                setYear(value);
                                void maybeLoadExisting({ year: value, monthNumber, departmentKey, categoryKey });
                            }}
                        />
                        <FilterSelect
                            label="Month"
                            allLabel="Select month"
                            value={monthNumber}
                            options={monthOptions}
                            disabled={months.isLoading}
                            onChange={(value) => {
                                setMonthNumber(value);
                                void maybeLoadExisting({ year, monthNumber: value, departmentKey, categoryKey });
                            }}
                        />
                        <FilterSelect
                            label="Department"
                            allLabel="Select department"
                            value={departmentKey}
                            options={departmentOptions}
                            disabled={departments.isLoading}
                            onChange={(value) => {
                                setDepartmentKey(value);
                                void maybeLoadExisting({ year, monthNumber, departmentKey: value, categoryKey });
                            }}
                        />
                        <FilterSelect
                            label="Cost Category"
                            allLabel="Select category"
                            value={categoryKey}
                            options={categoryOptions}
                            disabled={categories.isLoading}
                            onChange={(value) => {
                                setCategoryKey(value);
                                void maybeLoadExisting({ year, monthNumber, departmentKey, categoryKey: value });
                            }}
                        />
                    </div>

                    {lookupLoading && (
                        <div className="flex items-center gap-s text-100 text-muted-foreground">
                            <LoaderCircle className="icon-size-100 animate-spin" aria-hidden="true" />
                            Checking for an existing budget…
                        </div>
                    )}
                    {!lookupLoading && existingId && (
                        <div className="flex items-center gap-s rounded-xl border border-primary/30 bg-primary/10 p-m text-100 font-medium text-primary">
                            <Pencil className="icon-size-100 shrink-0" aria-hidden="true" />
                            Existing budget loaded — saving will update it.
                        </div>
                    )}

                    <div className="flex flex-col gap-xxs">
                        <label
                            htmlFor="budget-amount"
                            className="text-100 font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                            Budget Amount (AUD)
                        </label>
                        <div className="flex items-center rounded-xl border border-input bg-card focus-within:ring-2 focus-within:ring-ring">
                            <span className="pl-m font-numeric text-300 text-muted-foreground">$</span>
                            <input
                                id="budget-amount"
                                type="number"
                                inputMode="decimal"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={budgetAmount}
                                onChange={(event) => setBudgetAmount(event.target.value)}
                                className="h-10 w-full rounded-xl bg-transparent px-s font-numeric text-300 text-foreground tabular-nums outline-none placeholder:text-muted-foreground"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-xxs">
                        <label
                            htmlFor="budget-comment"
                            className="text-100 font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                            Comment (optional)
                        </label>
                        <textarea
                            id="budget-comment"
                            rows={2}
                            maxLength={1000}
                            placeholder="Add context for this budget…"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            className="resize-none rounded-xl border border-input bg-card px-m py-s text-300 text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    {saveError && (
                        <div className="flex items-start gap-s rounded-xl border border-destructive/40 bg-destructive/10 p-m text-200 text-destructive">
                            <TriangleAlert className="icon-size-200 shrink-0" aria-hidden="true" />
                            <span className="min-w-0 break-words">{saveError}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex h-11 items-center justify-center gap-s rounded-xl bg-primary px-l text-300 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving ? (
                            <LoaderCircle className="icon-size-200 animate-spin" aria-hidden="true" />
                        ) : (
                            <Save className="icon-size-200" aria-hidden="true" />
                        )}
                        {saving ? "Saving…" : existingId ? "Update budget" : "Save budget"}
                    </button>
                </form>
                {submitted && (
                    <div className="flex items-center gap-s rounded-xl border border-primary/30 bg-primary/10 p-m text-200 text-primary">
                        <CircleCheck className="icon-size-200 shrink-0" aria-hidden="true" />
                        <span>
                            Budget for {submitted.departmentName}, {submitted.categoryName}, {submitted.monthName} {submitted.year} was {submitted.updated ? "updated" : "saved"}.
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
}
