# Remote Power BI MCP Server — Sample Prompts

> **What it does:** The Remote Power BI MCP Server is a Microsoft-hosted endpoint for **querying an existing semantic model** in natural language. Its core tools are **Get Schema**, **Generate Query (DAX)**, and **Execute Query**.  
> Use it for schema discovery, conversational analytics, and AI-assisted data exploration.

---

## Getting Started

Before running prompts, ensure you have:

1. The **semantic model ID** (or workspace + model name) ready.
2. Your MCP client (e.g., GitHub Copilot in VS Code) connected to the remote endpoint:  
   `https://api.fabric.microsoft.com/v1/mcp/powerbi`
3. The semantic model **prepared for AI** — add descriptions to tables, columns, and measures, and configure AI instructions for improved query quality.

> **Tip:** Store your semantic model IDs for reuse. Be specific about time periods, measures, and entities for more reliable results.

---

## Schema Discovery Prompts

These prompts leverage the **Get Schema** tool to understand the model before querying.

### 1. Explore the Full Model Structure

```
What tables are in this semantic model? List each table with its columns and data types.
```

*Great first test prompt — validates connectivity and schema retrieval.*

### 2. Discover Available Measures

```
What measures are available in semantic model [model-id]? Group them by their home table and include a brief description of each.
```

*Useful for understanding what analytics are already built into the model.*

### 3. Understand Relationships

```
Show me all the relationships in this semantic model, including cardinality and cross-filter direction. Identify any tables that are not connected to the main fact table.
```

*Helps visualise the model topology before writing complex queries.*

### 4. Identify the Right Measures for Analysis

```
I want to perform margin analysis. Which measures and tables in this model are most relevant? Explain what each measure calculates and how they relate to each other.
```

*Uses schema retrieval + semantic understanding — especially powerful when the model has AI-ready descriptions.*

---

## Analytical Query Prompts

These prompts use the full **Schema → Generate DAX → Execute Query** pipeline.

### 5. Classic Top-N Query

```
Show me the top 10 products by total sales amount. Include product name, category, and sales value, sorted descending.
```

*The canonical validation query used across Microsoft Learn and community guides.*

### 6. Time-Series Trend Analysis

```
What is total sales by month for the last 12 months? Show the trend and highlight any months with significant increases or decreases compared to the prior month.
```

*Demonstrates time intelligence and trend detection — strong demo prompt.*

### 7. Quarter-over-Quarter Comparison

```
Compare this quarter's sales trends to last quarter. Which product categories grew and which declined? Quantify the percentage change for each.
```

*Shows comparative analysis — a reliable "wow moment" for audiences.*

### 8. Decomposition & Root Cause Analysis

```
Which customers and products contributed most to the profit decline this quarter compared to last quarter? Break down the impact by region and highlight the top 5 contributors to the decline.
```

*Showcases multi-dimensional decomposition and business-relevant storytelling.*

### 9. Multi-Dimension Ranking

```
Break down revenue by region and sales channel. Rank the top 5 region-channel combinations by revenue and show their percentage contribution to the total.
```

*Demonstrates grouping, ranking, and percentage-of-total patterns common in business analysis.*

### 10. Explicit DAX Generation & Execution

```
Generate the DAX query for the top 10 products by sales amount, show me the DAX code, then execute it and display the results in a table.
```

*Explicitly demonstrates the remote server's 3-step value chain: schema → generate DAX → execute. Perfect for explaining the "how" to a technical audience.*

---

## Advanced / Presentation-Worthy Prompts

### 11. Schema-Aware Business Question

```
Using semantic model [model-id], first identify which tables and relationships are relevant to understanding customer churn, then answer: What is our customer retention rate by region for the last 6 months?
```

*Showcases the "how it thinks" flow — great for live demos where you want to show the AI's reasoning process.*

### 12. Data Quality Exploration

```
Are there any null or blank values in the key columns of the Sales table? Summarise the data quality across all fact tables, including row counts and any potential issues.
```

*Practical prompt that resonates with data professionals who care about data integrity.*

### 13. Natural Language to Insight Narrative

```
Summarise the key business insights from this semantic model for a non-technical executive audience. Focus on sales performance, top customers, and regional trends over the last quarter.
```

*Shows the end-to-end value: from raw model to executive-ready narrative.*

---

## Tips for Better Results

| Tip | Why |
|---|---|
| **Be specific on time periods** | *"Last 12 months"* is better than *"recently"* |
| **Name measures explicitly** | *"Total Sales Amount"* is better than *"sales"* |
| **Reference the model ID** | Avoids ambiguity when multiple models exist |
| **Prepare models for AI** | Add descriptions, AI instructions, and verified answers to your semantic model |
| **Start with schema discovery** | Understanding the model first leads to better analytical queries |

---

## Quick Reference

| Tool | What It Does |
|---|---|
| **Get Schema** | Returns tables, columns, measures, relationships from a semantic model |
| **Generate Query** | Converts natural language into a DAX query |
| **Execute Query** | Runs a DAX query against the semantic model and returns results |

---

## References

- [Remote Power BI MCP Server — Overview](https://learn.microsoft.com/power-bi/developer/mcp-remote-overview)
- [Remote Power BI MCP Server — Get Started](https://learn.microsoft.com/power-bi/developer/mcp-remote-get-started)
- [Prepare Semantic Models for AI](https://learn.microsoft.com/power-bi/transform-model/desktop-ai-instructions)
- [Power BI MCP Servers Overview](https://learn.microsoft.com/power-bi/developer/mcp-overview)
