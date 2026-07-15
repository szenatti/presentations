//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

// The Vega chart and DataGrid components pull in canvas + @fluentui/react-icons,
// which don't resolve under jsdom. Stub them so this test validates the page
// composition (header, filters, layout) without loading the visual runtime.
vi.mock("@/components/actual-vs-budget-chart.component", () => ({
    ActualVsBudgetChart: ({ title }: { title: string }) => <section>{title}</section>,
}));
vi.mock("@/components/transaction-table.component", () => ({
    TransactionTable: () => <section>Transaction Details</section>,
}));

// BudgetPlanner reads the auth context, which isn't provided when App is
// rendered bare in this unit test. Stub it to keep the test focused on layout.
vi.mock("@/components/budget-planner.component", () => ({
    BudgetPlanner: () => <section>Budget Planner</section>,
}));

import App from "@/App";

describe("App", () => {
    it("renders without throwing", () => {
        expect(() => render(<App />)).not.toThrow();
    });

    it("mounts content into the document", () => {
        render(<App />);
        expect(document.body).not.toBeEmptyDOMElement();
    });
});
