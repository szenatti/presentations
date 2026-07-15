//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, expect, it } from "vitest";
import { budgetHistory } from "./budget-history";

describe("budgetHistory", () => {
    it("groups actuals by the BudgetEntry business key", () => {
        const result = budgetHistory();
        expect(result.connection).toBe("financeModel");
        expect(result.query).toContain("'dimmonth'[CalendarYear]");
        expect(result.query).toContain("'dimmonth'[MonthNumber]");
        expect(result.query).toContain("'dimdepartment'[DepartmentKey]");
        expect(result.query).toContain("'dimcategory'[CategoryKey]");
        expect(result.query).toContain("[Actual Amount]");
    });
});