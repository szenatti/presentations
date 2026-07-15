//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { useCallback, useEffect, useState } from "react";
import { listBudgets, type BudgetRow } from "@/services/budget.service";

interface UseBudgetsResult {
    budgets: BudgetRow[];
    isLoading: boolean;
    error: Error | undefined;
    /** Re-fetch budgets (e.g. after saving a new one) so charts update. */
    refresh: () => void;
}

/**
 * Loads all budget rows from the Rayfin database and exposes a `refresh` so the
 * Actual-vs-Budget charts can update in place after a budget is saved. The
 * fetch runs after the first `await` inside the effect (never synchronously),
 * so it does not trigger cascading renders.
 */
export function useBudgets(): UseBudgetsResult {
    const [budgets, setBudgets] = useState<BudgetRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        void (async () => {
            try {
                const rows = await listBudgets();
                if (!cancelled) {
                    setBudgets(rows);
                    setError(undefined);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [reloadKey]);

    const refresh = useCallback(() => {
        setIsLoading(true);
        setReloadKey((key) => key + 1);
    }, []);

    return { budgets, isLoading, error, refresh };
}
