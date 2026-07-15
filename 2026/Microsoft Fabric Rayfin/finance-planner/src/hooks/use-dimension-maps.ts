//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { useMemo } from "react";
import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import {
    budgetCategories,
    budgetDepartments,
    filterMonths,
} from "@/queries/finance-overview";
import type { DimensionMaps } from "@/lib/budget-aggregate";

function buildStringMap(
    result: CachedQueryResult | undefined,
    keyIndex: number,
    valueIndex: number,
): Map<string, string> {
    const map = new Map<string, string>();
    if (result?.status === "success") {
        for (const row of result.table.rows) {
            const key = row[keyIndex];
            const value = row[valueIndex];
            if (key != null && value != null) map.set(String(key), String(value));
        }
    }
    return map;
}

function buildNumberMap(
    result: CachedQueryResult | undefined,
    keyIndex: number,
    valueIndex: number,
): Map<string, number> {
    const map = new Map<string, number>();
    if (result?.status === "success") {
        for (const row of result.table.rows) {
            const key = row[keyIndex];
            const value = Number(row[valueIndex]);
            if (key != null && Number.isFinite(value)) map.set(String(key), value);
        }
    }
    return map;
}

/**
 * Builds name→key/number lookups from the model's dimension lists so the
 * page's display-name filters can be resolved to the keys/numbers budgets use.
 * All three queries are already cached by the SDK.
 */
export function useDimensionMaps(): DimensionMaps {
    const months = useSemanticModelQuery(filterMonths()); // [MonthNumber, MonthName]
    const departments = useSemanticModelQuery(budgetDepartments()); // [Key, Name]
    const categories = useSemanticModelQuery(budgetCategories()); // [Key, Name]

    return useMemo(
        () => ({
            monthNameToNumber: buildNumberMap(months.data, 1, 0),
            departmentNameToKey: buildStringMap(departments.data, 1, 0),
            categoryNameToKey: buildStringMap(categories.data, 1, 0),
        }),
        [months.data, departments.data, categories.data],
    );
}
