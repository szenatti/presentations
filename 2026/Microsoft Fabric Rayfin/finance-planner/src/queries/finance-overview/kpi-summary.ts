//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyCalculateTableFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./kpi-summary.dax?raw";

const connection = "financeModel";

/** Keyed by the exact DAX output column names (verified via the CLI). */
const columnMetadata: ColumnMetadataMap = {
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
    "[Transaction Count]": { name: "TransactionCount", displayName: "Transaction Count", format: "#,##0" },
    "[Average Transaction]": { name: "AverageTransaction", displayName: "Average Transaction", format: "$#,##0.00" },
    "[Previous Month Actual]": { name: "PreviousMonthActual", displayName: "Previous Month Actual", format: "$#,##0.00" },
    "[MoM Change %]": { name: "MoMChangePct", displayName: "Month-over-Month Change %", format: "0.0%" },
};

/** The five headline KPIs for the Finance Overview page. */
export function kpiSummary(filters: FinanceFilters) {
    const query = applyCalculateTableFilters(baseQuery, filters);
    return { connection, query, columnMetadata };
}
