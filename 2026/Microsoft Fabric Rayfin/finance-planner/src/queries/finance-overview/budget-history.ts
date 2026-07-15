//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import query from "./budget-history.dax?raw";

/** Actual expenditure grouped by the same business key used by BudgetEntry. */
export function budgetHistory() {
    return { connection: "financeModel", query };
}