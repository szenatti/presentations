//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./actuals-by-department.dax?raw";
import spec from "./actuals-by-department.json";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimdepartment[DepartmentName]": { name: "DepartmentName", displayName: "Department" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
};

/** Actual expenditure grouped by department, sorted highest first. */
export function actualsByDepartment(filters: FinanceFilters) {
    const query = applySummarizeFilters(baseQuery, filters);
    return { connection, query, columnMetadata, vegaLiteSpec: spec as VisualizationSpec };
}
