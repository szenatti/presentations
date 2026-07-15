import type { CachedQueryResult } from "@microsoft/fabric-app-data";
import { RotateCcw } from "lucide-react";

import { useSemanticModelQuery } from "@/hooks/use-semantic-model-query";
import type { FinanceFilters } from "@/lib/finance-filters";
import {
    filterBusinessUnits,
    filterCategories,
    filterCategoryGroups,
    filterDepartments,
    filterMonths,
    filterYears,
} from "@/queries";
import { FilterSelect, type FilterOption } from "./filter-select.component";

interface FilterBarProps {
    filters: FinanceFilters;
    onChange: (patch: Partial<FinanceFilters>) => void;
    onReset: () => void;
}

function options(result: CachedQueryResult | undefined, valueIndex = 0, labelIndex = valueIndex): FilterOption[] {
    if (result?.status !== "success") return [];
    return result.table.rows.flatMap((row) => {
        const value = row[valueIndex];
        const label = row[labelIndex];
        return value == null || label == null ? [] : [{ value: String(value), label: String(label) }];
    });
}

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
    const years = useSemanticModelQuery(filterYears());
    const months = useSemanticModelQuery(filterMonths());
    const businessUnits = useSemanticModelQuery(filterBusinessUnits());
    const departments = useSemanticModelQuery(filterDepartments());
    const categoryGroups = useSemanticModelQuery(filterCategoryGroups());
    const categories = useSemanticModelQuery(filterCategories());

    const hasFilters = Object.values(filters).some((value) => value != null);

    return (
        <section aria-label="Finance filters" className="border-y border-border bg-secondary">
            <div className="mx-auto grid max-w-dashboard grid-cols-2 gap-m px-xl py-l md:grid-cols-3 xl:grid-cols-[repeat(6,minmax(0,1fr))_auto] xl:items-end">
                <FilterSelect label="Calendar Year" allLabel="All years" value={filters.year?.toString() ?? ""} options={options(years.data)} disabled={years.isLoading} onChange={(value) => onChange({ year: value ? Number(value) : null })} />
                <FilterSelect label="Month" allLabel="All months" value={filters.month?.toString() ?? ""} options={options(months.data, 0, 1)} disabled={months.isLoading} onChange={(value) => onChange({ month: value ? Number(value) : null })} />
                <FilterSelect label="Business Unit" allLabel="All units" value={filters.businessUnit ?? ""} options={options(businessUnits.data)} disabled={businessUnits.isLoading} onChange={(value) => onChange({ businessUnit: value || null })} />
                <FilterSelect label="Department" allLabel="All departments" value={filters.department ?? ""} options={options(departments.data)} disabled={departments.isLoading} onChange={(value) => onChange({ department: value || null })} />
                <FilterSelect label="Category Group" allLabel="All groups" value={filters.categoryGroup ?? ""} options={options(categoryGroups.data)} disabled={categoryGroups.isLoading} onChange={(value) => onChange({ categoryGroup: value || null })} />
                <FilterSelect label="Cost Category" allLabel="All categories" value={filters.category ?? ""} options={options(categories.data)} disabled={categories.isLoading} onChange={(value) => onChange({ category: value || null })} />
                <button type="button" title="Reset filters" aria-label="Reset all filters" disabled={!hasFilters} onClick={onReset} className="flex h-10 items-center justify-center rounded-lg border border-border bg-card px-m text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40">
                    <RotateCcw className="icon-size-200" aria-hidden="true" />
                </button>
            </div>
        </section>
    );
}