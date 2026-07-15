//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { type ReactNode, useMemo } from "react";
import { VegaVisual, useCssTheme } from "@microsoft/fabric-visuals";
import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { QueryTable } from "@microsoft/fabric-app-data";
import type { DataTable } from "@microsoft/fabric-visuals-core";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import type { BudgetRow } from "@/services/budget.service";
import type { ResolvedBudgetFilters } from "@/lib/budget-aggregate";
import { Card } from "./card.component";
import { EmptyState, ErrorState, LoadingSkeleton } from "./visual-states.component";

interface ActualVsBudgetChartProps {
    title: string;
    subtitle?: string;
    className?: string;
    /** Actuals query (connection + DAX) from a query factory. */
    connection: string;
    query: string;
    budgets: BudgetRow[];
    resolved: ResolvedBudgetFilters;
    /** Merges the actuals result with budgets into a long-format DataTable. */
    buildTable: (actuals: QueryTable, budgets: BudgetRow[], resolved: ResolvedBudgetFilters) => DataTable;
    vegaLiteSpec: VisualizationSpec;
}

/**
 * Card that runs an actuals DAX query, merges it with budgets (from Rayfin) into
 * an Actual-vs-Budget series, and renders the result as a Vega-Lite chart.
 * Re-renders when budgets change (e.g. after a save), so the comparison stays
 * current without reloading the page.
 */
export function ActualVsBudgetChart({
    title,
    subtitle,
    className,
    connection,
    query,
    budgets,
    resolved,
    buildTable,
    vegaLiteSpec,
}: ActualVsBudgetChartProps) {
    const theme = useCssTheme();
    const { data, isLoading, error } = useSemanticModelQuery({ connection, query });

    const dataTable = useMemo<DataTable | null>(() => {
        if (data?.status !== "success") return null;
        return buildTable(data.table, budgets, resolved);
    }, [data, budgets, resolved, buildTable]);

    let content: ReactNode = null;
    if (isLoading) {
        content = <LoadingSkeleton />;
    } else if (error) {
        content = <ErrorState message={error.message} />;
    } else if (data?.status === "error") {
        content = <ErrorState message={data.error.message} />;
    } else if (dataTable) {
        content = dataTable.rows.length ? (
            <VegaVisual
                spec={vegaLiteSpec}
                data={dataTable}
                theme={theme}
                style={{ width: "100%", height: "100%" }}
            />
        ) : (
            <EmptyState />
        );
    }

    return (
        <Card title={title} subtitle={subtitle} className={className}>
            <div className="flex min-h-0 flex-1">{content}</div>
        </Card>
    );
}
