//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { getRayfinClient } from "@/lib/rayfin-client";
import { budgetDateFor } from "@/lib/budget-date";

/** A budget row as read back for aggregation and charting. */
export interface BudgetRow {
    id: string;
    financialYear: number;
    monthNumber: number;
    budgetDate: Date;
    departmentKey: string;
    categoryKey: string;
    budgetAmount: number;
}

/** The business key that uniquely identifies one budget line. */
export interface BudgetCombination {
    financialYear: number;
    monthNumber: number;
    departmentKey: string;
    categoryKey: string;
}

export interface SaveBudgetInput extends BudgetCombination {
    budgetAmount: number;
    comment?: string;
    createdBy: string;
}

export interface SaveBudgetResult {
    id: string;
    /** True when an existing line was updated, false when a new one was created. */
    updated: boolean;
}

/**
 * Find the single budget row for a business-key combination, if one exists.
 * Rayfin does not support composite unique constraints, so this lookup is how
 * the app enforces one row per (year, month, department, category).
 */
export async function findExistingBudget(combo: BudgetCombination) {
    const rows = await getRayfinClient()
        .data.BudgetEntry.select([
            "id",
            "financialYear",
            "monthNumber",
            "departmentKey",
            "categoryKey",
            "budgetAmount",
            "comment",
        ])
        .where({
            financialYear: { eq: combo.financialYear },
            monthNumber: { eq: combo.monthNumber },
            departmentKey: { eq: combo.departmentKey },
            categoryKey: { eq: combo.categoryKey },
        })
        .execute();
    return rows[0] ?? null;
}

/**
 * Upsert a budget line for the (year, month, department, category) key —
 * updating the existing row when one exists, otherwise creating a new one.
 */
export async function saveBudget(input: SaveBudgetInput): Promise<SaveBudgetResult> {
    const client = getRayfinClient();
    const existing = await findExistingBudget(input);
    const now = new Date();
    const budgetDate = budgetDateFor(input.financialYear, input.monthNumber);

    if (existing) {
        await client.data.BudgetEntry.update(
            { id: existing.id },
            {
                budgetDate,
                budgetAmount: input.budgetAmount,
                comment: input.comment ?? "",
                updatedAt: now,
            },
        );
        return { id: existing.id, updated: true };
    }

    const created = await client.data.BudgetEntry.create({
        financialYear: input.financialYear,
        monthNumber: input.monthNumber,
        budgetDate,
        departmentKey: input.departmentKey,
        categoryKey: input.categoryKey,
        budgetAmount: input.budgetAmount,
        comment: input.comment ?? "",
        createdBy: input.createdBy,
        createdAt: now,
        updatedAt: now,
    });
    return { id: created.id, updated: false };
}

/** Fetch all budget lines for aggregation into the Actual-vs-Budget charts. */
export async function listBudgets(): Promise<BudgetRow[]> {
    const rows = await getRayfinClient()
        .data.BudgetEntry.select([
            "id",
            "financialYear",
            "monthNumber",
            "budgetDate",
            "departmentKey",
            "categoryKey",
            "budgetAmount",
        ])
        .execute();
    return rows;
}
