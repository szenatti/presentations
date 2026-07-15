//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

/**
 * Australian-locale formatters for the KPI cards. Charts and the data grid
 * format themselves from `columnMetadata.format`; these helpers are for the
 * custom KPI components that render raw measure values.
 *
 * `en-AU` + `AUD` renders the Australian dollar as `$1,234.56`.
 */

const audCurrency = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const integer = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 });

const percent = new Intl.NumberFormat("en-AU", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

/** Placeholder for missing/blank measure values. */
const EMPTY = "\u2014"; // em dash

function toNumber(value: unknown): number | null {
    if (value == null) return null;
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : null;
}

/** `$1,234.56` — full Australian currency. */
export function formatAUD(value: unknown): string {
    const n = toNumber(value);
    return n == null ? EMPTY : audCurrency.format(n);
}

/** `6,000` — grouped integer. */
export function formatInteger(value: unknown): string {
    const n = toNumber(value);
    return n == null ? EMPTY : integer.format(n);
}

/** `88.0%` — a ratio (e.g. 0.88) rendered as a percentage. */
export function formatPercent(value: unknown): string {
    const n = toNumber(value);
    return n == null ? EMPTY : percent.format(n);
}

/** `+12.5%` / `-3.2%` — a signed percentage for month-over-month deltas. */
export function formatSignedPercent(value: unknown): string {
    const n = toNumber(value);
    if (n == null) return EMPTY;
    const sign = n > 0 ? "+" : "";
    return `${sign}${percent.format(n)}`;
}
