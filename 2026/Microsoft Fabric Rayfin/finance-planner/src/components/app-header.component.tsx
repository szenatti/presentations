//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { Landmark, Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/hooks/theme.context";

/**
 * Branded banner header for the Budget Planning app.
 */
export function AppHeader() {
    const { isDark, toggleTheme } = useThemeContext();

    return (
        <header className="border-b border-border bg-card">
            <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-l px-xl py-l">
                <div className="flex items-center gap-m">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Landmark className="icon-size-300" aria-hidden="true" />
                    </span>
                    <div>
                        <h1 className="font-heading text-hero-700 font-semibold leading-hero-700 text-foreground">
                            Budget Planning
                        </h1>
                        <p className="text-200 text-muted-foreground">
                            Plan budgets and track them against actual expenditure
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-s">
                    <span className="hidden items-center gap-s rounded-full border border-border bg-secondary px-m py-xs text-100 font-medium text-muted-foreground sm:flex">
                        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        Finance Analytics Model
                    </span>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {isDark ? (
                            <Sun className="icon-size-200" aria-hidden="true" />
                        ) : (
                            <Moon className="icon-size-200" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
