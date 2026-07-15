import { useState } from "react";
import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import { VegaVisual, useCssTheme, type VegaVisualEventDetail, type VisualizationSpec } from "@microsoft/fabric-visuals";
import type { InteractionEvent } from "@microsoft/fabric-visuals-core";

import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { toDataTable } from "@/lib/to-data-table";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { Card } from "./card.component";
import { EmptyState, ErrorState, LoadingSkeleton } from "./visual-states.component";

interface QueryChartProps {
    title: string;
    subtitle: string;
    className?: string;
    connection: string;
    query: string;
    columnMetadata: ColumnMetadataMap;
    spec: VisualizationSpec;
}

function statusContent(result: CachedQueryResult | undefined, isLoading: boolean, error: Error | undefined) {
    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState message={error.message} />;
    if (result?.status === "error") return <ErrorState message={result.error.message} />;
    return null;
}

export function QueryChart({ title, subtitle, className, connection, query, columnMetadata, spec }: QueryChartProps) {
    const theme = useCssTheme();
    const [interactionStatus, setInteractionStatus] = useState("");
    const [visualError, setVisualError] = useState("");
    const { data, isLoading, error } = useSemanticModelQuery({ connection, query });
    const fallback = visualError ? <ErrorState message={visualError} /> : statusContent(data, isLoading, error);
    const dataTable = data?.status === "success" ? toDataTable(data.table, columnMetadata) : null;

    const onInteraction = (events: InteractionEvent[]) => {
        setInteractionStatus(events.some((event) => event.action === "select") ? `${title} selection active` : `${title} selection cleared`);
    };

    const onVisualEvent = (event: CustomEvent<VegaVisualEventDetail>) => {
        if (event.detail.type === "error") setVisualError(event.detail.message);
        if (event.detail.type === "render") setVisualError("");
    };

    return (
        <Card title={title} subtitle={subtitle} className={className}>
            <div className="h-chart min-h-0">
                {fallback ?? (dataTable?.rows.length ? <VegaVisual spec={spec} data={dataTable} theme={theme} onEvent={onVisualEvent} onInteraction={onInteraction} style={{ width: "100%", height: "100%" }} /> : <EmptyState />)}
            </div>
            <span className="sr-only" aria-live="polite">{interactionStatus}</span>
        </Card>
    );
}