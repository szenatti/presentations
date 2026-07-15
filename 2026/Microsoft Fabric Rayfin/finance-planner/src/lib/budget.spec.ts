//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect } from "vitest";
import { computeBudgetVariance } from "@/lib/budget";

describe("computeBudgetVariance", () => {
    it("reports a favourable variance when under budget", () => {
        const result = computeBudgetVariance(1000, 800);
        expect(result.variance).toBe(200);
        expect(result.isFavourable).toBe(true);
        expect(result.variancePercent).toBeCloseTo(0.2);
        expect(result.consumedPercent).toBeCloseTo(0.8);
    });

    it("reports an unfavourable variance when over budget", () => {
        const result = computeBudgetVariance(1000, 1250);
        expect(result.variance).toBe(-250);
        expect(result.isFavourable).toBe(false);
        expect(result.variancePercent).toBeCloseTo(-0.25);
        expect(result.consumedPercent).toBeCloseTo(1.25);
    });

    it("treats exactly on budget as favourable", () => {
        const result = computeBudgetVariance(500, 500);
        expect(result.variance).toBe(0);
        expect(result.isFavourable).toBe(true);
    });

    it("returns null percentages when the budget is zero", () => {
        const result = computeBudgetVariance(0, 300);
        expect(result.variance).toBe(-300);
        expect(result.variancePercent).toBeNull();
        expect(result.consumedPercent).toBeNull();
        expect(result.isFavourable).toBe(false);
    });
});
