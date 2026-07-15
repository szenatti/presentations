import { useState } from "react";
import { DataGrid } from "@microsoft/fabric-datagrid";
import { useCssTheme } from "@microsoft/fabric-visuals";
import type { InteractionEvent } from "@microsoft/fabric-visuals-core";

import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import type { FinanceFilters } from "@/lib/finance-filters";
import { formatInteger } from "@/lib/format";
import { toDataTable } from "@/lib/to-data-table";
import { detailGrid } from "@/queries";
import { Card } from "./card.component";
import { EmptyState, ErrorState, LoadingSkeleton } from "./visual-states.component";

export function DetailGrid({ filters }: { filters: FinanceFilters }) {
    const theme = useCssTheme();
    const [interactionStatus, setInteractionStatus] = useState("");
    const { connection, query, columnMetadata } = detailGrid(filters);
    const { data, isLoading, error } = useSemanticModelQuery({ connection, query });
    const dataTable = data?.status === "success" ? toDataTable(data.table, columnMetadata) : null;
    const rowCount = dataTable?.rows.length ?? 0;

    const onInteraction = (events: InteractionEvent[]) => {
        setInteractionStatus(events.some((event) => event.action === "select") ? "Detail row selected" : "Detail selection cleared");
    };

    return (
        <Card title="Finance Detail" subtitle={`${formatInteger(rowCount)} month, department and category combinations`}>
            <div className="h-grid min-h-0 overflow-auto rounded-lg border border-border">
                {isLoading ? <LoadingSkeleton /> : error ? <ErrorState message={error.message} /> : data?.status === "error" ? <ErrorState message={data.error.message} /> : dataTable?.rows.length ? <DataGrid data={dataTable} theme={theme} rowHeight={40} onInteraction={onInteraction} /> : <EmptyState />}
            </div>
            <span className="sr-only" aria-live="polite">{interactionStatus}</span>
        </Card>
    );
}