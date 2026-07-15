//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { ColumnDef, DataTable } from "@microsoft/fabric-visuals-core";
import type { QueryTable } from "@microsoft/fabric-app-data";

/**
 * Dictionary keyed by the original column name from the DAX query result.
 * Each value holds the `ColumnDef` metadata for that column.
 */
export type ColumnMetadataMap = Record<string, ColumnDef>;

const NUMERIC_DATA_TYPES = new Set([
    "decimal",
    "double",
    "int16",
    "int32",
    "int64",
    "number",
    "single",
]);

function normalizeNumeric(value: unknown): unknown {
    if (typeof value !== "string") return value;

    const negative = value.trim().startsWith("(") && value.trim().endsWith(")");
    const normalized = value.replace(/[^0-9.+-]/g, "");
    if (!normalized) return value;

    const parsed = Number(normalized);
    if (!Number.isFinite(parsed)) return value;
    return negative ? -Math.abs(parsed) : parsed;
}

function normalizeCell(value: unknown, dataType: string): unknown {
    const normalizedType = dataType.toLowerCase();
    if (NUMERIC_DATA_TYPES.has(normalizedType)) return normalizeNumeric(value);
    if (normalizedType === "date" || normalizedType === "datetime") {
        if (value instanceof Date) return value.toISOString();
    }
    return value;
}

/**
 * Merges a raw SDK query table with static column metadata to produce
 * a `DataTable` that `VegaVisual` and `DataGrid` accept directly.
 *
 * @param queryTable - The `table` value from `CachedQueryResult` (SDK output).
 * @param columnMetadata - Metadata dictionary exported from the query barrel file,
 *                         keyed by the original column name.
 * @returns A `DataTable` with enriched `ColumnDef` entries and the original rows.
 *
 * @example
 * ```tsx
 * import { columnMetadata, query } from "@/queries/sales/revenue-by-region";
 * import { toDataTable } from "@/lib/to-data-table";
 *
 * const { data } = useSemanticModelQuery({ connection: "myModel", query });
 *
 * if (data?.status === "success") {
 *   const dataTable = toDataTable(data.table, columnMetadata);
 *   return <VegaVisual spec={vegaLiteSpec} data={dataTable} theme={theme} />;
 * }
 * ```
 */
export function toDataTable(
    queryTable: QueryTable,
    columnMetadata: ColumnMetadataMap,
): DataTable {
    const columns: ColumnDef[] = queryTable.columns.map((col) => {
        return columnMetadata[col.name] ?? { name: col.name };
    });

    const rows = queryTable.rows.map((row) => row.map((value, index) => {
        const dataType = queryTable.columns[index]?.dataType;
        return dataType ? normalizeCell(value, dataType) : value;
    }));

    return { columns, rows };
}
