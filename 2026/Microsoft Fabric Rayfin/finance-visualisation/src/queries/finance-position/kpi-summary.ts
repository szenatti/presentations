import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applyCalculateTableFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./kpi-summary.dax?raw";

const connection = "financeModel";

export const kpiColumnMetadata: ColumnMetadataMap = {
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
    "[Budget Amount]": { name: "BudgetAmount", displayName: "Budget Amount", format: "$#,##0.00" },
    "[Variance]": { name: "Variance", displayName: "Variance", format: "$#,##0.00" },
    "[Variance %]": { name: "VariancePercentage", displayName: "Variance Percentage", format: "0.0%" },
    "[Budget Consumed %]": { name: "BudgetConsumedPercentage", displayName: "Budget Consumed Percentage", format: "0.0%" },
};

export function kpiSummary(filters: FinanceFilters) {
    return {
        connection,
        query: applyCalculateTableFilters(baseQuery, filters),
        columnMetadata: kpiColumnMetadata,
    };
}