//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import type { QueryTable } from "@microsoft/fabric-app-data";
import type { BudgetRow } from "@/services/budget.service";
import {
    buildDepartmentTable,
    buildMonthlyTable,
    resolveFilters,
    sumBudgetByDepartment,
    type ResolvedBudgetFilters,
} from "@/lib/budget-aggregate";

const budgets: BudgetRow[] = [
    { id: "1", financialYear: 2026, monthNumber: 6, budgetDate: new Date("2026-06-01"), departmentKey: "D001", categoryKey: "C001", budgetAmount: 800 },
    { id: "2", financialYear: 2026, monthNumber: 6, budgetDate: new Date("2026-06-01"), departmentKey: "D001", categoryKey: "C002", budgetAmount: 200 },
    { id: "3", financialYear: 2025, monthNumber: 6, budgetDate: new Date("2025-06-01"), departmentKey: "D002", categoryKey: "C001", budgetAmount: 999 },
];

const noFilters: ResolvedBudgetFilters = {
    year: null,
    monthNumber: null,
    departmentKey: null,
    categoryKey: null,
};

describe("sumBudgetByDepartment", () => {
    it("sums by department key across categories", () => {
        const totals = sumBudgetByDepartment(budgets, noFilters);
        expect(totals.get("D001")).toBe(1000);
        expect(totals.get("D002")).toBe(999);
    });

    it("respects the year filter", () => {
        const totals = sumBudgetByDepartment(budgets, { ...noFilters, year: 2026 });
        expect(totals.get("D001")).toBe(1000);
        expect(totals.has("D002")).toBe(false); // D002 budget is 2025
    });

    it("respects the category filter", () => {
        const totals = sumBudgetByDepartment(budgets, { ...noFilters, categoryKey: "C001" });
        expect(totals.get("D001")).toBe(800);
        expect(totals.get("D002")).toBe(999);
    });
});

describe("buildDepartmentTable", () => {
    const actuals: QueryTable = {
        columns: [
            { name: "dimdepartment[DepartmentKey]", dataType: "string" },
            { name: "dimdepartment[DepartmentName]", dataType: "string" },
            { name: "[Actual Amount]", dataType: "number" },
        ],
        rows: [
            ["D001", "Information Technology", 1200],
            ["D002", "Finance", 500],
        ],
    };

    it("emits Actual and Budget rows per department, joined by key", () => {
        const table = buildDepartmentTable(actuals, budgets, { ...noFilters, year: 2026 });
        expect(table.columns.map((c) => c.name)).toEqual(["Department", "Series", "Amount"]);
        expect(table.rows).toEqual([
            ["Information Technology", "Actual", 1200],
            ["Information Technology", "Budget", 1000],
            ["Finance", "Actual", 500],
            ["Finance", "Budget", null], // no 2026 budget for Finance
        ]);
    });
});

describe("buildMonthlyTable", () => {
    const actuals: QueryTable = {
        columns: [
            { name: "dimmonth[MonthStart]", dataType: "string" },
            { name: "dimmonth[MonthName]", dataType: "string" },
            { name: "dimmonth[CalendarYear]", dataType: "number" },
            { name: "dimmonth[MonthNumber]", dataType: "number" },
            { name: "[Actual Amount]", dataType: "number" },
        ],
        rows: [
            ["2026-05-01T00:00:00", "May", 2026, 5, 300],
            ["2026-06-01T00:00:00", "June", 2026, 6, 400],
        ],
    };

    it("joins budgets to months by year and month number", () => {
        const table = buildMonthlyTable(actuals, budgets, noFilters);
        expect(table.rows).toEqual([
            ["2026-05-01T00:00:00", "Actual", 300],
            ["2026-05-01T00:00:00", "Budget", null], // no budget for 2026-05
            ["2026-06-01T00:00:00", "Actual", 400],
            ["2026-06-01T00:00:00", "Budget", 1000], // D001 C001+C002 for 2026-06
        ]);
    });
});

describe("resolveFilters", () => {
    const maps = {
        monthNameToNumber: new Map([["June", 6]]),
        departmentNameToKey: new Map([["Finance", "D002"]]),
        categoryNameToKey: new Map([["Software & SaaS", "C001"]]),
    };

    it("maps display-name filters to keys and numbers", () => {
        expect(
            resolveFilters(
                { year: 2026, month: "June", department: "Finance", category: "Software & SaaS" },
                maps,
            ),
        ).toEqual({ year: 2026, monthNumber: 6, departmentKey: "D002", categoryKey: "C001" });
    });

    it("passes through nulls for cleared filters", () => {
        expect(
            resolveFilters({ year: null, month: null, department: null, category: null }, maps),
        ).toEqual({ year: null, monthNumber: null, departmentKey: null, categoryKey: null });
    });
});
