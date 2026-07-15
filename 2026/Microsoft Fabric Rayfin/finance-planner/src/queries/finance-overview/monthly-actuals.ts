//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./monthly-actuals.dax?raw";
import spec from "./monthly-actuals.json";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimmonth[MonthStart]": { name: "MonthStart", displayName: "Month", format: "mmm yyyy" },
    "dimmonth[MonthName]": { name: "MonthName", displayName: "Month" },
    "dimmonth[CalendarYear]": { name: "CalendarYear", displayName: "Year" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
};

/**
 * Monthly actual-expenditure trend. Deliberately ignores the Month filter so
 * the full time series stays visible while Year / Department / Category apply.
 */
export function monthlyActuals(filters: FinanceFilters) {
    const query = applySummarizeFilters(baseQuery, filters, { includeMonth: false });
    return { connection, query, columnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
