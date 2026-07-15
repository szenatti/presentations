//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { BudgetEntry } from "./BudgetEntry.js";

/**
 * Binds entity names to their classes so `RayfinClient` can provide typed
 * `client.data.<Entity>` proxies (consumed by the frontend via `import type`).
 */
export type AppSchema = {
    BudgetEntry: BudgetEntry;
};

/**
 * Runtime list of entity classes the Rayfin backend registers and applies to
 * the database during `rayfin up` / `rayfin up db apply`. Every entity must be
 * added here (with a value import above), or the backend applies an empty
 * schema and GraphQL reports "No entities have been defined for this project."
 */
export const schema = [BudgetEntry];
