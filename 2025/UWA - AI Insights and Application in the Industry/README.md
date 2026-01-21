# AI Insights and Application in the Industry

Presentation delivered at UWA Data Science Club on **April 3, 2025** at the University of Western Australia.

## Event Details

- **Date**: Thursday, April 3, 2025
- **Time**: 5:00 PM - 7:00 PM AWST
- **Location**: EZONE Central 207, UWA Student Hub
- **Organizer**: [UWA Data Science Club](https://www.dscuwa.com/)
- **Registration**: FREE event with food and drinks provided 🍕🍔

## Presenter

**Sergio Zenatti Filho**  
Senior Cloud Solution Architect, Microsoft

With over 20 years of experience as a seasoned Analytics & AI Architect, Sergio specializes in Data & AI solutions. He has a strong background in Computer Science and has worked across multiple industries to implement cutting-edge AI solutions.

Connect on LinkedIn: [/sergiozenatti](https://linkedin.com/in/sergiozenatti)

## Overview

An insightful evening exploring how AI is reshaping the enterprise landscape, from retrieval-augmented generation (RAG) to autonomous AI agents. Discover practical applications, industry use cases, and learn how to get started with Azure AI technologies.

> *"The future of AI is here. AI is reshaping our world. Making the impossible now possible. AI is redefining enterprise capability. Not in years. Not in months. Right now."*

## Agenda

### 1. Quick Introduction - AI Insights
Understanding the current state of AI in enterprise

### 2. RAG – Retrieval Augmented Generation
- Introduction to RAG architecture
- Industry use cases
- Key considerations for building RAG systems
- Hands-on demonstration

### 3. AI Agents
- Introduction to agentic AI
- Multi-agent architectures
- Industry use cases and real-world implementations
- Live agent demonstration

### 4. Next Steps - Exploring and Learning AI
- Azure skilling resources
- Certification paths
- Community resources
- Hands-on learning opportunities

## Generative AI Trends

### Current State of Enterprise AI

- **93%** of organizations are experimenting with multiple models
- **75%** of responsible AI users reported improvements in customer experience and trust
- **50%** of enterprises using generative AI will launch agentic AI pilots by 2027
- **30%** or fewer generative AI experiments moved to production

### Application Development Impact

- **1 Billion** new applications to be built over the next 24-36 months
- **70%** of organizations accelerating app modernization to bring AI into existing apps
- **90%** of developers using AI in their toolset

*Sources: Andreessen Horowitz, Deloitte Insights, KPMG, IDC, Forrester, GitHub*

## The Data and AI Landscape

### Microsoft Azure AI Platform

**Development Tools:**
- Copilot Studio
- Visual Studio
- GitHub
- Azure AI Foundry SDK

**Core Services:**
- Azure AI Foundry
- Azure OpenAI Service
- Azure AI Search
- Azure AI Agent Service
- Azure AI Content Safety
- Azure Machine Learning

**Capabilities:**
- Foundational models & Model Catalog
- Open-source models & Industry models
- Task models
- Evaluations & Customization
- Governance & Observability
- Monitoring

## Evolution of AI Capabilities

### From RPA to Agentic AI

| Technology | Capability | Example | Human Oversight |
|------------|------------|---------|-----------------|
| **RPA** | Complete repetitive tasks | "Inputs new hire information into HR System" | - |
| **Chatbot** | Answer questions | "What is the dress code in the office?" | - |
| **Single AI Agent** | Take actions | "Order a laptop for a new employee" | Human Supervisor |
| **Multi AI Agents** | Collaboratively solve complex tasks | "Onboard 5 employees by Monday" | Human Supervisor |

**Value increases with automation complexity** ↗️

## RAG - Retrieval Augmented Generation

### What is RAG?

RAG is a technique for grounding AI responses with relevant, up-to-date information:
- Retrieves information relevant to the task
- Provides it to the LLM along with a prompt
- LLM uses this specific information when responding
- Powerful and easy-to-use technique for many use cases

### First Wave Use Cases

- **Conversational chat** on private data
- **Text/Document/Audio** summarization and classification
- **Image description** and entity extractions
- **Personalized content** generation

### Key Considerations for Building RAG Systems

#### 1. Data Preparation
- Understanding Data Sources
- Data Ingestion
- Data Chunking
- Data Versioning

#### 2. Vectorization & Indexing
- Efficient Vector Indexing
- Hybrid Search Strategies
- Embedding Models

#### 3. LLM & Prompt Optimization
- LLM Models
- Prompt Engineering
- Context Optimization
- Memory & Personalization

#### 4. Orchestration & Workflow
- Orchestration Framework
- APIs
- Response Evaluation

#### 5. Security & Compliance
- E2E Solution Security
- Prompt Security / Sanitization
- AI Content Filtering
- Regulatory Compliance

#### 6. Cost & Performance Optimization
- Latency Optimization
- Token Usage Control

#### 7. Responses Evaluation & Monitoring
- Automated Metrics Tracking
- User Feedback Loop

#### 8. UI/UX & User Interaction
- UI/UX Design

#### 9. Infrastructure
- Environment Sizing
- Monitoring
- DevOps (CI/CD)

## AI Agents

### Agentic Reasoning

Agents enable complex interactions and orchestration through intelligent decision-making:

```
User Question
    ↓
Do web search? → First draft response
    ↓
Need more research? → Do revision on response
    ↓
Iterate for more details? → Revise, act and respond
    ↓
Final Response
```

**Many LLM tasks + steps in undefined sequence = agentic reasoning**

### Use Cases
- Virtual assistants
- Customer support
- Intelligent code editors
- Complex problem-solving
- Sales automation
- Proposal generation

### Agent Frameworks and Services

- **Semantic Kernel**
- **Agent Framework**
- **Autogen**
- **Langgraph**
- **Azure AI Agent Service**

### Multi-Agent Architecture

**Key Principles:**
1. **Specialization** - Each agent is specialized in different tasks or aspects of a problem
2. **Communication** - Agents can communicate and coordinate with each other
3. **Orchestration** - Structured orchestration is crucial

**Architecture Types:**
- **Vertical Architecture** - Hierarchical agent coordination
- **Horizontal Architecture** - Peer-to-peer agent collaboration

### Agent Components

Each agent typically consists of:
- **LLM** (e.g., GPT-4o)
- **Prompt** (Agent instructions)
- **Tools** (Tool-1, Tool-2, ... Tool-n)
- **Memory** (Context and history)

**Orchestrator Agent** coordinates multiple specialized agents to work as a team.

## Case Study: Fujitsu Limited - Intelligent Automation

### Business Challenge
Fujitsu needed to enhance productivity and operational efficiency by automating the time-intensive task of generating sales proposals.

### Technology Solution
Developed an intelligent, scalable AI agent for sales automation using:
- **Fujitsu Kozuchi Composite AI**
- **Semantic Kernel** (orchestrating multiple specialized AI agents)
- **Azure AI Agent Service**
- **Azure AI Search**
- **Azure AI Foundry**

The AI-driven agent interprets user inputs, integrates data from multiple sources, and produces precise, up-to-date proposals in a fraction of the time. Multiple specialized agents dynamically retrieve and synthesize knowledge from scattered internal sources, ensuring proposals are tailored and data-driven.

### Impact

**67% productivity boost** in sales proposal creation, saving countless hours to focus on customer engagement.

> *"We are using Microsoft's Semantic Kernel and Azure AI Agent Service to orchestrate multiple specialized AI agents and an orchestrator AI to coordinate them to answer questions as a team."*  
> — Hirotaka Ito, Lead Developer, Fujitsu Limited

## Demonstrations

The presentation includes three live demonstrations:

1. **Demo - AI Evolution** - Showcasing the progression from RPA to agentic AI
2. **Demo - RAG** - Live RAG system implementation and query handling
3. **Demo - Agent** - Multi-agent orchestration solving complex tasks

## Learning Resources

### Azure Skilling Offerings

#### 1. Learning Plans on MS Learn
Curated sets of content designed to help individuals and teams achieve specific learning outcomes:
- [Operationalize Generative AI Solutions](https://aka.ms/ADAI_OpGenAISols_Plan)
- [Developer Generative AI Experience](https://aka.ms/ADAI_DevGenAIExp_Plan)
- [Optimize Generative AI Models](https://aka.ms/ADAI_OptlGenAIMod_Plan)
- [Start Transforming Business with AI](https://aka.ms/StartTransformingBizAI)

**Approach:** Self-paced  
**Duration:** 12-15 hours  
**Level:** Beginner, Intermediate, Advanced (100-300)

#### 2. MS Learn Learning Paths & Modules
Free skilling content across Azure products with step-by-step guidance and interactive content.

[Browse learning paths and modules](https://learn.microsoft.com)

**Approach:** Self-paced  
**Duration:** 25 mins to 90+ mins  
**Level:** Beginner, Intermediate, Advanced (100-300)

#### 3. MS Learn Challenges
Free interactive learning through task-based achievements:
- [AI Tour Challenge](https://aka.ms/aitourchallenge)
- AI Fundamentals
- Develop Your Own Custom Copilots with Azure AI

**Approach:** Gamified learning  
**Duration:** Length of event or campaign  
**Level:** Beginner to Expert (100-400)

#### 4. Virtual Training Days
Pre-recorded large-scale training with always-on availability:
- Focus on specific training areas
- Live Q&A sessions
- 500-2,000 attendees per event

**Duration:** 2-day simu-live event with 3 hours content per day  
**Level:** Beginner to Expert (100-400)

#### 5. Credentials & Certifications
Earn globally recognized and industry-endorsed credentials:
- Microsoft Certified: Azure AI Fundamentals
- Microsoft Certified: Azure AI Engineer Associate
- Applied Skills credentials
- Performance-Based Testing

**Duration:** 60-90+ mins per module  
**Level:** Beginner to Advanced (100-300)

[Browse Credentials](https://learn.microsoft.com/credentials)

## Essential Azure Resources

### Azure Free Account
Access free products up to specified monthly amounts:
- Some are **always free** to all Azure customers
- Some are **free for 12 months** to new customers only

[Get Azure Free Account](https://azure.microsoft.com/en-au/Free#all-free-services)

### Model Context Protocol (MCP)
MCP is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools.

[Learn about MCP](https://techcommunity.microsoft.com/blog/educatordeveloperblog/unleashing-the-power-of-model-context-protocol-mcp-a-game-changer-in-ai-integrat/4397564)

### Azure AI Landing Zone Reference Architecture
When deploying AI services such as Azure OpenAI, using a Landing Zone approach helps manage resources in a structured, consistent manner, ensuring governance, compliance, and security.

[Azure OpenAI Landing Zone Reference Architecture](https://techcommunity.microsoft.com/blog/azurearchitectureblog/azure-openai-landing-zone-reference-architecture/3882102)

### Azure AI Sample Solutions, SDKs, and Templates
Access sample code, SDK documentation, and implementation templates:

[Azure AI Samples on GitHub](https://github.com/Azure-Samples/azure-ai)

## Community Resources

### Perth Microsoft Data, Analytics, AI and Power Platform Meetup
Join the local community for ongoing learning and networking:

[Perth Microsoft Data & Analytics User Group](https://www.meetup.com/perth-microsoft-data-and-analytics-user-group/)

### UWA Data Science Club
Stay connected with the UWA Data Science community:
- **Website**: [dscuwa.com](https://www.dscuwa.com/)
- **Email**: dsc.uwa@gmail.com
- **Instagram**: [@dscuwa](https://www.instagram.com/dscuwa)
- **LinkedIn**: [UWA Data Science Club](https://www.linkedin.com/company/dscuwa/)
- **Discord**: [Join the community](https://discord.gg/ZBY8jC4cnn)

**What DSC UWA Offers:**
- Industry opportunities and connections
- Workshops and lectures on data analysis, ML, AI
- Student networking events
- Friendly hackathon competitions
- Hands-on collaborative learning

**Club Sponsors:**
- [WA Data Science Innovation Hub](https://wadsih.org.au/)
- [UWA Data Institute](https://uwadatainstitute.org.au/)

## Key Takeaways

1. **AI is Transforming Now** - Enterprise AI is moving from experimentation to production at an unprecedented pace
2. **RAG is Foundation** - Retrieval-augmented generation remains the primary technique for grounding AI responses with accurate, domain-specific information
3. **Agents are Next Wave** - Multi-agent systems enable complex problem-solving through specialized AI coordination
4. **Practical Implementation** - Real-world case studies like Fujitsu demonstrate 67% productivity improvements
5. **Learning is Free** - Extensive free resources available through Azure and Microsoft Learn
6. **Community Matters** - Local and online communities provide ongoing support and learning opportunities

## Repository Contents

- **UWA - AI Insights and Application in the Industry.pdf** - Full presentation slides (23 slides)
- **README.md** - This file

## Follow-Up

For questions or further discussion:
- Connect with Sergio Zenatti Filho on [LinkedIn](https://linkedin.com/in/sergiozenatti)
- Join the [UWA Data Science Club](https://www.dscuwa.com/)
- Explore the [Perth Microsoft Data & Analytics User Group](https://www.meetup.com/perth-microsoft-data-and-analytics-user-group/)
- Start learning on [Microsoft Learn](https://learn.microsoft.com)

---

**Event Host**: UWA Data Science Club  
**Venue**: University of Western Australia, EZONE Student Hub  
**Date**: April 3, 2025  
**Presenter**: Sergio Zenatti Filho, Microsoft
