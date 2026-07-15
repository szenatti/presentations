import businessUnitsQuery from "./filter-business-units.dax?raw";
import categoriesQuery from "./filter-categories.dax?raw";
import categoryGroupsQuery from "./filter-category-groups.dax?raw";
import departmentsQuery from "./filter-departments.dax?raw";
import monthsQuery from "./filter-months.dax?raw";
import yearsQuery from "./filter-years.dax?raw";

const connection = "financeModel";

export function filterYears() {
    return { connection, query: yearsQuery };
}

export function filterMonths() {
    return { connection, query: monthsQuery };
}

export function filterBusinessUnits() {
    return { connection, query: businessUnitsQuery };
}

export function filterDepartments() {
    return { connection, query: departmentsQuery };
}

export function filterCategoryGroups() {
    return { connection, query: categoryGroupsQuery };
}

export function filterCategories() {
    return { connection, query: categoriesQuery };
}