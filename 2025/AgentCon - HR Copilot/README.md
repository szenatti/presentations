# HR Copilots in Action: Low-Code Agents with Microsoft Copilot Studio

**Presented at AgentCon 2025 Perth** | January 2025

## Overview

This presentation demonstrates how citizen developers and HR professionals can leverage **Microsoft Copilot Studio** to create intelligent, low-code AI agents for employee self-service. The session showcases a real-world proof-of-concept for **FinSight**, a global financial technology company with over 600 employees across Australian offices.

## Presenters

- **Sabrina da Motta Zenatti** – Founder and Analytics Architect @ 365 Innovator
  - [LinkedIn: /sabrinamottazenatti](https://linkedin.com/in/sabrinamottazenatti)
  
- **Sergio Zenatti Filho** – Senior Cloud Solution Architect @ Microsoft
  - [LinkedIn: /sergiozenatti](https://linkedin.com/in/sergiozenatti)

---

## What You'll Learn

This presentation covers:

1. **Copilot Studio Overview** – Key capabilities for building enterprise-grade agents
2. **Live Build-Along** – Step-by-step demonstration of creating HR agents
3. **Real-Time Data Integration** – Connecting agents to business data sources

### Agenda

- **Problem Statement** – FinSight's HR challenges and the need for self-service
- **Solution Architecture** – How Microsoft Copilot Studio solves these challenges
- **Agent 1: Priya – Policy Expert** – Retrieving and answering policy questions
- **Agent 2: Logan – Leave Expert** – Managing leave balances and requests
- **What's Next** – Use cases and future opportunities

---

## The Business Problem

### FinSight Company

- **Employees**: 600+ across Australian offices
- **Key Challenges**:
  - Employees frequently ask questions about **leave policies**, **leave balances**, and **employment contracts**
  - Employees need clarity on **health & safety policies** and **training eligibility**
  - HR team spends significant time answering repetitive questions
  - Information is scattered across SharePoint, OneDrive, and HR management systems

### Data Sources

The solution integrates data from multiple sources:

- **Leave Management**: Employee contracts, leave policies, leave balances
- **Policies**: Health & Safety, Training, Fair Work compliance
- **HRIS**: Employee records and leave booking systems

---

## The Solution: Two Intelligent Agents

### Agent 1: **Priya – Policy Expert**

**Purpose**: Answer HR policy questions with compliance references

**Capabilities**:
- Retrieves policy information from embedded documents
- Cites Fair Work Australia guidelines for compliance verification
- Answers questions about:
  - Leave entitlements and policies
  - Employment contract terms
  - Notice periods and termination procedures
  - Health & Safety reporting
  - Training eligibility requirements

**Technology**:
- Uses vector search (pgvector) for semantic policy retrieval
- Integrates with Fair Work Australia website for compliance validation
- Azure OpenAI for natural language understanding and summarization

---

### Agent 2: **Logan – Leave Expert**

**Purpose**: Help employees manage their leave

**Capabilities**:
1. **Check Leave Balances** – View current annual and sick leave balances
2. **Future Leave Balance** – Project leave availability for planning holidays
3. **Book Leave Request** – Submit annual or sick leave requests

**Technology**:
- Queries leave management database (PostgreSQL)
- Calculates accruals based on employment type
- Accounts for public holidays (Australian calendar)
- Provides real-time leave balance updates

**Leave Types**:
- Annual Leave (20 days/year for full-time employees)
- Sick/Carer's Leave (10 days/year for full-time employees)

---

## Solution Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Microsoft Copilot Studio                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐           ┌──────────────────┐        │
│  │   Priya Agent    │           │   Logan Agent    │        │
│  │ (Policy Expert)  │           │ (Leave Expert)   │        │
│  └────────┬─────────┘           └────────┬─────────┘        │
│           │                              │                  │
├───────────┼──────────────────────────────┼──────────────────┤
│           │                              │                  │
│      ┌────▼────────────────────────────┐│                   │
│      │  Azure OpenAI Integration       ││                   │
│      │  (Embeddings & Chat Models)    ││                   │
│      └─────────────────────────────────┼┘                   │
│                                        │                   │
│  ┌──────────────────────────────────────┼──────────────────┐│
│  │         Data Sources                 │                  ││
│  ├──────────────────────────────────────┼──────────────────┤│
│  │  • PostgreSQL Database               │  • Fair Work    ││
│  │    - Employee data                   │    Australia    ││
│  │    - Leave balances & bookings       │    Website      ││
│  │    - Public holidays                 │                 ││
│  │    - Policy embeddings               │                 ││
│  │  • SharePoint / OneDrive Policies    │                 ││
│  └──────────────────────────────────────────────────────────┘│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Getting Started with the POC

### Files in This Folder

- **Database Schema and Population Script.sql** – SQL commands to set up the PostgreSQL database with sample FinSight data
- **Sample Documents/** – Policy documents used for training agents:
  - `FinSight Leave Policy.md` – Leave entitlements and procedures
  - `FinSight Employee Contract Policy.md` – Contract terms and conditions
  - `FinSight Training Policy.md` – Eligibility and approval processes
  - `FinSight Workplace Health and Safety Policy.md` – Health & Safety procedures

### Architecture Components

#### Data Layer (PostgreSQL)

- **leave_balances** – Current leave balance per employee and type
- **leave_accruals** – Accrual rates (20 days/year annual, 10 days/year sick)
- **leave_bookings** – Approved leave requests and dates
- **public_holidays** – Australian public holiday calendar
- **policies** – Policy text with vector embeddings for semantic search
- **employee** – Employee master data

#### AI Models

- **Azure OpenAI GPT-4o** – Natural language understanding and generation
- **Text Embeddings** – 1536-dimensional vectors for semantic policy search
- **Web Search** – Integration with Fair Work Australia for compliance

### POC Scope

- **Leave Types**: Annual and Sick Leave
- **Geography**: Australian operations only
- **Employees**: Demo data for one employee (EMP001), scalable to 600+
- **Languages**: English
- **Deployment**: Local machine with Docker Compose (no VPN required)

### Setup Requirements

- Docker Desktop ≥ 4.27
- 16 GB RAM
- Internet access (for Azure OpenAI API)
- Azure credentials configured

### Setup Steps

1. Configure Azure OpenAI endpoints and keys
2. Set environment variables:
   ```bash
   export LLM_PROVIDER=AZURE
   export AZURE_OPENAI_ENDPOINT=...
   export AZURE_OPENAI_KEY=...
   ```
3. Run Docker Compose stack
4. Access web chat UI at `http://localhost:3000`

---

## Key Learnings

### Why Microsoft Copilot Studio?

1. **Low-Code Development** – Non-developers can build sophisticated agents
2. **Enterprise Integration** – Seamless connection to Azure services and data
3. **Rapid Deployment** – Demo-ready solutions in days, not months
4. **Scalability** – Handles 600+ employees with minimal infrastructure
5. **Compliance-Ready** – Built-in compliance features for Fair Work Australia

### Best Practices

- **Data Quality** – Ensure accurate leave balances and policy documents
- **Regular Updates** – Keep policy embeddings fresh with monthly refresh
- **User Testing** – Validate agent responses against source documents
- **Audit Trail** – Log all queries and responses for compliance
- **Fallback Handling** – Graceful degradation when external APIs unavailable

---

## Use Cases Beyond HR

### Customer Support

- **Automated Chatbots** – Handle common inquiries 24/7
- **Order Tracking & Management** – Real-time status updates
- **Personalized Recommendations** – ML-based product suggestions

### Employee Assistance

- **IT Support** – Password resets, software installation, access requests
- **Internal Knowledge Base** – Quick access to company resources
- **Onboarding** – Streamlined employee orientation

### Sales and Marketing

- **Lead Qualification** – Intelligent lead scoring
- **Product Information Delivery** – Automated product demos
- **Sales Support** – Quote and proposal generation

---

## What's Next?

### Post-POC Enhancements

1. **OAuth & Role-Based Access** – Integration with Azure AD
2. **Live HRIS Connectors** – Real-time data from Workday, SAP SuccessFactors
3. **Multi-Language Support** – Expand beyond English for global workforce
4. **Desktop Application** – Electron-based installer for one-click deployment
5. **Extended Compliance** – Additional Fair Work documentation sources
6. **Analytics Dashboard** – Track agent performance and user satisfaction

### Technical Roadmap

- Migrate to production Azure App Service
- Implement authentication and authorization
- Add voice interaction capabilities
- Expand policy database with new leave types
- Integrate with Teams for employee communication

---

## Event Details

**Event**: AgentCon 2025 Perth  
**Date**: January 10, 2025  
**Time**: 12:00 PM – 12:30 PM (Cortana Room)  
**Community**: [Global AI Community – Perth Chapter](https://globalai.community/chapters/perth/events/agentcon-2025-perth/)

---

## Resources

### Microsoft Learn Paths

- [Create and extend custom copilots with Microsoft Copilot Studio](https://learn.microsoft.com/en-us/training/paths/create-extend-custom-copilots-microsoft-copilot-studio/)

### Fair Work Australia

- [Fair Work Act 2009](https://www.fairwork.gov.au/)
- [National Employment Standards](https://www.fairwork.gov.au/employee-entitlements-and-provisions/national-employment-standards)
- [Leave Entitlements](https://www.fairwork.gov.au/employee-entitlements-and-provisions/leave-and-public-holidays)

### Additional Documentation

- See `FinSight HR Leave Assistant – Product Requirements Document.md` for technical specifications
- See `Sample Documents/` folder for policy templates used in the POC

---

## Questions?

Connect with the presenters:

- **Sabrina da Motta Zenatti** – [LinkedIn](https://linkedin.com/in/sabrinamottazenatti) | [365 Innovator](https://365innovator.com)
- **Sergio Zenatti Filho** – [LinkedIn](https://linkedin.com/in/sergiozenatti) | [Microsoft Learn](https://microsoft.com)

---

## License

This presentation and accompanying materials are provided for educational purposes. Refer to LICENSE file for usage rights.

---

**Last Updated**: January 21, 2026  
**Presentation Deck**: AgentCon - HR Copilots-New.pdf
