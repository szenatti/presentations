//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import { kpiSummary } from "@/queries/finance-overview/kpi-summary";
import { EMPTY_FILTERS } from "@/lib/finance-filters";

describe("kpiSummary", () => {
    it("targets the financeModel connection", () => {
        expect(kpiSummary(EMPTY_FILTERS).connection).toBe("financeModel");
    });

    it("exposes AUD-formatted metadata for all five KPIs", () => {
        const { columnMetadata } = kpiSummary(EMPTY_FILTERS);
        expect(Object.keys(columnMetadata)).toHaveLength(5);
        expect(columnMetadata["[Actual Amount]"]).toMatchObject({
            name: "ActualAmount",
            format: "$#,##0.00",
        });
        expect(columnMetadata["[MoM Change %]"]).toMatchObject({
            name: "MoMChangePct",
            format: "0.0%",
        });
    });

    it("produces a filter-free query when nothing is selected", () => {
        const { query } = kpiSummary(EMPTY_FILTERS);
        expect(query).not.toContain("/*__FILTERS__*/");
        expect(query).not.toContain("TREATAS");
        expect(query).toContain("[Actual Amount]");
    });

    it("wraps the ROW with CALCULATETABLE filters when filters are active", () => {
        const { query } = kpiSummary({
            year: 2026,
            month: "June",
            department: null,
            category: null,
        });
        expect(query).toContain("TREATAS({2026}, dimmonth[CalendarYear])");
        expect(query).toContain('TREATAS({"June"}, dimmonth[MonthName])');
    });
});
