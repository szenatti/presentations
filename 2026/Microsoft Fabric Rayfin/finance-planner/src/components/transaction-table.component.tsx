//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { type ReactNode } from "react";
import { DataGrid } from "@microsoft/fabric-datagrid";
import { useCssTheme } from "@microsoft/fabric-visuals";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { transactionDetails } from "@/queries/finance-overview";
import { toDataTable } from "@/lib/to-data-table";
import { formatInteger } from "@/lib/format";
import type { FinanceFilters } from "@/lib/finance-filters";
import { Card } from "./card.component";
import { EmptyState, ErrorState, LoadingSkeleton } from "./visual-states.component";

interface TransactionTableProps {
    filters: FinanceFilters;
}

/** Row-level transaction detail grid (virtualized), newest first. */
export function TransactionTable({ filters }: TransactionTableProps) {
    const theme = useCssTheme();
    const { connection, query, columnMetadata } = transactionDetails(filters);
    const { data, isLoading, error } = useSemanticModelQuery({ connection, query });

    const dataTable = data?.status === "success" ? toDataTable(data.table, columnMetadata) : null;
    const rowCount = dataTable?.rows.length ?? 0;

    let content: ReactNode = null;
    if (isLoading) {
        content = <LoadingSkeleton />;
    } else if (error) {
        content = <ErrorState message={error.message} />;
    } else if (data?.status === "error") {
        content = <ErrorState message={data.error.message} />;
    } else if (dataTable) {
        content = rowCount ? (
            <DataGrid data={dataTable} theme={theme} rowHeight={40} />
        ) : (
            <EmptyState />
        );
    }

    return (
        <Card
            title="Transaction Details"
            subtitle={rowCount ? `${formatInteger(rowCount)} transactions` : "Row-level detail"}
            className="h-[560px]"
        >
            <div className="flex min-h-0 flex-1 overflow-auto rounded-xl border border-border">
                {content}
            </div>
        </Card>
    );
}
