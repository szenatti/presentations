# FabCon Vienna 2026 Updates - Perth UG Presentation

**Perth Microsoft Data, Analytics & AI User Group** | October 2025

## Overview

This presentation provides a comprehensive overview of the major announcements and updates from **FabCon Vienna 2026**, the 3rd Annual Fabric Community Conference in Europe. The session highlights new features, capabilities, and enhancements across the Microsoft Fabric platform, including Real-Time Intelligence, Analytics, OneLake, Security, Developer experiences, and Power BI.

---

## FabCon 2026 Conference Details

### Upcoming Events

**FabCon North America 2026**
- **Location**: Atlanta, GA, USA
- **Dates**: March 16-20, 2026
- **Register**: [aka.ms/FabCon](https://aka.ms/FabCon)

**FabCon Europe 2026**
- **Location**: Barcelona, Spain
- **Dates**: September 28 – October 1, 2026
- **Register**: [aka.ms/FabCon-EU](https://aka.ms/FabCon-EU)

### Platform Adoption

Since General Availability (23 months ago):
- **25,000+** Fabric customers
- Unified data platform for AI transformation
- Enterprise-grade data, analytics, and intelligence

---

## Major Announcements by Category

### 📊 Platform Area

**Real-Time Intelligence & Analytics**

- **Graph in Fabric** (Preview) – Visual exploration of connections and relationships
- **Maps in Fabric** (Preview) – Geospatial context for agents and operations
- **RTI Eventhouse Endpoint** (Preview) – Enhanced real-time analytics capabilities
- **Anomaly Detector** (Preview) – Automated anomaly detection for real-time streams

**OneLake Governance**

- **Fabric Notebooks with Python** (General Availability) – Native Python support for data processing
- **AI Functions in Data Wrangler** (Preview) – Intelligent data transformation capabilities
- **Migration Experience** (General Availability) – Streamlined migration from legacy systems
- **36% Performance Improvement** in Fabric Data Warehouse

**Data Lake Features**

- **Incremental Refresh** (Preview) – Optimize data refresh cycles
- **Native Execution Engine** (Preview) – Support in materialized lake views
- **Shortcut Transformations** (Preview):
  - JSON to Delta format conversion
  - Parquet to Delta format conversion
  - CSV to Delta format conversion

---

### 🔒 Security & Administration

**OneLake Catalog Enhancements**

- **Secure Tab** (Preview) – Granular access control
  - Folder-level security
  - Row-level security (RLS)
  - Column-level security (CLS)
- **Govern Tab** (General Availability) – Centralized governance management
- **New Copilot Experience** (Preview) – AI-assisted security configuration
- **OneLake Diagnostics** (Preview) – Enhanced monitoring and troubleshooting

**Security & Compliance**

- **Azure Private Links** (General Availability):
  - Workspace-level protection
  - OneLake data protection
  - Customer-managed keys
- **Outbound Access Protection** (Preview):
  - Protection for Spark environments
  - Protection for Fabric Data Warehouse (FDW)
  - Protection for Fabric Data Factory (FDF)
- **Workspace IP Filtering** (Preview) – Network-level access control
- **Surge Protection** (General Availability):
  - Background jobs
  - Workspaces (preview)
- **Purview Security Integrations** (General Availability)
- **Item Recovery** (Preview) – Restore accidentally deleted items

---

### 👨‍💻 Developer Experiences

**API & Integration Enhancements**

- **Fabric Extensibility Toolkit** (Preview) – Evolution of Fabric WDK
- **Fabric MCP** (Preview) – Model Context Protocol integration
  - Simplify code generation
  - Item authoring with Fabric APIs
  - Generate deployment scripts
  - Built into Microsoft MCP for VS Code/GitHub compatibility
  - [Open-source: aka.ms/FabricMCP](https://aka.ms/FabricMCP)
- **OneLake Table API** (Preview) – Direct access to OneLake tables
  - Open-source table APIs
  - Iceberg and Delta-compliant client support
  - Automatic availability with no extra catalogs

**DevOps & CI/CD**

- **Git Integration** (General Availability):
  - 100% support across Fabric platform
  - Public format support
- **Deployment Pipelines** (General Availability):
  - 100% support across all Fabric items
  - Streamlined DevOps workflows
- **CI/CD Support for Data Agents** (Preview) – Agent operations for AI development
- **User Data Functions in Fabric** (General Availability) – Custom function development

**Developer Tools**

- **Fabric VS Code Extension** (General Availability) – Native development experience
- **Command Line Interface** (General Availability):
  - Open-source version
  - Full scripting capabilities
- **Object Explorer Enhancements** (General Availability):
  - Horizontal tabs for open items
  - Multiple active workspace support
  - Improved object navigation

---

### 📈 Data Integration & Mirroring

**OneLake Data Unification**

Shortcut & Mirroring sources now available:

**Generally Available**
- Azure SQL Database
- Azure Data Lake Storage
- Azure Blob Storage
- Microsoft Dataverse
- Databricks Catalog

**Public Preview**
- Azure Cosmos DB
- Azure PostgreSQL
- Oracle Database
- Google BigQuery
- SQL Server 2025

**New Sources**
- Google Cloud Storage
- Snowflake
- Amazon S3
- S3-Compatible Storage (cloud/on-premises)
- Azure SQL Managed Instance
- SQL Server

**Enhanced Mirroring**
- Support for on-premises data sources
- Support for data sources behind firewalls
- REST API-based mirroring control
- Flexible backup retention

---

### 💾 Databases

**SQL Database Enhancements**

- **Copilot Integration** (Preview) – AI-assisted query generation
- **Query Editor Improvements** (Preview) – Enhanced user experience
- **Git Integration** (Preview) – Version control for database objects
- **Mirrored Database Support in Data Agents** (Preview) – Seamless data access

**Database Migration**

- **Warehouse Migration Assistant** (General Availability):
  - Self-service migration tools
  - AI-powered guidance for prioritization
  - Seamless data integration
  - Support for:
    - Synapse Dedicated SQL Pools
    - SQL Databases
    - ADLS Gen2 sources

Migration Process:
1. Identify source and create DACPAC file
2. Migrate using DACPAC file
3. Review migrated objects
4. Copy source data to ADLS Gen2 (Parquet/CSV)
5. Load data using COPY INTO T-SQL

---

### 📊 Power BI & Analytics

**Copilot Enhancements**

- **Copilot in Power BI** (General Availability):
  - Measure descriptions support
  - DAX query generation
  - Natural language querying

**Semantic Model Editing**

- **Edit Semantic Models in Power BI Service** (General Availability)
- **PowerQuery Support** (General Availability):
  - Import semantic models
  - Direct Lake semantic models
  - Import composite semantic models
- **Paginated Reports** (General Availability) – Create advanced reports in the service

---

### 🚀 Real-Time Intelligence

**Anomaly Detector**

- **Public Preview** – No-code anomaly detection
- **Automated ML Models** – Continuous monitoring of real-time streams
- **24/7 Monitoring** – Round-the-clock operational anomaly detection
- **Easy-to-Action Insights** – Business-user-friendly alerts
- **Fabric Integration** – Seamless integration with Eventhouse and Activator

**Dataflow Gen2 Performance**

Significant performance improvements:

| Benchmark | Dataflow Gen1 | Gen2 Base | Gen2 Modern Query | Gen2 Full Optimization |
|-----------|---------------|----------|-------------------|----------------------|
| Benchmark 1 | 16,695 sec | 12,194 sec | 6,415 sec | 2,944 sec |
| Benchmark 2 | 1,753 sec | - | - | 480 sec |

**Optimizations:**
- Modern Query Evaluator
- Parallelized execution
- Efficient resource utilization

---

### 🗺️ Geospatial Intelligence

**Maps in Fabric** (Preview)

- **Visual Data Simplification** – Seamless geospatial visualization
- **Real-Time Stream Integration** – Live, multi-layer maps
- **No-Code Development** – Build geospatial apps without complexity
- **Data Sources** – Support for Lakehouse and Eventhouse

---

### 📊 Graph Intelligence

**Graphs in Fabric** (Preview)

- **No-Code Graph Models** – Build over OneLake data
- **LinkedIn-Style Graph Engine** – Operational insights
- **Multi-Hop Relationships** – Connect entities and events
- **Flexible Querying**:
  - Code-based queries
  - Visual editor
  - Copilot-assisted queries

---

### 🤖 Fabric Data Agents

**Virtual Data Analyst**

- Allow users to interact with enterprise data in OneLake
- Reason over mirrored databases
- Create domain-specific data experts
- Accessible through:
  - Fabric Copilot Studio
  - Teams integration
  - Azure AI Foundry
  - M365 Copilot endpoints

**Data Agent Capabilities** (New)

- Seamless reasoning over OneLake data
- Support for mirrored databases
- External invocation with detailed responses
- SQL query execution step visibility

**Agent Operations** (New)

- Git integration support
- Deployment pipeline support
- CI/CD workflow automation
- Streamlined AI development

---

## Shortcut Transformations

**AI-Powered Transformations**

- **PII Detection** – Identify and mask sensitive data
- **Text Translation** – Multi-language support
- **Text Summarization** – Automatic content condensing
- **Conversation Analysis** – Extract insights from discussions
- **Sentiment Analysis** – Gauge emotional tone
- **Named Entity Recognition** – Identify people, places, organizations
- **Key Phrase Extraction** – Extract important concepts

**Format Conversions**

- CSV to Delta
- Parquet to Delta (new)
- JSON to Delta (new)

---

## Key Statistics

- **25,000+** Fabric customers since GA
- **23 months** since general availability
- **36%** performance improvement in Data Warehouse
- **100%** support for Git integration
- **100%** support for deployment pipelines

---

## Use Cases

### Data Integration
- Unify data from 20+ sources with zero ETL
- Mirroring from on-premises and cloud databases
- Real-time data ingestion with shortcuts

### Analytics & BI
- Real-time anomaly detection for operations
- Geospatial analysis and visualization
- Graph-based relationship discovery
- Advanced semantic modeling with AI assistance

### Data Governance
- Row and column-level security
- Data classification and PII detection
- Audit trails and compliance monitoring
- Flexible data sharing without exposure

### Developer Enablement
- Low-code agent development
- Git-based workflows and CI/CD
- Open-source API and MCP integration
- VS Code native development experience

---

## Event Details

**Perth Microsoft Data, Analytics & AI User Group**
- **Event Link**: [Perth Microsoft Data Analytics & AI Meetup](https://www.meetup.com/perth-microsoft-data-analytics-ai/events/311417835/?eventOrigin=group_events_list)
- **Location**: Perth, Australia
- **Date**: October 2025
- **Audience**: Data professionals, analytics architects, AI developers

---

## Getting Started

### Learn More

- **FabCon Official**: [aka.ms/FabCon](https://aka.ms/FabCon)
- **FabCon Europe**: [aka.ms/FabCon-EU](https://aka.ms/FabCon-EU)
- **Fabric MCP Open Source**: [aka.ms/FabricMCP](https://aka.ms/FabricMCP)
- **Microsoft Fabric Documentation**: [Microsoft Learn - Fabric](https://learn.microsoft.com/en-us/fabric/)

### Key Resources

- Fabric API Documentation
- Migration Assistant Guide
- Real-Time Intelligence Tutorials
- Data Agent Development Guide
- OneLake Security Best Practices

---

## Feature Readiness Matrix

| Feature | Status | Target Users |
|---------|--------|--------------|
| Git Integration | GA | All developers |
| Deployment Pipelines | GA | DevOps teams |
| Python Notebooks | GA | Data scientists |
| Azure Private Links | GA | Enterprise security teams |
| Purview Integration | GA | Data governance teams |
| Maps in Fabric | Preview | Geospatial analysts |
| Graphs in Fabric | Preview | Data modelers |
| Anomaly Detector | Preview | Operations teams |
| Fabric MCP | Preview | Extension developers |
| Data Agent CI/CD | Preview | AI developers |
| OneLake Table API | Preview | Developers |

---

## Next Steps

1. **Explore New Features** – Review announcements relevant to your use cases
2. **Plan Migration** – Use Migration Assistant for legacy system migrations
3. **Implement Security** – Deploy OneLake security controls
4. **Build Agents** – Start with data agents and Copilot integration
5. **Register for FabCon** – Join the community conference (March 2026 or September 2026)

---

## Questions & Support

For more information on Microsoft Fabric and the features announced at FabCon Vienna:

- Check the presentation slides: `2025 FabCon Vienna - Perth UG Update.pdf`
- Visit the Microsoft Fabric community forums
- Connect with the Perth Microsoft Data Analytics & AI User Group

---

**Last Updated**: January 21, 2026  
**Event Date**: October 2025  
**Presentation Deck**: 2025 FabCon Vienna - Perth UG Update.pdf  
**Conference Covered**: FabCon Vienna 2025 (Prior Event)  
**Upcoming**: FabCon Vienna 2026 | Barcelona, Spain (September 28 – October 1, 2026)
