import { describe, expect, it } from "vitest";

import { EMPTY_FILTERS } from "@/lib/finance-filters";
import { byCategoryGroup, byDepartment, detailGrid, kpiSummary, monthlyTrend } from ".";

const filtered = {
    ...EMPTY_FILTERS,
    year: 2026,
    month: 5,
    businessUnit: "Corporate Services",
    department: "Finance",
    categoryGroup: "Operating Expenses",
    category: "Software & SaaS",
};

describe("Finance Position query factories", () => {
    it.each([
        ["kpi", kpiSummary(filtered).query],
        ["trend", monthlyTrend(filtered).query],
        ["department", byDepartment(filtered).query],
        ["category", byCategoryGroup(filtered).query],
        ["detail", detailGrid(filtered).query],
    ])("injects all model filters into %s", (_name, query) => {
        expect(query).toContain("'dimmonth'[CalendarYear]");
        expect(query).toContain("'dimmonth'[MonthNumber]");
        expect(query).toContain("'dimdepartment'[BusinessUnit]");
        expect(query).toContain("'dimdepartment'[DepartmentName]");
        expect(query).toContain("'dimcategory'[CategoryGroup]");
        expect(query).toContain("'dimcategory'[CategoryName]");
        expect(query).not.toContain("/*__FILTERS__*/");
    });

    it("keeps chart fields aligned with column metadata", () => {
        const trend = monthlyTrend(EMPTY_FILTERS);
        expect(trend.columnMetadata["[Actual Amount]"].name).toBe("ActualAmount");
        expect(JSON.stringify(trend.vegaLiteSpec)).toContain("ActualAmount");
        expect(JSON.stringify(trend.vegaLiteSpec)).toContain('"field":"MonthLabel"');
        expect(JSON.stringify(trend.vegaLiteSpec)).toContain('"field":"MonthSort"');
        expect(JSON.stringify(trend.vegaLiteSpec)).not.toContain('"type":"temporal"');
        expect(JSON.stringify(byDepartment(EMPTY_FILTERS).vegaLiteSpec)).toContain("DepartmentName");
        expect(JSON.stringify(byCategoryGroup(EMPTY_FILTERS).vegaLiteSpec)).toContain("CategoryGroup");
    });
});