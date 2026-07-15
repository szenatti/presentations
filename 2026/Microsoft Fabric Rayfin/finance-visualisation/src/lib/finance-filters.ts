export interface FinanceFilters {
    year: number | null;
    month: number | null;
    businessUnit: string | null;
    department: string | null;
    categoryGroup: string | null;
    category: string | null;
}

export const EMPTY_FILTERS: FinanceFilters = {
    year: null,
    month: null,
    businessUnit: null,
    department: null,
    categoryGroup: null,
    category: null,
};

export const FILTER_PLACEHOLDER = "/*__FILTERS__*/";

function daxString(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
}

export function buildFilterClauses(filters: FinanceFilters): string[] {
    const clauses: string[] = [];

    if (filters.year != null) {
        clauses.push(`TREATAS({${filters.year}}, 'dimmonth'[CalendarYear])`);
    }
    if (filters.month != null) {
        clauses.push(`TREATAS({${filters.month}}, 'dimmonth'[MonthNumber])`);
    }
    if (filters.businessUnit != null) {
        clauses.push(`TREATAS({${daxString(filters.businessUnit)}}, 'dimdepartment'[BusinessUnit])`);
    }
    if (filters.department != null) {
        clauses.push(`TREATAS({${daxString(filters.department)}}, 'dimdepartment'[DepartmentName])`);
    }
    if (filters.categoryGroup != null) {
        clauses.push(`TREATAS({${daxString(filters.categoryGroup)}}, 'dimcategory'[CategoryGroup])`);
    }
    if (filters.category != null) {
        clauses.push(`TREATAS({${daxString(filters.category)}}, 'dimcategory'[CategoryName])`);
    }

    return clauses;
}

export function applySummarizeFilters(baseQuery: string, filters: FinanceFilters): string {
    const replacement = buildFilterClauses(filters)
        .map((clause) => `    ${clause},\n`)
        .join("");
    return baseQuery.replace(FILTER_PLACEHOLDER, replacement);
}

export function applyCalculateTableFilters(baseQuery: string, filters: FinanceFilters): string {
    const replacement = buildFilterClauses(filters)
        .map((clause) => `,\n    ${clause}`)
        .join("");
    return baseQuery.replace(FILTER_PLACEHOLDER, replacement);
}