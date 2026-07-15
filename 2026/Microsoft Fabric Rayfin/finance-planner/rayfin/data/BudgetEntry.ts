//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { entity, authenticated, uuid, int, text, decimal, date } from "@microsoft/rayfin-core";

/**
 * A single planned budget line: the budgeted spend for one department + cost
 * category in a given month.
 *
 * The business key is the combination of
 * `financialYear + monthNumber + departmentKey + categoryKey`. Rayfin does not
 * support composite unique constraints, so uniqueness is enforced in
 * application code (see `src/services/budget.service.ts`), which updates an
 * existing row for the combination rather than inserting a duplicate.
 *
 * Any signed-in user may read and write budgets — these are shared planning
 * figures, not per-user data — so the entity uses `@authenticated('*')` with no
 * row-level policy. `createdBy` records who first entered the line.
 */
@entity()
@authenticated("*")
export class BudgetEntry {
    @uuid() id!: string;
    @int() financialYear!: number;
    @int() monthNumber!: number;
    @date() budgetDate!: Date;
    @text({ max: 50 }) departmentKey!: string;
    @text({ max: 50 }) categoryKey!: string;
    @decimal() budgetAmount!: number;
    @text({ max: 1000, optional: true }) comment?: string;
    @text({ max: 200 }) createdBy!: string;
    @date() createdAt!: Date;
    @date() updatedAt!: Date;
}
