//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

/** Return the UTC first day of a calendar month for stable date-only storage. */
export function budgetDateFor(financialYear: number, monthNumber: number): Date {
    return new Date(Date.UTC(financialYear, monthNumber - 1, 1));
}