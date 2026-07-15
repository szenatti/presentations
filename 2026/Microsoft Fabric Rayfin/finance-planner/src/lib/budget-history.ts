//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { CachedQueryResult } from "@microsoft/fabric-app-data";

/** Build a key-to-name lookup from a two-column dimension query. */
export function dimensionNameMap(result: CachedQueryResult | undefined): Map<string, string> {
    const names = new Map<string, string>();
    if (result?.status !== "success") return names;
    for (const row of result.table.rows) {
        if (row[0] != null && row[1] != null) names.set(String(row[0]), String(row[1]));
    }
    return names;
}

/** Format either a GraphQL Date or an ISO date string without timezone drift. */
export function formatBudgetDate(value: Date | string): string {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toISOString().slice(0, 10);
}