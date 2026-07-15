const audCurrency = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const percentage = new Intl.NumberFormat("en-AU", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

const integer = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 });

const EMPTY = "\u2014";

function numberValue(value: unknown): number | null {
    const parsed = typeof value === "number" ? value : Number(value);
    return value == null || !Number.isFinite(parsed) ? null : parsed;
}

export function formatAUD(value: unknown): string {
    const parsed = numberValue(value);
    return parsed == null ? EMPTY : audCurrency.format(parsed);
}

export function formatPercent(value: unknown): string {
    const parsed = numberValue(value);
    return parsed == null ? EMPTY : percentage.format(parsed);
}

export function formatInteger(value: unknown): string {
    const parsed = numberValue(value);
    return parsed == null ? "0" : integer.format(parsed);
}