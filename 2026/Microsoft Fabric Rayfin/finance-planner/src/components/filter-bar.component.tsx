//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { RotateCcw } from "lucide-react";
import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import {
    filterCategories,
    filterDepartments,
    filterMonths,
    filterYears,
} from "@/queries/finance-overview";
import type { FinanceFilters } from "@/lib/finance-filters";
import { FilterSelect, type FilterOption } from "./filter-select.component";

interface FilterBarProps {
    filters: FinanceFilters;
    onChange: (patch: Partial<FinanceFilters>) => void;
    onReset: () => void;
}

/** Extract options from a single-column query result at the given index. */
function toOptions(result: CachedQueryResult | undefined, columnIndex = 0): FilterOption[] {
    if (result?.status !== "success") return [];
    return result.table.rows
        .map((row) => row[columnIndex])
        .filter((value): value is string | number => value != null)
        .map((value) => ({ value: String(value), label: String(value) }));
}

/**
 * Global page filters: Calendar Year, Month, Department, and Cost Category.
 * Option lists come from the semantic model; each selection re-runs the
 * page's queries. Sticks to the top of the viewport while scrolling.
 */
export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
    const years = useSemanticModelQuery(filterYears());
    const months = useSemanticModelQuery(filterMonths());
    const departments = useSemanticModelQuery(filterDepartments());
    const categories = useSemanticModelQuery(filterCategories());

    const yearOptions = toOptions(years.data, 0);
    const monthOptions = toOptions(months.data, 1); // columns: MonthNumber, MonthName
    const departmentOptions = toOptions(departments.data, 0);
    const categoryOptions = toOptions(categories.data, 0);

    const hasActiveFilter =
        filters.year != null ||
        filters.month != null ||
        filters.department != null ||
        filters.category != null;

    return (
        <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-[1600px] flex-col gap-m px-xl py-m lg:flex-row lg:items-end lg:justify-between">
                <div className="grid flex-1 grid-cols-2 gap-m sm:grid-cols-2 lg:grid-cols-4">
                    <FilterSelect
                        label="Calendar Year"
                        allLabel="All years"
                        value={filters.year != null ? String(filters.year) : ""}
                        options={yearOptions}
                        disabled={years.isLoading}
                        onChange={(value) => onChange({ year: value === "" ? null : Number(value) })}
                    />
                    <FilterSelect
                        label="Month"
                        allLabel="All months"
                        value={filters.month ?? ""}
                        options={monthOptions}
                        disabled={months.isLoading}
                        onChange={(value) => onChange({ month: value === "" ? null : value })}
                    />
                    <FilterSelect
                        label="Department"
                        allLabel="All departments"
                        value={filters.department ?? ""}
                        options={departmentOptions}
                        disabled={departments.isLoading}
                        onChange={(value) => onChange({ department: value === "" ? null : value })}
                    />
                    <FilterSelect
                        label="Cost Category"
                        allLabel="All categories"
                        value={filters.category ?? ""}
                        options={categoryOptions}
                        disabled={categories.isLoading}
                        onChange={(value) => onChange({ category: value === "" ? null : value })}
                    />
                </div>

                <button
                    type="button"
                    onClick={onReset}
                    disabled={!hasActiveFilter}
                    className="flex h-10 shrink-0 items-center justify-center gap-s rounded-xl border border-border bg-card px-l text-300 font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RotateCcw className="icon-size-200" aria-hidden="true" />
                    Reset
                </button>
            </div>
        </div>
    );
}
