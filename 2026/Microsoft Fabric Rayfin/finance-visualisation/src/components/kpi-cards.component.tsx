import type { QueryTable } from "@microsoft/fabric-app-data";
import { Banknote, ChartNoAxesCombined, Gauge, Scale, WalletCards } from "lucide-react";

import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import { formatAUD, formatPercent } from "@/lib/format";
import type { FinanceFilters } from "@/lib/finance-filters";
import { kpiSummary } from "@/queries";
import { cn } from "@/lib/utils";
import { ErrorState } from "./visual-states.component";

interface KpiCardsProps {
    filters: FinanceFilters;
}

function value(table: QueryTable, name: string): number | null {
    const index = table.columns.findIndex((column) => column.name === name);
    const cell = index < 0 ? null : table.rows[0]?.[index];
    return typeof cell === "number" ? cell : null;
}

interface KpiCardProps {
    label: string;
    value: string;
    caption: string;
    icon: React.ReactNode;
    featured?: boolean;
    favourable?: boolean | null;
}

function KpiCard({ label, value: displayValue, caption, icon, featured, favourable }: KpiCardProps) {
    return (
        <article className={cn("flex min-h-kpi flex-col justify-between gap-m rounded-xl border p-l shadow-sm", featured ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-card-foreground")}>
            <div className="flex h-xl items-center justify-between gap-s">
                <span className={cn("text-200 font-semibold uppercase leading-200 tracking-wide", featured ? "text-primary-foreground/80" : "text-muted-foreground")}>{label}</span>
                <span className={featured ? "text-primary-foreground/80" : "text-muted-foreground"}>{icon}</span>
            </div>
            <strong className={cn("block whitespace-nowrap font-numeric text-500 font-semibold leading-600 tabular-nums md:text-600", favourable === true && "text-positive", favourable === false && "text-negative")}>{displayValue}</strong>
            <span className={cn("min-h-l text-200 leading-200", featured ? "text-primary-foreground/75" : "text-muted-foreground")}>{caption}</span>
        </article>
    );
}

export function KpiCards({ filters }: KpiCardsProps) {
    const { connection, query } = kpiSummary(filters);
    const { data, isLoading, error } = useSemanticModelQuery({ connection, query });

    if (isLoading) {
        return <div className="grid grid-cols-2 gap-l xl:grid-cols-5">{Array.from({ length: 5 }, (_, index) => <div key={index} className="min-h-kpi animate-pulse rounded-xl bg-muted" />)}</div>;
    }
    if (error) return <ErrorState message={error.message} />;
    if (data?.status === "error") return <ErrorState message={data.error.message} />;
    if (data?.status !== "success") return null;

    const actual = value(data.table, "[Actual Amount]");
    const budget = value(data.table, "[Budget Amount]");
    const variance = value(data.table, "[Variance]");
    const variancePercentage = value(data.table, "[Variance %]");
    const consumed = value(data.table, "[Budget Consumed %]");

    return (
        <div className="grid grid-cols-2 gap-l lg:grid-cols-3 xl:grid-cols-5">
            <KpiCard featured label="Actual Amount" value={formatAUD(actual)} caption="Net expenditure in AUD" icon={<Banknote className="icon-size-300" aria-hidden="true" />} />
            <KpiCard label="Budget Amount" value={formatAUD(budget)} caption="Approved budget in scope" icon={<WalletCards className="icon-size-300" aria-hidden="true" />} />
            <KpiCard label="Variance" value={formatAUD(variance)} caption="Positive is under budget" icon={<Scale className="icon-size-300" aria-hidden="true" />} favourable={variance == null ? null : variance >= 0} />
            <KpiCard label="Variance Percentage" value={formatPercent(variancePercentage)} caption="Variance relative to budget" icon={<ChartNoAxesCombined className="icon-size-300" aria-hidden="true" />} favourable={variancePercentage == null ? null : variancePercentage >= 0} />
            <KpiCard label="Budget Consumed" value={formatPercent(consumed)} caption="Actual as share of budget" icon={<Gauge className="icon-size-300" aria-hidden="true" />} favourable={consumed == null ? null : consumed <= 1} />
        </div>
    );
}