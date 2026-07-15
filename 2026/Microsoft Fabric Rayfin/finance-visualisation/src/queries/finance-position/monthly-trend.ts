import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./monthly-trend.dax?raw";
import spec from "./monthly-trend.json";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimmonth[MonthStart]": { name: "MonthStart", displayName: "Month", format: "mmm yyyy" },
    "[Month Label]": { name: "MonthLabel", displayName: "Month" },
    "[Month Sort]": { name: "MonthSort", displayName: "Month Sort", format: "0" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
    "[Budget Amount]": { name: "BudgetAmount", displayName: "Budget Amount", format: "$#,##0.00" },
};

export function monthlyTrend(filters: FinanceFilters) {
    return {
        connection,
        query: applySummarizeFilters(baseQuery, filters),
        columnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}