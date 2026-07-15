//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import baseYears from "./filter-years.dax?raw";
import baseMonths from "./filter-months.dax?raw";
import baseDepartments from "./filter-departments.dax?raw";
import baseCategories from "./filter-categories.dax?raw";
import baseBudgetDepartments from "./budget-departments.dax?raw";
import baseBudgetCategories from "./budget-categories.dax?raw";

const connection = "financeModel";

/** Distinct calendar years (blank excluded) for the Year dropdown. */
export function filterYears() {
    return { connection, query: baseYears };
}

/** Distinct months (ordered Jan→Dec) for the Month dropdown. */
export function filterMonths() {
    return { connection, query: baseMonths };
}

/** Distinct departments (blank excluded) for the Department dropdown. */
export function filterDepartments() {
    return { connection, query: baseDepartments };
}

/** Distinct cost categories (blank excluded) for the Cost Category dropdown. */
export function filterCategories() {
    return { connection, query: baseCategories };
}

/** Departments with both key and name, for the budget form (value = key). */
export function budgetDepartments() {
    return { connection, query: baseBudgetDepartments };
}

/** Cost categories with both key and name, for the budget form (value = key). */
export function budgetCategories() {
    return { connection, query: baseBudgetCategories };
}
