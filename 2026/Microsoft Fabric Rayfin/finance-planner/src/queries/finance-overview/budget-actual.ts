//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import type { ColumnMetadataMap } from "@/lib/to-data-table";
import baseQuery from "./budget-actual.dax?raw";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
};

export interface BudgetActualParams {
    /** Calendar year (stored in the budget's financialYear field). */
    year: number;
    /** Calendar month number (1–12). */
    monthNumber: number;
    departmentKey: string;
    categoryKey: string;
}

function daxString(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
}

/**
 * Actual expenditure for a single (year, month, department, category) — used to
 * compare against a saved budget line. Matches the dimension keys the budget
 * stores, so the comparison lines up exactly with the entered budget.
 */
export function budgetActual(params: BudgetActualParams) {
    const clauses = [
        `TREATAS({${params.year}}, dimmonth[CalendarYear])`,
        `TREATAS({${params.monthNumber}}, dimmonth[MonthNumber])`,
        `TREATAS({${daxString(params.departmentKey)}}, dimdepartment[DepartmentKey])`,
        `TREATAS({${daxString(params.categoryKey)}}, dimcategory[CategoryKey])`,
    ];
    const query = baseQuery.replace(
        "/*__FILTERS__*/",
        clauses.map((clause) => `,\n        ${clause}`).join(""),
    );
    return { connection, query, columnMetadata };
}
