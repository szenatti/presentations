//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

/**
 * Shared filter state for the Finance Overview page and the helpers that
 * translate that state into DAX filter clauses.
 *
 * Each `.dax` query file contains a `/*__FILTERS__*\/` placeholder (a valid
 * DAX block comment, so the file still runs standalone with no filters). The
 * factory functions replace that placeholder with `TREATAS` filter clauses
 * built from the active {@link FinanceFilters}.
 */

/** Active dropdown selections. `null` means "All" (no filter applied). */
export interface FinanceFilters {
    /** dimmonth[CalendarYear] — e.g. 2026. */
    year: number | null;
    /** dimmonth[MonthName] — e.g. "June". */
    month: string | null;
    /** dimdepartment[DepartmentName]. */
    department: string | null;
    /** dimcategory[CategoryName]. */
    category: string | null;
}

/** No filters applied — the default page state. */
export const EMPTY_FILTERS: FinanceFilters = {
    year: null,
    month: null,
    department: null,
    category: null,
};

/** The token every `.dax` file uses to mark where filter clauses are injected. */
export const FILTER_PLACEHOLDER = "/*__FILTERS__*/";

interface BuildClausesOptions {
    /** Include the month filter. Set false for the trend chart. Default: true. */
    includeMonth?: boolean;
}

/** Escape a value for use inside a DAX string literal (double the quotes). */
function daxString(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
}

/**
 * Build the list of `TREATAS` filter clauses for the active selections.
 * Values originate from the model's own distinct-value lists (the dropdowns),
 * but string values are still quote-escaped defensively.
 */
export function buildFilterClauses(
    filters: FinanceFilters,
    options: BuildClausesOptions = {},
): string[] {
    const includeMonth = options.includeMonth ?? true;
    const clauses: string[] = [];

    if (filters.year != null) {
        clauses.push(`TREATAS({${filters.year}}, dimmonth[CalendarYear])`);
    }
    if (includeMonth && filters.month != null) {
        clauses.push(`TREATAS({${daxString(filters.month)}}, dimmonth[MonthName])`);
    }
    if (filters.department != null) {
        clauses.push(`TREATAS({${daxString(filters.department)}}, dimdepartment[DepartmentName])`);
    }
    if (filters.category != null) {
        clauses.push(`TREATAS({${daxString(filters.category)}}, dimcategory[CategoryName])`);
    }
    return clauses;
}

/**
 * Inject filters into a `SUMMARIZECOLUMNS` query. The placeholder sits before
 * the measure arguments, so each clause is emitted with a trailing comma.
 */
export function applySummarizeFilters(
    baseQuery: string,
    filters: FinanceFilters,
    options?: BuildClausesOptions,
): string {
    const clauses = buildFilterClauses(filters, options);
    const replacement = clauses.map((c) => `    ${c},\n`).join("");
    return baseQuery.replace(FILTER_PLACEHOLDER, replacement);
}

/**
 * Inject filters into a `CALCULATETABLE(<table> /*__FILTERS__*\/)` query. The
 * placeholder sits after the table expression, so each clause is emitted with
 * a leading comma.
 */
export function applyCalculateTableFilters(
    baseQuery: string,
    filters: FinanceFilters,
    options?: BuildClausesOptions,
): string {
    const clauses = buildFilterClauses(filters, options);
    const replacement = clauses.map((c) => `,\n    ${c}`).join("");
    return baseQuery.replace(FILTER_PLACEHOLDER, replacement);
}
