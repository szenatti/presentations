//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { useMemo } from "react";
import { budgetCategories, budgetDepartments, budgetHistory } from "@/queries/finance-overview";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import type { BudgetRow } from "@/services/budget.service";
import { dimensionNameMap, formatBudgetDate } from "@/lib/budget-history";
import { formatAUD } from "@/lib/format";
import { Card } from "./card.component";

interface BudgetHistoryProps {
    budgets: BudgetRow[];
    isLoading: boolean;
    error: Error | undefined;
}

interface ActualRow {
    actualAmount: number;
}

function key(year: number, month: number, department: string, category: string) {
    return `${year}|${month}|${department}|${category}`;
}

export function BudgetHistory({ budgets, isLoading, error }: BudgetHistoryProps) {
    const actuals = useSemanticModelQuery(budgetHistory());
    const departments = useSemanticModelQuery(budgetDepartments());
    const categories = useSemanticModelQuery(budgetCategories());
    const departmentNames = useMemo(() => dimensionNameMap(departments.data), [departments.data]);
    const categoryNames = useMemo(() => dimensionNameMap(categories.data), [categories.data]);
    const actualRows = useMemo(() => {
        const rows = new Map<string, ActualRow>();
        if (actuals.data?.status !== "success") return rows;
        for (const row of actuals.data.table.rows) {
            rows.set(key(Number(row[0]), Number(row[1]), String(row[2]), String(row[4])), {
                actualAmount: Number(row[6] ?? 0),
            });
        }
        return rows;
    }, [actuals.data]);

    const sortedBudgets = useMemo(
        () => [...budgets].sort((left, right) => String(right.budgetDate).localeCompare(String(left.budgetDate))),
        [budgets],
    );
    const displayError = error ?? actuals.error ?? departments.error ?? categories.error;
    const loading = isLoading || actuals.isLoading || departments.isLoading || categories.isLoading;

    return (
        <Card title="Entered budgets" subtitle="Saved budget lines compared with actual expenditure">
            {displayError ? (
                <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-m text-200 text-destructive">
                    {displayError.message}
                </p>
            ) : loading ? (
                <div className="h-24 animate-pulse rounded-xl bg-muted" aria-label="Loading budgets" />
            ) : sortedBudgets.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border p-l text-center text-200 text-muted-foreground">
                    No budgets have been entered yet.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full border-collapse text-left text-200">
                        <thead className="bg-secondary text-muted-foreground">
                            <tr>
                                <th className="px-m py-s font-semibold">Budget date</th>
                                <th className="px-m py-s font-semibold">Department</th>
                                <th className="px-m py-s font-semibold">Category</th>
                                <th className="px-m py-s text-right font-semibold">Budget</th>
                                <th className="px-m py-s text-right font-semibold">Actual</th>
                                <th className="px-m py-s text-right font-semibold">Variance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBudgets.map((budget) => {
                                const actual = actualRows.get(key(
                                    budget.financialYear,
                                    budget.monthNumber,
                                    budget.departmentKey,
                                    budget.categoryKey,
                                ));
                                const actualAmount = actual?.actualAmount ?? 0;
                                return (
                                    <tr key={budget.id} className="border-t border-border">
                                        <td className="whitespace-nowrap px-m py-s">{formatBudgetDate(budget.budgetDate)}</td>
                                        <td className="px-m py-s">{departmentNames.get(budget.departmentKey) ?? budget.departmentKey}</td>
                                        <td className="px-m py-s">{categoryNames.get(budget.categoryKey) ?? budget.categoryKey}</td>
                                        <td className="px-m py-s text-right font-numeric tabular-nums">{formatAUD(budget.budgetAmount)}</td>
                                        <td className="px-m py-s text-right font-numeric tabular-nums">{formatAUD(actualAmount)}</td>
                                        <td className="px-m py-s text-right font-numeric tabular-nums">{formatAUD(budget.budgetAmount - actualAmount)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
}