//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import { budgetActual } from "@/queries/finance-overview/budget-actual";

describe("budgetActual", () => {
    it("targets financeModel with AUD-formatted metadata", () => {
        const result = budgetActual({
            year: 2026,
            monthNumber: 6,
            departmentKey: "D001",
            categoryKey: "C001",
        });
        expect(result.connection).toBe("financeModel");
        expect(result.columnMetadata["[Actual Amount]"]).toMatchObject({
            name: "ActualAmount",
            format: "$#,##0.00",
        });
    });

    it("injects the four combination filters and removes the placeholder", () => {
        const { query } = budgetActual({
            year: 2026,
            monthNumber: 6,
            departmentKey: "D001",
            categoryKey: "C001",
        });
        expect(query).not.toContain("/*__FILTERS__*/");
        expect(query).toContain("TREATAS({2026}, dimmonth[CalendarYear])");
        expect(query).toContain("TREATAS({6}, dimmonth[MonthNumber])");
        expect(query).toContain('TREATAS({"D001"}, dimdepartment[DepartmentKey])');
        expect(query).toContain('TREATAS({"C001"}, dimcategory[CategoryKey])');
    });

    it("escapes double quotes in dimension keys", () => {
        const { query } = budgetActual({
            year: 2026,
            monthNumber: 6,
            departmentKey: 'A"B',
            categoryKey: "C001",
        });
        expect(query).toContain('TREATAS({"A""B"}, dimdepartment[DepartmentKey])');
    });
});
