//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

/**
 * Budget-vs-actual maths for expense lines.
 *
 * For expenses a positive variance (spending under budget) is **favourable**;
 * a negative variance (over budget) is **unfavourable**.
 */
export interface BudgetVariance {
    actual: number;
    budget: number;
    /** budget - actual. Positive = under budget (favourable). */
    variance: number;
    /** variance / budget. `null` when budget is 0. */
    variancePercent: number | null;
    /** actual / budget. `null` when budget is 0. */
    consumedPercent: number | null;
    /** True when the line is at or under budget. */
    isFavourable: boolean;
}

export function computeBudgetVariance(budget: number, actual: number): BudgetVariance {
    const variance = budget - actual;
    const variancePercent = budget !== 0 ? variance / budget : null;
    const consumedPercent = budget !== 0 ? actual / budget : null;
    return {
        actual,
        budget,
        variance,
        variancePercent,
        consumedPercent,
        isFavourable: variance >= 0,
    };
}
