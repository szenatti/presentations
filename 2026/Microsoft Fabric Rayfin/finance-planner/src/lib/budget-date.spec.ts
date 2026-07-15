//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, expect, it } from "vitest";
import { budgetDateFor } from "./budget-date";

describe("budgetDateFor", () => {
    it("returns the first day of the selected calendar month", () => {
        expect(budgetDateFor(2026, 6).toISOString()).toBe("2026-06-01T00:00:00.000Z");
    });

    it("handles January without rolling into the previous year", () => {
        expect(budgetDateFor(2026, 1).toISOString()).toBe("2026-01-01T00:00:00.000Z");
    });
});