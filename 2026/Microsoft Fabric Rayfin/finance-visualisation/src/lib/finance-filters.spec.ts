import { describe, expect, it } from "vitest";

import {
    applyCalculateTableFilters,
    applySummarizeFilters,
    buildFilterClauses,
    EMPTY_FILTERS,
} from "./finance-filters";

describe("finance filters", () => {
    it("leaves a query executable when no filters are selected", () => {
        expect(applySummarizeFilters("A /*__FILTERS__*/ B", EMPTY_FILTERS)).toBe("A  B");
        expect(applyCalculateTableFilters("A /*__FILTERS__*/ B", EMPTY_FILTERS)).toBe("A  B");
    });

    it("builds all six model filters and escapes quotes", () => {
        const clauses = buildFilterClauses({
            year: 2026,
            month: 5,
            businessUnit: 'Shared "Services"',
            department: "Finance",
            categoryGroup: "Operating Expenses",
            category: "Software & SaaS",
        });

        expect(clauses).toEqual([
            "TREATAS({2026}, 'dimmonth'[CalendarYear])",
            "TREATAS({5}, 'dimmonth'[MonthNumber])",
            'TREATAS({"Shared ""Services"""}, \'dimdepartment\'[BusinessUnit])',
            'TREATAS({"Finance"}, \'dimdepartment\'[DepartmentName])',
            'TREATAS({"Operating Expenses"}, \'dimcategory\'[CategoryGroup])',
            'TREATAS({"Software & SaaS"}, \'dimcategory\'[CategoryName])',
        ]);
    });
});