//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, expect, it } from "vitest";
import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import { dimensionNameMap, formatBudgetDate } from "./budget-history";

describe("dimensionNameMap", () => {
    it("maps dimension keys to their descriptions independently of actuals", () => {
        const result = {
            status: "success",
            table: {
                columns: [{ name: "Key" }, { name: "Name" }],
                rows: [["D003", "Information Technology"], ["D007", "Customer Service"]],
            },
        } as CachedQueryResult;

        expect(dimensionNameMap(result).get("D003")).toBe("Information Technology");
        expect(dimensionNameMap(result).get("D007")).toBe("Customer Service");
    });
});

describe("formatBudgetDate", () => {
    it("formats Date values as ISO date-only values", () => {
        expect(formatBudgetDate(new Date("2026-03-01T00:00:00.000Z"))).toBe("2026-03-01");
    });

    it("preserves date-only ISO strings", () => {
        expect(formatBudgetDate("2026-01-01")).toBe("2026-01-01");
    });
});