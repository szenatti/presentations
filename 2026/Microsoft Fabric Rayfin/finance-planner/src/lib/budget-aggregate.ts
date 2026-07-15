//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { QueryTable } from "@microsoft/fabric-app-data";
import type { DataTable } from "@microsoft/fabric-visuals-core";
import type { BudgetRow } from "@/services/budget.service";
import type { FinanceFilters } from "@/lib/finance-filters";

/**
 * Merges actual expenditure (from the semantic model) with budgets (from the
 * Rayfin database) into long-format `DataTable`s that chart a "Budget" series
 * alongside "Actual". Budgets are filtered/aggregated to each chart's grain in
 * TypeScript, then joined to the actuals rows by dimension key.
 */

export const ACTUAL_SERIES = "Actual";
export const BUDGET_SERIES = "Budget";
const AMOUNT_FORMAT = "$#,##0.00";

/** Page filters resolved from display names to the keys/numbers budgets store. */
export interface ResolvedBudgetFilters {
    year: number | null;
    monthNumber: number | null;
    departmentKey: string | null;
    categoryKey: string | null;
}

/** Name→key/number lookups used to resolve the page filters. */
export interface DimensionMaps {
    monthNameToNumber: Map<string, number>;
    departmentNameToKey: Map<string, string>;
    categoryNameToKey: Map<string, string>;
}

/** Translate the display-name page filters into the keys/numbers budgets use. */
export function resolveFilters(filters: FinanceFilters, maps: DimensionMaps): ResolvedBudgetFilters {
    return {
        year: filters.year,
        monthNumber:
            filters.month != null ? maps.monthNameToNumber.get(filters.month) ?? null : null,
        departmentKey:
            filters.department != null ? maps.departmentNameToKey.get(filters.department) ?? null : null,
        categoryKey:
            filters.category != null ? maps.categoryNameToKey.get(filters.category) ?? null : null,
    };
}

function passesYear(b: BudgetRow, r: ResolvedBudgetFilters): boolean {
    return r.year == null || b.financialYear === r.year;
}
function passesMonth(b: BudgetRow, r: ResolvedBudgetFilters): boolean {
    return r.monthNumber == null || b.monthNumber === r.monthNumber;
}
function passesDepartment(b: BudgetRow, r: ResolvedBudgetFilters): boolean {
    return r.departmentKey == null || b.departmentKey === r.departmentKey;
}
function passesCategory(b: BudgetRow, r: ResolvedBudgetFilters): boolean {
    return r.categoryKey == null || b.categoryKey === r.categoryKey;
}

/** Sum budgets by department key (respecting year / month / category filters). */
export function sumBudgetByDepartment(
    budgets: BudgetRow[],
    r: ResolvedBudgetFilters,
): Map<string, number> {
    const totals = new Map<string, number>();
    for (const b of budgets) {
        if (!passesYear(b, r) || !passesMonth(b, r) || !passesCategory(b, r)) continue;
        totals.set(b.departmentKey, (totals.get(b.departmentKey) ?? 0) + b.budgetAmount);
    }
    return totals;
}

/** Sum budgets by category key (respecting year / month / department filters). */
export function sumBudgetByCategory(
    budgets: BudgetRow[],
    r: ResolvedBudgetFilters,
): Map<string, number> {
    const totals = new Map<string, number>();
    for (const b of budgets) {
        if (!passesYear(b, r) || !passesMonth(b, r) || !passesDepartment(b, r)) continue;
        totals.set(b.categoryKey, (totals.get(b.categoryKey) ?? 0) + b.budgetAmount);
    }
    return totals;
}

/**
 * Sum budgets by `${financialYear}-${monthNumber}` (respecting department /
 * category filters). Year/month alignment is handled by the join to the actuals
 * rows, so the month filter is intentionally not applied here.
 */
export function sumBudgetByMonth(
    budgets: BudgetRow[],
    r: ResolvedBudgetFilters,
): Map<string, number> {
    const totals = new Map<string, number>();
    for (const b of budgets) {
        if (!passesDepartment(b, r) || !passesCategory(b, r)) continue;
        const key = `${b.financialYear}-${b.monthNumber}`;
        totals.set(key, (totals.get(key) ?? 0) + b.budgetAmount);
    }
    return totals;
}

function columnIndex(table: QueryTable, name: string): number {
    return table.columns.findIndex((column) => column.name === name);
}

function longTable(name: string, displayName: string, rows: unknown[][]): DataTable {
    return {
        columns: [
            { name, displayName },
            { name: "Series", displayName: "Series" },
            { name: "Amount", displayName: "Amount", format: AMOUNT_FORMAT },
        ],
        rows,
    };
}

/** Long-format [Department, Series, Amount] for a grouped Actual-vs-Budget bar chart. */
export function buildDepartmentTable(
    actuals: QueryTable,
    budgets: BudgetRow[],
    r: ResolvedBudgetFilters,
): DataTable {
    const keyIndex = columnIndex(actuals, "dimdepartment[DepartmentKey]");
    const nameIndex = columnIndex(actuals, "dimdepartment[DepartmentName]");
    const actualIndex = columnIndex(actuals, "[Actual Amount]");
    const budgetByKey = sumBudgetByDepartment(budgets, r);

    const rows: unknown[][] = [];
    for (const row of actuals.rows) {
        const name = String(row[nameIndex]);
        const key = String(row[keyIndex]);
        const actual = Number(row[actualIndex] ?? 0);
        const budget = budgetByKey.get(key);
        rows.push([name, ACTUAL_SERIES, actual]);
        rows.push([name, BUDGET_SERIES, budget ?? null]);
    }
    return longTable("Department", "Department", rows);
}

/** Long-format [Cost Category, Series, Amount] for a grouped Actual-vs-Budget bar chart. */
export function buildCategoryTable(
    actuals: QueryTable,
    budgets: BudgetRow[],
    r: ResolvedBudgetFilters,
): DataTable {
    const keyIndex = columnIndex(actuals, "dimcategory[CategoryKey]");
    const nameIndex = columnIndex(actuals, "dimcategory[CategoryName]");
    const actualIndex = columnIndex(actuals, "[Actual Amount]");
    const budgetByKey = sumBudgetByCategory(budgets, r);

    const rows: unknown[][] = [];
    for (const row of actuals.rows) {
        const name = String(row[nameIndex]);
        const key = String(row[keyIndex]);
        const actual = Number(row[actualIndex] ?? 0);
        const budget = budgetByKey.get(key);
        rows.push([name, ACTUAL_SERIES, actual]);
        rows.push([name, BUDGET_SERIES, budget ?? null]);
    }
    return longTable("CostCategory", "Cost Category", rows);
}

/** Long-format [Month, Series, Amount] for a dual-line Actual-vs-Budget trend. */
export function buildMonthlyTable(
    actuals: QueryTable,
    budgets: BudgetRow[],
    r: ResolvedBudgetFilters,
): DataTable {
    const startIndex = columnIndex(actuals, "dimmonth[MonthStart]");
    const yearIndex = columnIndex(actuals, "dimmonth[CalendarYear]");
    const monthIndex = columnIndex(actuals, "dimmonth[MonthNumber]");
    const actualIndex = columnIndex(actuals, "[Actual Amount]");
    const budgetByMonth = sumBudgetByMonth(budgets, r);

    const rows: unknown[][] = [];
    for (const row of actuals.rows) {
        const start = row[startIndex];
        const year = Number(row[yearIndex]);
        const month = Number(row[monthIndex]);
        const actual = Number(row[actualIndex] ?? 0);
        const budget = budgetByMonth.get(`${year}-${month}`);
        rows.push([start, ACTUAL_SERIES, actual]);
        rows.push([start, BUDGET_SERIES, budget ?? null]);
    }
    return {
        columns: [
            { name: "MonthStart", displayName: "Month", format: "mmm yyyy" },
            { name: "Series", displayName: "Series" },
            { name: "Amount", displayName: "Amount", format: AMOUNT_FORMAT },
        ],
        rows,
    };
}
