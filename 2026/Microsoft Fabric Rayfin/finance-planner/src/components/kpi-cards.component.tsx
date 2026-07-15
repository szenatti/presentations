//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { type ReactNode } from "react";
import type { QueryTable } from "@microsoft/fabric-app-data";
import {
    ArrowDownRight,
    ArrowUpRight,
    CircleDollarSign,
    Minus,
    Receipt,
    Wallet,
} from "lucide-react";
import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { kpiSummary } from "@/queries/finance-overview";
import type { FinanceFilters } from "@/lib/finance-filters";
import {
    formatAUD,
    formatInteger,
    formatSignedPercent,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { ErrorState } from "./visual-states.component";

interface KpiCardsProps {
    filters: FinanceFilters;
}

/** Read a single measure value from the first result row by its DAX column name. */
function cellByName(table: QueryTable, name: string): number | null {
    const index = table.columns.findIndex((column) => column.name === name);
    if (index < 0) return null;
    const value = table.rows[0]?.[index];
    return typeof value === "number" ? value : null;
}

interface StatCardProps {
    label: string;
    value: string;
    icon?: ReactNode;
    caption?: string;
    className?: string;
    hero?: boolean;
    /** When provided, colours the value by sign and shows a trend arrow. */
    deltaValue?: number | null;
}

function StatCard({ label, value, icon, caption, className, hero, deltaValue }: StatCardProps) {
    const hasDelta = deltaValue !== undefined;
    const up = (deltaValue ?? 0) > 0;
    const down = (deltaValue ?? 0) < 0;

    return (
        <div
            className={cn(
                "flex flex-col justify-between gap-m rounded-2xl border p-l shadow-sm",
                hero
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-card-foreground",
                className,
            )}
        >
            <div className="flex items-center justify-between gap-s">
                <span
                    className={cn(
                        "text-100 font-semibold uppercase tracking-wide",
                        hero ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                >
                    {label}
                </span>
                {icon && (
                    <span className={hero ? "text-primary-foreground/80" : "text-muted-foreground"}>
                        {icon}
                    </span>
                )}
            </div>

            <div
                className={cn(
                    "font-numeric font-semibold tabular-nums",
                    hero ? "text-hero-800 leading-hero-800" : "text-hero-700 leading-hero-700",
                    hasDelta && up && "text-delta-up",
                    hasDelta && down && "text-delta-down",
                )}
            >
                <span className="inline-flex items-center gap-xs">
                    {hasDelta && up && <ArrowUpRight className="icon-size-300" aria-hidden="true" />}
                    {hasDelta && down && <ArrowDownRight className="icon-size-300" aria-hidden="true" />}
                    {hasDelta && !up && !down && <Minus className="icon-size-300" aria-hidden="true" />}
                    {value}
                </span>
            </div>

            {caption && (
                <span
                    className={cn(
                        "text-100",
                        hero ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                >
                    {caption}
                </span>
            )}
        </div>
    );
}

function StatSkeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "h-[116px] animate-pulse rounded-2xl border border-border bg-muted",
                className,
            )}
            aria-hidden="true"
        />
    );
}

/** The five headline KPIs for the Finance Overview page. */
export function KpiCards({ filters }: KpiCardsProps) {
    const { connection, query } = kpiSummary(filters);
    const { data, isLoading, error } = useSemanticModelQuery({ connection, query });

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-l md:grid-cols-3 xl:grid-cols-6">
                <StatSkeleton className="col-span-2" />
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
            </div>
        );
    }

    if (error) return <ErrorState message={error.message} />;
    if (data?.status === "error") return <ErrorState message={data.error.message} />;
    if (data?.status !== "success") return null;

    const table = data.table;
    const actual = cellByName(table, "[Actual Amount]");
    const transactionCount = cellByName(table, "[Transaction Count]");
    const averageTransaction = cellByName(table, "[Average Transaction]");
    const previousMonthActual = cellByName(table, "[Previous Month Actual]");
    const momChange = cellByName(table, "[MoM Change %]");

    return (
        <div className="grid grid-cols-2 gap-l md:grid-cols-3 xl:grid-cols-6">
            <StatCard
                hero
                className="col-span-2"
                label="Actual Amount"
                value={formatAUD(actual)}
                icon={<Wallet className="icon-size-300" aria-hidden="true" />}
                caption="Total NetAmount (AUD)"
            />
            <StatCard
                label="Transaction Count"
                value={formatInteger(transactionCount)}
                icon={<Receipt className="icon-size-200" aria-hidden="true" />}
                caption="Posted transactions"
            />
            <StatCard
                label="Average Transaction"
                value={formatAUD(averageTransaction)}
                icon={<CircleDollarSign className="icon-size-200" aria-hidden="true" />}
                caption="Net per transaction"
            />
            <StatCard
                label="Previous Month Actual"
                value={formatAUD(previousMonthActual)}
                caption="Prior-month expenditure"
            />
            <StatCard
                label="Month-over-Month Change"
                value={formatSignedPercent(momChange)}
                deltaValue={momChange}
                caption="vs previous month"
            />
        </div>
    );
}
