//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyCalculateTableFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./transaction-details.dax?raw";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "[TransactionDate]": { name: "TransactionDate", displayName: "Date", format: "dd mmm yyyy" },
    "[TransactionID]": { name: "TransactionID", displayName: "Transaction ID" },
    "[Department]": { name: "Department", displayName: "Department" },
    "[Category]": { name: "Category", displayName: "Cost Category" },
    "[Vendor]": { name: "Vendor", displayName: "Vendor" },
    "[Description]": { name: "Description", displayName: "Description" },
    "[PaymentMethod]": { name: "PaymentMethod", displayName: "Payment Method" },
    "[PostingStatus]": { name: "PostingStatus", displayName: "Status" },
    "[NetAmount_AUD]": { name: "NetAmountAUD", displayName: "Net (AUD)", format: "$#,##0.00" },
    "[GST_AUD]": { name: "GSTAUD", displayName: "GST (AUD)", format: "$#,##0.00" },
    "[GrossAmount_AUD]": { name: "GrossAmountAUD", displayName: "Gross (AUD)", format: "$#,##0.00" },
};

/** Row-level transaction detail for the data grid, newest first. */
export function transactionDetails(filters: FinanceFilters) {
    const query = applyCalculateTableFilters(baseQuery, filters);
    return { connection, query, columnMetadata };
}
