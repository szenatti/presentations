import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./detail-grid.dax?raw";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimmonth[MonthStart]": { name: "MonthStart", displayName: "Month", format: "mmm yyyy" },
    "dimdepartment[BusinessUnit]": { name: "BusinessUnit", displayName: "Business Unit" },
    "dimdepartment[DepartmentName]": { name: "DepartmentName", displayName: "Department" },
    "dimcategory[CategoryGroup]": { name: "CategoryGroup", displayName: "Category Group" },
    "dimcategory[CategoryName]": { name: "CategoryName", displayName: "Cost Category" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
    "[Budget Amount]": { name: "BudgetAmount", displayName: "Budget Amount", format: "$#,##0.00" },
    "[Variance]": { name: "Variance", displayName: "Variance", format: "$#,##0.00" },
    "[Variance %]": { name: "VariancePercentage", displayName: "Variance %", format: "0.0%" },
    "[Budget Consumed %]": { name: "BudgetConsumedPercentage", displayName: "Budget Consumed %", format: "0.0%" },
};

export function detailGrid(filters: FinanceFilters) {
    return {
        connection,
        query: applySummarizeFilters(baseQuery, filters),
        columnMetadata,
    };
}