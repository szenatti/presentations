import type { VisualizationSpec } from "@microsoft/fabric-visuals";
import type { ColumnMetadataMap } from "@/lib/to-data-table";
import { applySummarizeFilters, type FinanceFilters } from "@/lib/finance-filters";
import baseQuery from "./by-department.dax?raw";
import spec from "./by-department.json";

const connection = "financeModel";

const columnMetadata: ColumnMetadataMap = {
    "dimdepartment[BusinessUnit]": { name: "BusinessUnit", displayName: "Business Unit" },
    "dimdepartment[DepartmentName]": { name: "DepartmentName", displayName: "Department" },
    "[Actual Amount]": { name: "ActualAmount", displayName: "Actual Amount", format: "$#,##0.00" },
    "[Budget Amount]": { name: "BudgetAmount", displayName: "Budget Amount", format: "$#,##0.00" },
};

export function byDepartment(filters: FinanceFilters) {
    return {
        connection,
        query: applySummarizeFilters(baseQuery, filters),
        columnMetadata,
        vegaLiteSpec: spec as VisualizationSpec,
    };
}