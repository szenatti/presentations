# Intro to AI Functions in Microsoft Fabric

**Perth Microsoft Data, Analytics & AI User Group** | 2024

## Overview

This presentation introduces **AI Functions in Microsoft Fabric**, a powerful feature that enables data professionals to seamlessly enrich and transform data using state-of-the-art Large Language Models (LLMs). The session demonstrates how AI-powered functions simplify complex text processing tasks such as sentiment analysis, translation, summarization, and classification—all achievable with just a single line of code.

## Presenter

**Sergio Zenatti Filho**  
Sr Cloud Solution Architect, Microsoft  
[LinkedIn: /sergiozenatti](https://linkedin.com/in/sergiozenatti)

---

## Event Details

**Perth Microsoft Data, Analytics & AI User Group**
- **Event Link**: [Perth Microsoft Data Analytics & AI Meetup](https://www.meetup.com/perth-microsoft-data-analytics-ai/events/307191115/?eventOrigin=group_events_list)
- **Location**: Perth, Australia
- **Audience**: Data professionals, analytics architects, AI practitioners

---

## What is Microsoft Fabric?

**The Unified Data Platform for AI Transformation**

Microsoft Fabric is a comprehensive platform that brings together all your data and analytics capabilities in one integrated environment:

### Core Components

| Component | Purpose |
|-----------|---------|
| **Data Factory** | Data orchestration and pipeline management |
| **Analytics** | Advanced analytics and data warehousing |
| **Databases** | Relational and NoSQL data storage |
| **Real-Time Intelligence** | Streaming and real-time analytics |
| **Power BI** | Business intelligence and visualization |
| **OneLake** | Centralized data lake storage |
| **AI** | AI and machine learning capabilities |
| **Industry Solutions** | Pre-built solutions for specific industries |
| **Partner Workloads** | Third-party integrations |

### Governance & Security

- **Microsoft Purview**: Data governance and compliance
- **AI-Powered**: Intelligent features throughout the platform

---

## AI Functions: Transform Data with LLMs

### What Are AI Functions?

AI Functions are **native Pandas and Spark functions** that bring Large Language Models directly to your data. They enable you to:

✅ Transform and enrich data with user-friendly AI functions  
✅ Invoke state-of-the-art LLMs in just a single line of code  
✅ Apply advanced NLP capabilities without writing complex code  
✅ Process data natively in Fabric notebooks  

### Available AI Functions (Preview)

| Function | Purpose | Example Use Case |
|----------|---------|------------------|
| **fix_grammar()** | Rewrites text with improved grammar | Clean up customer feedback text |
| **analyze_sentiment()** | Analyzes sentiment and computes score | Rate customer satisfaction from reviews |
| **summarize(max_words)** | Summarizes text to specified word count | Condense support tickets or articles |
| **translate(to_lang)** | Translates text to specified language | Localize content for global audiences |
| **similarity(other)** | Computes similarity scores between texts | Find duplicate or related documents |
| **classify(categories)** | Classifies text into provided categories | Auto-tag support tickets or products |
| **mask(categories)** | Masks words matching provided categories | PII detection and redaction |

### Coming Soon

Additional AI Functions will be available for:
- 🔮 **Spark environments** – Distributed processing at scale
- 🔮 **SQL** – Native SQL function support
- 🔮 **OneLake** – Direct OneLake data processing
- 🔮 **Data Wrangler** – Visual data preparation UI

---

## AI-Powered Data Enrichment

### The Power of Seamless Integration

#### Before (Traditional Approach)
```
Data → Export → External API Call → Transform → Re-Import
(Multiple steps, complexity, potential data loss)
```

#### After (AI Functions in Fabric)
```
Data → Apply AI Function → Enriched Data
(Single line of code, native integration)
```

### Demo Example: Address Enrichment

**Scenario**: You have customer records with incomplete address data.

**Input DataFrame:**
```
Name        Address
Anne F.     123 First Street, 98765
George K.   345 Washington Avenue, London
```

**Apply Custom AI Function:**
```python
df['Country'] = df['Address'].apply_ai_function('extract_country')
```

**Output DataFrame:**
```
Name        Address                          Country
Anne F.     123 First Street, 98765          USA
George K.   345 Washington Avenue, London    UK
```

---

## Demo Datasets

This presentation includes six richly detailed datasets for hands-on AI Function demonstrations:

### 1. **Cancer Dataset (UAE)**
**File**: `cancer_dataset_uae.csv` | **Rows**: 10,000+

**Purpose**: Demonstrate medical data enrichment and analysis

**Key Columns**:
- Patient demographics (Age, Gender, Nationality, Emirate)
- Clinical data (Diagnosis Date, Cancer Type, Cancer Stage)
- Treatment information (Treatment Type, Hospital, Physician)
- Health metrics (Smoking Status, Comorbidities, Height, Weight)
- Outcomes (Recovery Status, Death Date, Cause)

**AI Function Examples**:
- `summarize()` – Create clinical summaries for records
- `classify()` – Categorize treatment outcomes
- `analyze_sentiment()` – Assess patient health records tone

---

### 2. **Customer Support Tickets**
**File**: `customer_support_tickets.csv` | **Rows**: 29,800+

**Purpose**: Demonstrate sentiment analysis and ticket classification

**Key Columns**:
- Customer information (Name, Email, Age, Gender)
- Product & purchase data (Product Purchased, Date of Purchase)
- Ticket details (Type, Subject, Description, Status)
- Resolution info (Priority, Channel, Resolution Time)
- Metrics (First Response Time, Resolution Time, Satisfaction Rating)

**AI Function Examples**:
- `analyze_sentiment()` – Rate customer satisfaction from descriptions
- `classify()` – Auto-categorize ticket types
- `summarize()` – Create ticket summaries
- `fix_grammar()` – Standardize ticket descriptions

---

### 3. **Fashion Retail Sales**
**File**: `Fashion_Retail_Sales.csv` | **Rows**: 3,400+

**Purpose**: Demonstrate product review and transaction analysis

**Key Columns**:
- Customer Reference ID
- Item Purchased (Handbag, Tunic, Tank Top, Leggings, etc.)
- Purchase Amount
- Date of Purchase
- Review Rating
- Payment Method

**AI Function Examples**:
- `analyze_sentiment()` – Analyze review ratings and feedback
- `classify()` – Categorize products by description
- `summarize()` – Condense product reviews

---

### 4. **IMDb Top 5000 TV Shows**
**File**: `imdb_top_5000_tv_shows.csv` | **Rows**: 5,000+

**Purpose**: Demonstrate entertainment data enrichment and classification

**Key Columns**:
- Title and IMDb identifier
- Year started and ended
- Rating and number of votes
- Directors and writers
- Genres
- IMDb links

**AI Function Examples**:
- `classify()` – Auto-tag shows by genre based on synopsis
- `summarize()` – Generate show descriptions
- `similarity()` – Find similar shows
- `analyze_sentiment()` – Rate show quality based on descriptions

---

### 5. **Tariff Calculations**
**File**: `Tariff Calculations.csv` | **Rows**: Variable

**Purpose**: Demonstrate pricing and calculation data processing

**AI Function Examples**:
- `summarize()` – Create tariff descriptions
- `classify()` – Categorize tariff types
- `translate()` – Localize pricing tiers

---

### 6. **Tariff Calculations plus Population**
**File**: `Tariff Calculations plus Population.csv`

**Purpose**: Demonstrate enriched demographic and pricing data analysis

**Extended Columns**: Original tariff data plus population metrics

**AI Function Examples**:
- `classify()` – Segment customers by demographics and tariffs
- `analyze_sentiment()` – Rate tariff competitiveness
- `summarize()` – Create region-specific pricing summaries

---

## Hands-On Demo Walkthrough

### Scenario: Customer Support Ticket Enrichment

**Goal**: Automatically analyze and categorize incoming support tickets

#### Step 1: Load Data
```python
import pandas as pd
import fabric_ai_functions as fai

# Load support tickets
tickets_df = pd.read_csv('customer_support_tickets.csv')
```

#### Step 2: Apply AI Functions

**Sentiment Analysis:**
```python
tickets_df['sentiment'] = tickets_df['TicketDescription'].apply(
    fai.analyze_sentiment()
)
```

**Automatic Categorization:**
```python
categories = ['Bug Report', 'Feature Request', 'Documentation', 'Other']
tickets_df['auto_category'] = tickets_df['TicketDescription'].apply(
    fai.classify(categories)
)
```

**Summary Generation:**
```python
tickets_df['summary'] = tickets_df['TicketDescription'].apply(
    fai.summarize(max_words=50)
)
```

#### Step 3: Results
- **Sentiment Scores**: 0.85 (positive), -0.12 (negative), 0.0 (neutral)
- **Auto-Categories**: Automatically tagged based on content
- **Summaries**: Concise ticket summaries for quick review

---

## Key Advantages of AI Functions

### ✅ **Speed**
Single-line implementation beats traditional ETL processes

### ✅ **Simplicity**
No complex prompting or API management required

### ✅ **Native Integration**
Works directly in Fabric notebooks with Pandas and Spark

### ✅ **Scalability**
Apply LLM operations across millions of rows

### ✅ **Cost-Effective**
Built into Fabric; no external API calls

### ✅ **Data Privacy**
Keep sensitive data within your Fabric environment

---

## Common Use Cases

### Customer Service
- Analyze ticket sentiment automatically
- Classify support requests by urgency
- Summarize lengthy customer messages
- Detect PII for compliance

### Healthcare
- Summarize medical records
- Classify patient data by condition
- Mask sensitive health information
- Translate medical documents

### Retail & E-Commerce
- Analyze product reviews
- Classify customer feedback
- Tag products by sentiment
- Generate product descriptions

### Financial Services
- Classify transactions
- Analyze regulatory documents
- Summarize contracts
- Mask account information

### Content & Marketing
- Translate content for global audiences
- Classify content by topic
- Generate summaries for social media
- Analyze brand sentiment

---

## AI-Powered Data Enrichment Features

### Transform Data Natively
- **No data export required** – Process directly in Fabric
- **Schema-aware** – Automatically understands your data types
- **Scalable** – Handle millions of rows efficiently

### Copilot Integration
- **AI-assisted configuration** – Copilot helps you set up functions
- **Intelligent suggestions** – Recommendations based on your data

### Advanced Reasoning
- **Multi-step operations** – Chain AI functions for complex transformations
- **Custom prompts** – Define specific requirements for your use cases

---

## Gen AI Acceleration in Fabric

Microsoft Fabric leverages Gen AI across three pillars:

### 1. **Copilot-Accelerated Experiences**
- Intelligent UI assistance
- Natural language querying
- Auto-generated visualizations

### 2. **AI-Driven Insights**
- Automated anomaly detection
- Pattern recognition
- Trend analysis

### 3. **Custom Generative AI for Your Data**
- **AI Functions** – Apply LLMs to your data
- **Custom models** – Train models on your datasets
- **Fabric AI** – Native AI/ML capabilities

---

## Getting Started

### Prerequisites
- Microsoft Fabric subscription
- Access to Fabric workspace
- Basic Python knowledge (for Pandas operations)

### Next Steps

1. **Open a Fabric Notebook**
   - Create a new notebook in your Fabric workspace

2. **Load Your Data**
   ```python
   df = spark.read.csv('your_data.csv', header=True, inferSchema=True).toPandas()
   ```

3. **Apply an AI Function**
   ```python
   df['enriched_column'] = df['text_column'].apply(fai.analyze_sentiment())
   ```

4. **Explore Results**
   - Visualize with Power BI
   - Export for further analysis
   - Share insights with stakeholders

---

## Best Practices

### ✅ Do's
- Start with small datasets to test functions
- Validate AI function outputs against expected results
- Use AI Functions for data enrichment, not replacement
- Document your transformations for reproducibility
- Monitor performance metrics and costs

### ❌ Don'ts
- Don't apply AI Functions to already-processed data unnecessarily
- Don't ignore potential bias in LLM outputs
- Don't expose sensitive data in function parameters
- Don't assume 100% accuracy from AI functions
- Don't forget to validate results

---

## Pricing & Availability

### Availability
- **Current Status**: Preview (as of presentation)
- **GA Timeline**: Check Microsoft Fabric roadmap for updates
- **Platforms**: Notebooks, Spark, SQL, OneLake (coming soon)

### Licensing
- Included with Fabric capacity subscription
- No additional per-function charges (during preview)
- Check Microsoft pricing for details

---

## Resources & Documentation

### Official Microsoft Resources
- [Microsoft Fabric Documentation](https://learn.microsoft.com/en-us/fabric/)
- [AI Functions in Fabric](https://learn.microsoft.com/en-us/fabric/)
- [Fabric AI Blog](https://aka.ms/fabric-ai)

### Learning Paths
- [Get started with Fabric](https://learn.microsoft.com/en-us/training/paths/introduction-to-microsoft-fabric/)
- [Data engineering in Fabric](https://learn.microsoft.com/en-us/training/paths/data-engineering-fabric/)
- [Analytics in Fabric](https://learn.microsoft.com/en-us/training/paths/analytics-fabric/)

### Community
- [Microsoft Fabric Community](https://community.fabric.microsoft.com/)
- [Perth Microsoft Data Analytics & AI User Group](https://www.meetup.com/perth-microsoft-data-analytics-ai/)

---

## Q&A

Have questions about AI Functions or Microsoft Fabric?

**Connect with the Presenter:**
- **Sergio Zenatti Filho**
- LinkedIn: [/sergiozenatti](https://linkedin.com/in/sergiozenatti)
- Role: Sr Cloud Solution Architect, Microsoft

---

## Demo Files

This presentation includes sample datasets for hands-on practice with AI Functions:

| File | Records | Primary Use Case |
|------|---------|-----------------|
| `cancer_dataset_uae.csv` | 10,000+ | Medical data summarization & classification |
| `customer_support_tickets.csv` | 29,800+ | Sentiment analysis & ticket classification |
| `Fashion_Retail_Sales.csv` | 3,400+ | Review analysis & product classification |
| `imdb_top_5000_tv_shows.csv` | 5,000+ | Genre classification & similarity analysis |
| `Tariff Calculations.csv` | Variable | Pricing data summarization |
| `Tariff Calculations plus Population.csv` | Variable | Demographic segmentation & analysis |

All datasets are provided in CSV format for easy import into Fabric notebooks.

---

## Key Takeaways

1. **AI Functions simplify LLM integration** – Apply powerful AI with single lines of code
2. **Native to Fabric** – No external APIs or complex setup required
3. **Versatile applications** – Use across customer service, healthcare, retail, finance, and more
4. **Privacy-focused** – Keep data within your Fabric environment
5. **Scalable** – Handle millions of rows efficiently
6. **Gen AI-powered** – Part of Fabric's broader AI transformation capabilities

---

**Last Updated**: January 21, 2026  
**Presentation Deck**: Intro to AI Functions In Microsoft Fabric.pdf  
**Event**: [Perth Microsoft Data Analytics & AI User Group](https://www.meetup.com/perth-microsoft-data-analytics-ai/events/307191115/?eventOrigin=group_events_list)  
**Microsoft Fabric**: [https://aka.ms/fabric](https://aka.ms/fabric)
