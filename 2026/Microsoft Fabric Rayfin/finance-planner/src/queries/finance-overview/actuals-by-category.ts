//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./actuals-by-category.dax?raw";
import spec from "./actuals-by-category.json";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimcategory[CategoryName]": { name: "CategoryName", displayName: "Cost Category" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
};

/** Actual expenditure grouped by cost category, sorted highest first. */
export function actualsByCategory(filters: FinanceFilters) {
    const query = applySummarizeFilters(baseQuery, filters);
    return { connection, query, columnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
