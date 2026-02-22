# Introduction to Power BI MCP

**Presenter:** Sergio Zenatti Filho  
**Event:** Perth Microsoft Data and Analytics User Group  
**Date:** 25 February 2026  

---

## Overview

Microsoft has introduced two Power BI MCP (Model Context Protocol) server experiences. The easiest way to understand them is **Ask vs Build**.

| | **Power BI MCP Server (Remote)** | **Power BI Modeling MCP Server** |
|---|---|---|
| **Tagline** | *"Ask the model"* | *"Build/change the model"* |
| **Purpose** | Query data & get insights | Build & modify semantic models |
| **Runs where?** | Hosted by Microsoft (cloud) | Locally on your machine |
| **Who uses it?** | Analysts, business users, agent builders | Developers, model builders |
| **What it touches** | Live data via DAX queries | Tables, measures, relationships, RLS, M code |
| **Read / Write?** | Read only (executes queries) | Read + Write |
| **Launched** | Nov 2025 (Preview) | Nov 2025 (Preview) |
| **DAX generation** | Via Copilot for Power BI engine | Via your LLM of choice |
| **Setup** | Single URL in MCP config | Install locally (npm / VS Code extension) |
| **Connects to** | Fabric semantic models (cloud only) | Desktop, Fabric, PBIP/TMDL files |
| **Best analogy** | *"AI-powered Q&A on steroids"* | *"AI-powered Tabular Editor"* |

---

## Same Protocol (MCP), Different Job

- **Remote Power BI MCP Server** → Analyze data in an existing semantic model  
- **Power BI Modeling MCP Server** → Engineer the semantic model itself  

### Simple Analogy

- **Remote** = BI Analyst mode (*"What happened?" / "Show top 10 products"*)  
- **Modeling** = BI Developer mode (*"Create measure" / "Rename fields" / "Refactor model"*)  

> **Memorable phrase:**  
> *"Remote MCP helps AI talk to your model. Modeling MCP helps AI work on your model."*

---

## Prerequisites & Setup

### Common Requirements (Both Servers)

| Requirement | Details |
|---|---|
| **VS Code** | [Download VS Code](https://code.visualstudio.com/) — the primary MCP client for both servers |
| **GitHub Account** | Required for GitHub Copilot authentication |
| **GitHub Copilot** | Active subscription (Individual, Business, or Enterprise) — provides the AI chat agent that communicates via MCP |
| **Microsoft Entra ID** | Your organisational identity used to authenticate against Fabric / Power BI |

### Remote Power BI MCP Server — Setup

| Requirement | Details |
|---|---|
| **Microsoft Fabric Workspace** | At least one semantic model published to a Fabric workspace |
| **Fabric Permissions** | Read or Build permission on the target semantic model |
| **MCP Configuration** | Add the remote endpoint URL to your VS Code MCP config (`settings.json` or `.vscode/mcp.json`): |

```json
{
  "mcp": {
    "servers": {
      "power-bi-remote": {
        "type": "http",
        "url": "https://api.fabric.microsoft.com/v1/mcp/powerbi"
      }
    }
  }
}
```

> **That's it** — no local installation required. The server is hosted by Microsoft.

### Power BI Modeling MCP Server — Setup

| Requirement | Details |
|---|---|
| **Node.js** | [Download Node.js](https://nodejs.org/) (LTS recommended) — required to run the local MCP server |
| **VS Code Extension** | Install the [Power BI Modeling MCP Server](https://marketplace.visualstudio.com/items?itemName=Microsoft.power-bi-modeling-mcp) extension from the VS Code Marketplace |
| **Power BI Desktop** | Required if connecting to a local `.pbix` file via `/ConnectToPowerBIDesktop` |
| **Fabric Workspace** | Required if connecting to a cloud semantic model via `/ConnectToFabric` |
| **PBIP / TMDL Files** | Required if connecting to source-controlled model files via `/ConnectToPBIP` |

> **Note:** The Modeling MCP server runs locally on your machine. It needs Node.js installed and the VS Code extension handles the server lifecycle automatically.

### Quick Setup Checklist

- [ ] Install **VS Code**
- [ ] Sign up / sign in to **GitHub Copilot**
- [ ] Enable **GitHub Copilot Chat** in VS Code (Agent mode)
- [ ] **Remote MCP:** Add the endpoint URL to your MCP config — done
- [ ] **Modeling MCP:** Install **Node.js** + the **VS Code extension**
- [ ] Authenticate with **Microsoft Entra ID** when prompted
- [ ] Connect to a semantic model and start prompting

---

## Detailed Comparison

### 1. Primary Purpose

| Server | Purpose |
|---|---|
| **Remote MCP** | Conversational analytics on top of an existing model — retrieve schema, generate DAX, execute queries |
| **Modeling MCP** | Semantic model authoring and maintenance with AI — edits, bulk changes, best practices, TMDL/PBIP workflows |

### 2. Where It Runs

| Server | Execution |
|---|---|
| **Remote MCP** | Hosted endpoint (`https://api.fabric.microsoft.com/v1/mcp/powerbi`) |
| **Modeling MCP** | Local MCP server (VS Code extension / local execution) |

### 3. Typical User Persona

| Server | Persona |
|---|---|
| **Remote MCP** | Analyst, business user, AI assistant developer — *"chat with my data"* |
| **Modeling MCP** | Modeler, BI developer, semantic model engineer — governance/standards automation |

### 4. Risk Profile

| Server | Risk |
|---|---|
| **Remote MCP** | Reads/query execution against models (with authenticated user permissions; RLS enforced for user auth, with caveats for service principal auth) |
| **Modeling MCP** | Can change model objects — Microsoft warns to use caution and back up models because AI may make unintended changes |

---

## Demo-Friendly Examples

### Remote Power BI MCP Server Prompts (Query / Insights)

- *"What tables are in this semantic model?"*  
- *"Show me the top 10 products by sales."*  
- *"What were last quarter's sales trends?"*  

### Power BI Modeling MCP Server Prompts (Modeling / Changes)

- *"Bulk rename columns to follow naming conventions."*  
- *"Add descriptions to all measures and tables."*  
- *"Refactor measures into a calculation group."*  
- *"Generate documentation for this semantic model."*  

---

## Sample Prompts

Detailed prompt guides with ready-to-use examples for each server:

- [Remote Power BI MCP Server — Sample Prompts](remote-mcp-server-prompts.md) — Schema discovery, analytical queries, time-series analysis, DAX generation & execution
- [Power BI Modeling MCP Server — Sample Prompts](modeling-mcp-server-prompts.md) — Model documentation, naming conventions, measure engineering, translations, security, and governance

---

## References & Microsoft Documentation

- [Power BI MCP Servers Overview](https://learn.microsoft.com/power-bi/developer/mcp-overview) — Microsoft's overview page covering both MCP server experiences  
- [Remote Power BI MCP Server — Overview](https://learn.microsoft.com/power-bi/developer/mcp-remote-overview) — Hosted endpoint for querying semantic models  
- [Remote Power BI MCP Server — Get Started](https://learn.microsoft.com/power-bi/developer/mcp-remote-get-started) — Setup and first queries with the Remote MCP server  
- [Power BI Modeling MCP Server — Overview](https://learn.microsoft.com/power-bi/developer/mcp-modeling-overview) — Local MCP server for semantic model authoring  
- [Power BI Modeling MCP Server — VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Microsoft.power-bi-modeling-mcp) — Install the Modeling MCP extension  
- [Model Context Protocol (MCP) Specification](https://modelcontextprotocol.io/) — The open protocol standard behind both servers  
- [Microsoft Fabric REST API — MCP Endpoint](https://learn.microsoft.com/rest/api/fabric/powerbi/) — API reference for the hosted MCP endpoint  
- [Power BI Semantic Model Documentation](https://learn.microsoft.com/power-bi/transform-model/desktop-semantic-model) — Background on semantic models in Power BI  
- [TMDL Overview](https://learn.microsoft.com/analysis-services/tmdl/tmdl-overview) — Tabular Model Definition Language used in Modeling MCP workflows  
- [Power BI Projects (PBIP)](https://learn.microsoft.com/power-bi/developer/projects/projects-overview) — Power BI project format for source control and collaboration  

---

*Presented at Perth Microsoft Data and Analytics User Group — 25 February 2026*
