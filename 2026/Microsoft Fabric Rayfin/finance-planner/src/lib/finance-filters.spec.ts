//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import {
    applyCalculateTableFilters,
    applySummarizeFilters,
    buildFilterClauses,
    EMPTY_FILTERS,
    type FinanceFilters,
} from "@/lib/finance-filters";

describe("buildFilterClauses", () => {
    it("returns no clauses when nothing is selected", () => {
        expect(buildFilterClauses(EMPTY_FILTERS)).toEqual([]);
    });

    it("builds a TREATAS clause for each active selection", () => {
        const filters: FinanceFilters = {
            year: 2026,
            month: "June",
            department: "Finance",
            category: "Software & SaaS",
        };
        expect(buildFilterClauses(filters)).toEqual([
            "TREATAS({2026}, dimmonth[CalendarYear])",
            'TREATAS({"June"}, dimmonth[MonthName])',
            'TREATAS({"Finance"}, dimdepartment[DepartmentName])',
            'TREATAS({"Software & SaaS"}, dimcategory[CategoryName])',
        ]);
    });

    it("omits the month clause when includeMonth is false", () => {
        const filters: FinanceFilters = {
            year: 2026,
            month: "June",
            department: null,
            category: null,
        };
        expect(buildFilterClauses(filters, { includeMonth: false })).toEqual([
            "TREATAS({2026}, dimmonth[CalendarYear])",
        ]);
    });

    it("escapes double quotes in string values", () => {
        const filters: FinanceFilters = {
            year: null,
            month: null,
            department: 'A "B"',
            category: null,
        };
        expect(buildFilterClauses(filters)).toEqual([
            'TREATAS({"A ""B"""}, dimdepartment[DepartmentName])',
        ]);
    });
});

describe("applySummarizeFilters", () => {
    const base =
        'EVALUATE SUMMARIZECOLUMNS(dimdepartment[DepartmentName],\n    /*__FILTERS__*/\n    "Actual Amount", [Actual Amount])';

    it("removes the placeholder and injects nothing when no filters are active", () => {
        const query = applySummarizeFilters(base, EMPTY_FILTERS);
        expect(query).not.toContain("/*__FILTERS__*/");
        expect(query).not.toContain("TREATAS");
    });

    it("injects each clause with a trailing comma before the measures", () => {
        const query = applySummarizeFilters(base, {
            year: 2026,
            month: null,
            department: null,
            category: null,
        });
        expect(query).not.toContain("/*__FILTERS__*/");
        expect(query).toContain("TREATAS({2026}, dimmonth[CalendarYear]),");
    });
});

describe("applyCalculateTableFilters", () => {
    const base = 'EVALUATE\nCALCULATETABLE(\n    ROW("x", 1)\n    /*__FILTERS__*/\n)';

    it("removes the placeholder when no filters are active", () => {
        const query = applyCalculateTableFilters(base, EMPTY_FILTERS);
        expect(query).not.toContain("/*__FILTERS__*/");
        expect(query).not.toContain("TREATAS");
    });

    it("injects each clause with a leading comma after the table expression", () => {
        const query = applyCalculateTableFilters(base, {
            year: 2026,
            month: "June",
            department: null,
            category: null,
        });
        expect(query).not.toContain("/*__FILTERS__*/");
        expect(query).toMatch(/,\s*TREATAS\(\{2026\}, dimmonth\[CalendarYear\]\)/);
        expect(query).toContain('TREATAS({"June"}, dimmonth[MonthName])');
    });
});
