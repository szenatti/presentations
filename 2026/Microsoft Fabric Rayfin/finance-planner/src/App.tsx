//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { AppHeader } from "@/components/app-header.component";
import { BudgetHistory } from "@/components/budget-history.component";
import { BudgetPlanner } from "@/components/budget-planner.component";
import { useBudgets } from "@/hooks/use-budgets";

/**
 * Budget Planning — a focused data-entry app for maintaining monthly budgets
 * and checking saved lines against actual expenditure.
 */
function App() {
    const { budgets, isLoading, error, refresh } = useBudgets();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            <main className="mx-auto flex max-w-[1200px] flex-col gap-xl px-xl py-xl">
                <BudgetPlanner onSaved={refresh} />
                <BudgetHistory budgets={budgets} isLoading={isLoading} error={error} />
            </main>
        </div>
    );
}

export default App;
