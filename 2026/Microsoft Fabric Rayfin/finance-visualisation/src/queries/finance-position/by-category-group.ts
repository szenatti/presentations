import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./by-category-group.dax?raw";
import spec from "./by-category-group.json";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimcategory[CategoryGroup]": { name: "CategoryGroup", displayName: "Category Group" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
    "[Budget Amount]": { name: "BudgetAmount", displayName: "Budget Amount", format: "$#,##0.00" },
};

export function byCategoryGroup(filters: FinanceFilters) {
    return {
        connection,
        query: applySummarizeFilters(baseQuery, filters),
        columnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}