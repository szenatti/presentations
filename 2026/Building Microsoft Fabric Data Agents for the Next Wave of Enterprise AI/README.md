# Australian Airline On-Time Performance Data Agent Demo

## Overview

This project demonstrates how to build an intelligent **Data Agent** in Microsoft Fabric that analyzes Australian domestic airline on-time performance data. The agent uses natural language to answer questions about flight punctuality, delays, cancellations, and operational trends across routes, airports, and airlines.

This demo showcases:
- 🤖 **Natural language querying** of aviation performance data
- 📊 **Monthly time-series analysis** from January 2004 onwards
- ✈️ **Route-level insights** with directional comparisons (A→B vs B→A)
- 🎯 **Performance metrics** including on-time %, cancellation rates, and delay patterns
- 🏢 **Enterprise-ready patterns** using Microsoft Fabric's Data Agent capabilities

## Event & Presentation

🎤 **Perth Microsoft Data Analytics & AI Meetup**

This demo was presented at the Perth Microsoft Data Analytics & AI community meetup. Watch this space or join the community for future events:

[Event Details - Perth Microsoft Data Analytics & AI Meetup](https://www.meetup.com/perth-microsoft-data-analytics-ai/events/312875877/?eventOrigin=home_next_event_you_are_attending)

## About the Dataset

### Data Source
This demo uses the **Domestic Airline On-Time Performance** dataset published by the Australian Government:

- **Primary Source**: [Research Data Australia - Domestic Airlines On-Time Performance](https://researchdata.edu.au/domestic-airlines-on-time-performance/3784747)
- **Alternative Source**: [Data.gov.au - Domestic Airline On-Time Performance](https://data.gov.au/data/dataset/domestic-airline-on-time-performance)

### Dataset Description
The dataset contains monthly aggregated statistics for Australian domestic flights, including:
- **Time Period**: January 2004 onwards (monthly granularity)
- **Coverage**: All major domestic routes and airlines in Australia
- **Grain**: One row per route, airline, and month

### Key Metrics
Each record includes:
- **Scheduled vs Flown Sectors**: Volume of flights planned and actually operated
- **Cancellations**: Number of scheduled flights that did not operate
- **On-Time Performance**: Departures and arrivals classified as on-time or delayed
- **Route Information**: Departing and arriving ports (airports)
- **Airline**: Individual carriers and "All Airlines" aggregates

## Project Files

| File | Purpose |
|------|---------|
| `Perth - User Group - Microsoft Fabric - Data Agents.pdf` | Slide deck from the Perth Microsoft Data Analytics & AI Meetup presentation |
| `otp_time_series_web.csv` | Source data file with monthly flight performance metrics |
| `agent_instructions.md` | Core instructions for the Data Agent's behavior and response patterns |
| `datasource_description.md` | High-level description of the dataset for the agent |
| `datasource_instructions.md` | Detailed technical guidance on data structure, calculations, and best practices |
| `questions.md` | Example questions and demo prompts for testing the agent |
| `README.md` | This file - setup and usage documentation |

## Prerequisites

To use this demo, you'll need:

1. **Microsoft Fabric Access**
   - An active Azure subscription
   - A Fabric capacity (F2 or higher recommended)
   - Or a **Fabric Trial** capacity (free option available)

2. **Permissions**
   - Ability to create workspaces in Microsoft Fabric
   - Access to create Lakehouses and Data Agents

## Step-by-Step Setup Instructions

### Step 1: Create or Use a Fabric Capacity

You have two options:

**Option A: Create a Paid Capacity (Recommended for Production)**
1. In the Azure Portal, create a new **Microsoft Fabric** resource
2. Choose **F2** capacity or higher
3. Note the capacity name for the next step

**Option B: Use Fabric Trial (Free Option)**
1. Go to [Microsoft Fabric](https://app.fabric.microsoft.com/)
2. Start a free Fabric trial (60 days)
3. The trial capacity will be automatically available

### Step 2: Create a Fabric Workspace

1. Navigate to [Microsoft Fabric Portal](https://app.fabric.microsoft.com/)
2. Click **Workspaces** in the left navigation
3. Click **+ New workspace**
4. Configure your workspace:
   - **Name**: e.g., "Airline Analytics Demo"
   - **Advanced settings** → **License mode**: Select your Fabric capacity (F2 or Trial)
5. Click **Apply** to create the workspace

### Step 3: Create a Lakehouse

1. In your new workspace, click **+ New**
2. Select **Lakehouse**
3. Name it: **Bronze**
4. Click **Create**

### Step 4: Upload and Load the Data

1. In the Bronze Lakehouse, navigate to the **Files** section
2. Click **Upload** → **Upload files**
3. Select the `otp_time_series_web.csv` file from this project
4. Once uploaded, click the **...** (more options) next to the CSV file
5. Select **Load to Tables**
6. Configure the load:
   - **Table name**: `otp_time_series_web`
   - **Load type**: New table
7. Click **Load**
8. Wait for the load operation to complete

### Step 5: Create the Data Agent

1. In your workspace, click **+ New**
2. Select **Data Agent**
3. Name it: **Airline On Time Performance**
4. Click **Create**

### Step 6: Configure the Data Agent

#### 6.1 Connect the Data Source

1. In the Data Agent, go to the **Data sources** tab
2. Click **+ Add data source**
3. Select **Lakehouse**
4. Choose your **Bronze** lakehouse
5. Select the table: `otp_time_series_web`
6. Click **Add**

#### 6.2 Add Data Source Instructions

1. In the Data Agent configuration, find the **Data source instructions** section
2. Open `datasource_instructions.md` from this project
3. Copy the entire contents
4. Paste into the **Data source instructions** field
5. Optionally add the contents of `datasource_description.md` at the top for additional context

#### 6.3 Add Agent Instructions

1. Find the **Agent instructions** section
2. Open `agent_instructions.md` from this project
3. Copy the entire contents
4. Paste into the **Agent instructions** field

#### 6.4 Save Configuration

1. Click **Save** or **Apply** to save all configurations
2. Wait for the agent to initialize

### Step 7: Test the Agent

1. In the Data Agent interface, find the **Chat** or **Test** section
2. Try one of these example questions:

```
Show the top 10 routes by cancellation rate in Jan 2004.
```

```
For Adelaide–Perth, chart cancellation rate and arrival on-time % over time.
```

```
Which departing port has the worst departure on-time % across all routes in 2004?
```

For more example questions, see the `questions.md` file.

## How to Use the Data Agent

### Understanding the Data Structure

- **Routes are directional**: Adelaide→Brisbane is different from Brisbane→Adelaide
- **Monthly aggregation**: All metrics are pre-aggregated by month
- **"All Airlines"**: Some rows represent combined statistics for all carriers
- **Network totals**: "All Ports–All Ports" rows show overall Australian aviation performance

### Key Metrics Explained

| Metric | Formula | Use Case |
|--------|---------|----------|
| **Cancellation Rate** | `Cancellations / Sectors_Scheduled` | Reliability measure |
| **Departure On-Time %** | `Departures_On_Time / Sectors_Flown` | Punctuality at departure |
| **Arrival On-Time %** | `Arrivals_On_Time / Sectors_Flown` | Punctuality at arrival |
| **Completion Rate** | `Sectors_Flown / Sectors_Scheduled` | Flight execution rate |

### Example Question Types

**Rankings & Comparisons**
- "What are the top 5 routes with the worst on-time performance?"
- "Compare Adelaide–Brisbane vs Brisbane–Adelaide performance"
- "Which airport has the most cancellations?"

**Trends & Time-Series**
- "Show the trend of delays for Sydney–Melbourne over 2004"
- "Which month has historically the worst cancellation rate?"
- "How has on-time performance changed year-over-year?"

**Anomaly Detection**
- "Find routes where cancellations spiked unusually high"
- "Which routes show sudden performance degradation?"

**Executive Summaries**
- "Summarize network performance for January 2004"
- "What are the 5 worst performing routes overall?"
- "Which ports should be prioritized for improvement?"

## Demo Question Bank

For a comprehensive list of demo questions organized by category (reliability, on-time performance, delays, seasonality, anomalies, etc.), refer to the `questions.md` file included in this project.

## Tips for Best Results

1. **Be specific about timeframes**: Mention specific months/years or ask for "latest available data"
2. **Specify your metric**: Ask about "cancellation rate" or "on-time %" rather than general "performance"
3. **Consider volume**: The agent will often provide context about flight volumes alongside rates
4. **Directional routes**: Remember that A→B and B→A are different routes with potentially different performance

## Data Limitations

The agent can only answer questions based on the available data:
- ✅ Monthly aggregated performance metrics
- ✅ Route-level and port-level analysis
- ✅ Airline comparisons (where data includes airline breakdown)
- ❌ Individual flight details
- ❌ Delay reasons or root causes
- ❌ Weather data
- ❌ Real-time or future predictions
- ❌ Passenger counts or financial data

If you ask about unavailable information, the agent will explain what's not possible and suggest what additional data would be needed.

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  User Questions                      │
│              (Natural Language)                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           Microsoft Fabric Data Agent                │
│                                                       │
│  ┌──────────────────────────────────────────────┐  │
│  │        Agent Instructions                     │  │
│  │  • Response guidelines                        │  │
│  │  • Terminology & concepts                     │  │
│  │  • Query planning rules                       │  │
│  └──────────────────────────────────────────────┘  │
│                                                       │
│  ┌──────────────────────────────────────────────┐  │
│  │     Data Source Instructions                  │  │
│  │  • Column definitions                         │  │
│  │  • Calculation formulas                       │  │
│  │  • Aggregation rules                          │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│          Bronze Lakehouse                            │
│                                                       │
│   Table: otp_time_series_web                        │
│   • Routes, Ports, Airlines                         │
│   • Monthly time-series data                        │
│   • Operational metrics                             │
└─────────────────────────────────────────────────────┘
```

## Additional Resources

### Microsoft Documentation
- [Microsoft Fabric Data Agent Configurations](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-configurations)
- [Microsoft Fabric Lakehouses](https://learn.microsoft.com/en-us/fabric/data-engineering/lakehouse-overview)
- [Get started with Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview)

### Data Sources
- [Research Data Australia - Original Dataset](https://researchdata.edu.au/domestic-airlines-on-time-performance/3784747)
- [Data.gov.au - Dataset Portal](https://data.gov.au/data/dataset/domestic-airline-on-time-performance)

## Troubleshooting

### Agent not responding or returning errors
- Verify the Lakehouse table `otp_time_series_web` is loaded and contains data
- Check that all instructions (agent + datasource) are properly saved
- Ensure the Data Agent has access to the Bronze Lakehouse

### Unexpected or incorrect answers
- Review the question format - be specific about metrics and timeframes
- Check if you're asking about data not available in the dataset
- Review the `datasource_instructions.md` for correct metric definitions

### Performance issues
- For trial capacities, response times may be slower
- Consider upgrading to F4 or higher for production workloads
- Large time-range queries may take longer to process

## License & Attribution

This demo uses publicly available data from the Australian Government, provided under open data licenses. When using this demo:
- Attribute the data source as shown in the "About the Dataset" section
- Comply with Microsoft Fabric licensing terms
- Follow your organization's data governance policies

## Questions or Feedback?

This demo was created for user group presentations to showcase Microsoft Fabric Data Agent capabilities. Feel free to adapt and extend it for your own use cases!

---

**Last Updated**: January 2026  
**Fabric Capability**: Data Agent (Preview/GA - check current status)  
**Demo Version**: 1.0
