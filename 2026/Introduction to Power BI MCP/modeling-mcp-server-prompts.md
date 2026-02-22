# Power BI Modeling MCP Server — Sample Prompts

> **What it does:** The Power BI Modeling MCP Server is a **local MCP server** (preview) for **building and changing semantic models** with AI assistance. It supports measures, tables, columns, relationships, translations, security roles, DAX validation, TMDL/PBIP workflows, and bulk operations.  
> Use it for model engineering, governance automation, and documentation.

---

## Getting Started — Built-in Connection Prompts

The Modeling MCP Server includes official built-in prompts for connecting to your semantic model. Use one of these first:

### Connect to Power BI Desktop

```
/ConnectToPowerBIDesktop
```

*Connects to an open .pbix model in Power BI Desktop on your local machine.*

### Connect to Fabric Workspace

```
/ConnectToFabric
```

*Connects to a semantic model hosted in a Microsoft Fabric workspace.*

### Connect to PBIP / TMDL Files

```
/ConnectToPBIP
```

*Opens a semantic model from local PBIP or TMDL files — ideal for source-controlled projects.*

---

## Built-in DAX Tools

These are official built-in prompts for DAX authoring and performance analysis.

### Create a DAX Query from Natural Language

```
/CreateDAXQuery
What are the top 10 customers by total revenue in the last fiscal year?
```

*Generates DAX from a natural language question using the connected model's context.*

### Run DAX with Performance Metrics

```
/RunDAXQueryWithMetrics
EVALUATE TOPN(10, SUMMARIZE(Sales, Products[ProductName], "TotalSales", [Total Sales]), [TotalSales], DESC)
```

*Executes DAX and returns performance metrics (query duration, storage engine time, formula engine time) — great for optimisation demos.*

### Analyse DAX Performance

```
/AnalyzeDAXQuery
EVALUATE SUMMARIZECOLUMNS(Dates[Year], Dates[Month], "Revenue", [Total Revenue])
```

*Runs DAX with cleared cache and analyses performance — pinpoints bottlenecks.*

---

## Semantic Model Documentation Prompts

These prompts are among the most practical for real-world governance and handover scenarios.

### 6. Comprehensive Semantic Model Documentation

```
Generate a complete Markdown documentation pack for this semantic model. Include:

1. **Model Overview** — name, description, data source summary, last refresh info
2. **Table Inventory** — every table with its type (fact/dimension/bridge), row count estimate, and purpose
3. **Column Dictionary** — for each table, list all columns with data type, description, and whether it is a key column
4. **Measure Catalogue** — every measure grouped by display folder, including:
   - Measure name
   - DAX expression
   - Business description (explain in plain language what it calculates)
   - Dependencies (which other measures or columns it references)
5. **Relationship Map** — all relationships with cardinality, cross-filter direction, and active/inactive status
6. **Calculated Tables & Columns** — list all calculated objects with their DAX expressions
7. **Security Roles** — if any RLS/OLS roles exist, document their filter expressions
8. **Known Issues / Improvement Opportunities** — flag any measures without descriptions, unused columns, or naming inconsistencies

Format everything in clean Markdown with tables. This documentation should be suitable for onboarding a new team member to this model.
```

*This is the gold-standard documentation prompt — produces a full reference document that can live alongside the model in source control.*

### 7. Add Descriptions to All Objects

```
Add clear, business-friendly descriptions to ALL measures, columns, and tables in this semantic model. For measures, explain the DAX logic in simple language that a business user would understand. For columns, describe what data they contain and any important context (e.g., "Fiscal year starting July"). For tables, explain their role in the model (fact, dimension, bridge).
```

*Official example scenario — transforms an undocumented model into a self-describing one. Critical for AI readiness and governance.*

### 8. Generate a Data Dictionary Export

```
Create a data dictionary for this semantic model as a Markdown table with the following columns: Table Name, Column Name, Data Type, Description, Is Key, Sample Values. Cover every table and column in the model.
```

*Produces an artefact that data stewards and analysts regularly need.*

---

## Naming Conventions & Refactoring Prompts

### 9. Analyse and Fix Naming Conventions

```
Analyse my model's naming conventions across tables, columns, and measures. Identify inconsistencies (e.g., mixed camelCase and snake_case, abbreviations, prefixes). Suggest renames to ensure consistency using the pattern: [Entity] [Descriptor] (e.g., "Sales Amount", "Customer Name"). Show me the proposed changes before applying them.
```

*Directly from Microsoft's example scenarios — fantastic for demonstrating bulk refactoring with AI guardrails.*

### 10. Bulk Rename Columns

```
Rename all columns in the model to use Title Case with spaces instead of underscores or camelCase. For example, "order_date" → "Order Date", "customerID" → "Customer ID". Show a before/after comparison before applying changes.
```

*Practical bulk operation that shows the power of AI-assisted model maintenance.*

---

## Measure Engineering Prompts

### 11. Refactor Measures into a Calculation Group

```
Refactor the time intelligence measures (YTD Sales, QTD Sales, MTD Sales, PY Sales, YoY Growth %) into a calculation group called "Time Intelligence". Add calculation items for each variant and ensure the original measures are replaced with references to the calculation group.
```

*Official example — excellent advanced demo that proves this server does semantic engineering, not just Q&A.*

### 12. Create a KPI Measure Set

```
Create a complete set of KPI measures for sales analysis including:
- Total Sales (SUM)
- Sales YTD, Sales QTD, Sales MTD  
- Sales vs Prior Year (absolute and %)
- Sales vs Budget (absolute and %)
- Running Total Sales
- Sales Moving Average (3-month)

Use consistent naming conventions and add business-friendly descriptions to each measure. Place all measures in a "Sales KPIs" display folder.
```

*Shows the Modeling MCP server creating multiple interrelated measures with proper organisation.*

### 13. Validate and Optimise DAX Measures

```
Review all DAX measures in this model for correctness and performance. Identify any measures that:
- Use CALCULATE with unnecessary filters
- Could benefit from variables (VAR/RETURN)
- Have circular dependencies
- Use deprecated functions

Suggest optimised DAX for each issue found, and explain the improvement.
```

*Practical governance prompt — resonates with experienced modellers.*

---

## Translation & Localisation Prompts

### 14. Generate Model Translations

```
Generate a complete French translation for this semantic model, including all table names, column names, measure names, and descriptions. Ensure business terminology is correctly localised (e.g., "Revenue" → "Chiffre d'affaires", not "Revenu").
```

*Official example — showcases the cultures/translations support built into the Modeling MCP server.*

### 15. Multi-Language Translation Batch

```
Add translations for Spanish, Portuguese, and Japanese to this semantic model. For each language, translate all table display names, column display names, measure display names, and descriptions.
```

*Shows batch translation capability — impressive for multinational organisations.*

---

## Security & Governance Prompts

### 16. Create Row-Level Security Roles

```
Create RLS roles for this semantic model:
- "Regional Manager" role: filters the Sales table by the Region column matching the user's region
- "Country Manager" role: filters by Country
- "Executive" role: no filters (full access)

Include the DAX filter expressions for each role and validate they work correctly.
```

*Demonstrates the server's ability to manage security roles programmatically.*

### 17. Apply Best Practice Analyser (BPA) Fixes

```
Run a best practice analysis on this semantic model. Identify all violations, group them by severity (critical, warning, info), and apply safe fixes automatically. For any risky changes (e.g., removing columns, changing relationships), list them separately and ask for my approval before applying.
```

*Community Fabric blog workflow — very real-world. Shows AI acting as a governance assistant with human-in-the-loop.*

---

## Advanced / Power User Prompts

### 18. Analyse Power Query for Environment Switching

```
Analyse the Power Query (M) code in this model's data sources. Identify hardcoded server names, database names, and file paths. Create semantic model parameters for environment switching (Dev, Test, Prod) so that data source connections can be changed without editing M code.
```

*Official example — useful for teams managing models across multiple environments.*

### 19. Benchmark DAX Across Model Versions

```
Connect to semantic model V1 and V2. Run the following DAX query against both and compare execution time, storage engine queries, and formula engine time:

EVALUATE SUMMARIZECOLUMNS(Dates[Year], Products[Category], "Revenue", [Total Revenue])

Highlight which version performs better and explain why.
```

*Official example — powerful for performance regression testing during model upgrades.*

### 20. Full Model Health Check

```
Perform a comprehensive health check on this semantic model:

1. **Unused objects** — find columns, tables, or measures not referenced by any other object or report
2. **Missing descriptions** — list all objects without descriptions
3. **Naming inconsistencies** — flag violations of standard naming patterns
4. **Relationship issues** — identify inactive relationships, bidirectional filters, or many-to-many patterns that could cause ambiguity
5. **DAX anti-patterns** — scan measures for common performance issues
6. **Model size** — estimate the memory footprint of each table/column

Present findings as a prioritised action list with recommended fixes.
```

*The ultimate demo prompt — shows the Modeling MCP server as a comprehensive model governance tool.*

---

## Bonus: Presentation-Ready One-Liner

> **Remote MCP prompts start with *"What happened in the data?"***  
> **Modeling MCP prompts start with *"Change/improve the semantic model itself."***

---

## Tips for Better Results

| Tip | Why |
|---|---|
| **Ask for preview before applying** | Say *"show me the changes before applying"* to maintain control |
| **Back up your model first** | Microsoft warns AI may make unintended changes — always have a backup |
| **Be specific about scope** | *"All measures in the Sales table"* is better than *"all measures"* |
| **Use PBIP/TMDL for version control** | Changes via the Modeling MCP are trackable in git when using PBIP format |
| **Start with documentation** | Documenting first gives the AI better context for subsequent operations |

---

## References

- [Power BI Modeling MCP Server — VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Microsoft.power-bi-modeling-mcp)
- [Power BI Modeling MCP Server — GitHub Repository](https://github.com/microsoft/power-bi-modeling-mcp)
- [Power BI MCP Servers Overview](https://learn.microsoft.com/power-bi/developer/mcp-overview)
- [TMDL Overview](https://learn.microsoft.com/analysis-services/tmdl/tmdl-overview)
- [Power BI Projects (PBIP)](https://learn.microsoft.com/power-bi/developer/projects/projects-overview)
- [Best Practice Analyzer (BPA) Rules](https://learn.microsoft.com/power-bi/guidance/powerbi-implementation-planning-auditing-info-protection)
