//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import { monthlyActuals } from "@/queries/finance-overview/monthly-actuals";
import { EMPTY_FILTERS } from "@/lib/finance-filters";

describe("monthlyActuals", () => {
    it("applies Year / Department / Category but ignores the Month filter", () => {
        const { query } = monthlyActuals({
            year: 2026,
            month: "June",
            department: "Finance",
            category: null,
        });
        expect(query).toContain("TREATAS({2026}, dimmonth[CalendarYear])");
        expect(query).toContain('TREATAS({"Finance"}, dimdepartment[DepartmentName])');
        // The Month filter must NOT collapse the trend to a single point.
        expect(query).not.toContain('TREATAS({"June"}, dimmonth[MonthName])');
        expect(query).not.toContain("/*__FILTERS__*/");
    });

    it("returns a line-chart spec and Actual Amount metadata", () => {
        const result = monthlyActuals(EMPTY_FILTERS);
        expect(result.connection).toBe("financeModel");
        expect(result.vegaLiteSpec).toBeDefined();
        expect(result.columnMetadata["[Actual Amount]"]).toMatchObject({
            name: "ActualAmount",
            format: "$#,##0.00",
        });
        expect(result.query).not.toContain("TREATAS");
    });
});
