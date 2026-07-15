//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { useState } from "react";
import { Database, Moon, Sun } from "lucide-react";

import { DetailGrid } from "@/components/detail-grid.component";
import { FilterBar } from "@/components/filter-bar.component";
import { KpiCards } from "@/components/kpi-cards.component";
import { QueryChart } from "@/components/query-chart.component";
import { useThemeContext } from "@/hooks/theme.context";
import { EMPTY_FILTERS, type FinanceFilters } from "@/lib/finance-filters";
import { byCategoryGroup, byDepartment, monthlyTrend } from "@/queries";

function App() {
    const [filters, setFilters] = useState<FinanceFilters>(EMPTY_FILTERS);
    const { isDark, toggleTheme } = useThemeContext();
    const monthly = monthlyTrend(filters);
    const departments = byDepartment(filters);
    const categoryGroups = byCategoryGroup(filters);

    return (
        <div className="min-h-full bg-background text-foreground">
            <header className="border-b border-border bg-card">
                <div className="mx-auto flex max-w-dashboard items-center justify-between gap-xl px-xl py-xl">
                    <div className="min-w-0">
                        <p className="mb-xs flex items-center gap-s text-100 font-semibold uppercase tracking-wide text-primary">
                            <Database className="icon-size-200" aria-hidden="true" />
                            Finance Analytics Model
                        </p>
                        <h1 className="font-heading text-hero-800 font-semibold leading-hero-800">Finance Position</h1>
                        <p className="mt-xs text-300 text-muted-foreground">Actual expenditure, approved budget and variance in Australian dollars</p>
                    </div>
                    <button type="button" onClick={toggleTheme} title={isDark ? "Switch to light mode" : "Switch to dark mode"} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {isDark ? <Sun className="icon-size-200" aria-hidden="true" /> : <Moon className="icon-size-200" aria-hidden="true" />}
                    </button>
                </div>
            </header>

            <FilterBar filters={filters} onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))} onReset={() => setFilters(EMPTY_FILTERS)} />

            <main className="mx-auto flex max-w-dashboard flex-col gap-xl px-xl py-xl">
                <KpiCards filters={filters} />

                <div className="grid gap-xl xl:grid-cols-12">
                    <QueryChart title="Actual vs Budget Trend" subtitle="Monthly finance position" className="xl:col-span-7" {...monthly} spec={monthly.vegaLiteSpec} />
                    <QueryChart title="By Category Group" subtitle="Actual and budget by expense grouping" className="xl:col-span-5" {...categoryGroups} spec={categoryGroups.vegaLiteSpec} />
                    <QueryChart title="By Department" subtitle="Actual and budget across accountable teams" className="xl:col-span-12" {...departments} spec={departments.vegaLiteSpec} />
                </div>

                <DetailGrid filters={filters} />
            </main>
        </div>
    );
}

export default App;
