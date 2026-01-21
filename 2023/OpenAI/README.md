# Getting Started with Azure OpenAI

## Overview

This presentation explores the fundamentals of Azure OpenAI, covering core concepts, available models, and practical use cases for building intelligent applications.

**Presenter:** Sergio Zenatti Filho, Senior Cloud Solution Architect at Microsoft

Sergio brings over 20 years of experience designing and delivering Data and Analytics Solutions on the Microsoft Data and Analytics Platform. He is passionate about learning new technology and helping customers define the best solutions for their business.

## Contents

- `Getting start with Azure OpenAI.pdf` - Full presentation slides and content

## Key Topics

### OpenAI Models

Azure OpenAI provides access to several state-of-the-art models:

**Language Models:**
- **GPT-4** (Preview) - Most accurate model for difficult problems
  - `gpt-4`
  - `gpt-4-32k`
- **GPT-3.5-turbo** (Preview) - Fast language understanding and generation
- **GPT-3** - General purpose language models
  - `text-davinci-003`
  - `text-curie-001`
  - `text-babbage-001`
  - `text-ada-001`

**Code Models:**
- **Codex** - Generate and understand code
  - `code-davinci-002`
  - `code-cushman-001`

**Embedding Models:**
- Text similarity models for semantic search and retrieval
- Available in ada, babbage, curie, and davinci variants

### Core Concepts

#### Prompts and Completions
Azure OpenAI works by taking a prompt (user input) and generating a completion (model response). The quality of the completion depends on how well the prompt is constructed.

**Best Practices for Prompting:**
- **Be Specific** - Clearly define what you want
- **Be Descriptive** - Provide context and details
- **Double Down** - Reinforce key points in your prompt
- **Order Matters** - Structure information logically
- **Alternative Path** - Provide examples of desired output

#### Tokens
Text is processed as tokens - small chunks of words or characters. Understanding token usage is important for:
- Managing API costs
- Setting appropriate response limits
- Optimizing prompt efficiency

Example: "It's a beautiful day outside." = 7 tokens

#### Embeddings
Embeddings convert text into numerical vectors that capture semantic meaning. These vectors enable:
- Semantic search and similarity matching
- Clustering and classification
- Retrieval-Augmented Generation (RAG) patterns

Example vector: [0.021, -0.019, ..., 0.010, -0.000] (1536 elements)

#### Cosine Similarity
Measures how similar two embeddings are by comparing their vector directions.

Example: Comparing "It's a beautiful day outside" with "The sun is shining brightly, and it is a perfect day for taking a stroll in the park" yields a similarity score of 0.92.

#### Hallucinations
The model may generate plausible-sounding but inaccurate information. Awareness and mitigation strategies are important when deploying Azure OpenAI solutions.

### Model Parameters

Fine-tune model behavior using these parameters:

| Parameter | Purpose |
|-----------|---------|
| **Temperature & Top Probabilities** | Regulate the level of determinism in response generation |
| **Max Response** | Specify the number of tokens to return as model response |
| **Frequency Penalty** | Control the probability of generating identical text in the response |
| **Presence Penalty** | Control token repetition to promote new topic introduction |
| **Best of** | Produce several responses and select the one with the highest overall probability |

### Learning Approaches

**Zero-shot Learning:**
Model answers questions without prior examples.

**Few-shot Learning:**
Provide examples in the prompt to guide the model toward the desired response format and behavior.

### Content Filtering

Azure OpenAI includes content filtering capabilities that:
- Flag prompts deemed inappropriate
- Filter responses that violate content policies
- Return errors for policy violations
- Allow valid responses to pass through

## Demo: Contact Center Analytics

### Architecture

The presentation demonstrates a real-world use case combining multiple Azure services:

**Data Flow:**
1. **Audio Input** → Caller and Call-Center Agent conversations
2. **Speech-to-Text** → Azure Cognitive Services Speech API converts audio to text
3. **Intelligent Transcription** → Telephony Server processes conversation
4. **Document Processing** → Azure Form Recognizer extracts layout and structure
5. **Semantic Search** → Azure Cognitive Search indexes call content
6. **AI Analysis** → Azure OpenAI Service generates insights

**Outputs:**
- Call summaries and reasons
- Conversation trends and insights
- Detailed call history
- PowerBI near real-time analytics

**Key Components:**
- Azure Speech API (Speech-to-Text)
- Azure Form Recognizer (Layout Model)
- Azure Cognitive Search (Search Index)
- Azure OpenAI Service (Summarization, Q&A, References)
- Azure Storage
- CRM Integration

## Getting Started

### Prerequisites

1. **Azure Subscription**
   - Create an Azure account if you don't have one

2. **Azure OpenAI Access**
   - Apply for access to the Azure OpenAI Service at: https://aka.ms/oai/access

### Learning Path

1. Watch: [An Introduction to Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
2. Read: [What is Azure OpenAI?](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview)
3. Compare: Azure OpenAI vs OpenAI
4. Learn Key Concepts: Tokens, embeddings, prompting best practices
5. Review: [Data, Privacy and Security](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/data-privacy)
6. Study: Enterprise Data with ChatGPT patterns
7. Explore: [Responsible AI Guidelines](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/responsible-ai-overview)
8. Complete: [Introduction to Azure OpenAI Service](https://learn.microsoft.com/en-us/training/modules/explore-azure-openai/) training module
9. Build: Your own MVP application

### Recommended Resources

- **Azure OpenAI Documentation** - https://learn.microsoft.com/en-us/azure/ai-services/openai/
- **OpenAI Cookbook** - Real-world examples and recipes
- **GitHub Repository** - Enterprise Data with ChatGPT implementation
- **Azure OpenAI Workshop** - Hands-on training and practice
- **Microsoft Build** - Latest announcements and product updates at https://build.microsoft.com/

## Responsible AI

When using Azure OpenAI, consider:
- Potential for hallucinations and inaccurate responses
- Ethical implications of AI-generated content
- Data privacy and security
- Transparency in AI system usage
- Mitigation strategies for content safety

## Use Cases

Azure OpenAI is ideal for:
- **Customer Service** - Intelligent chatbots and support agents
- **Content Generation** - Writing assistance and summarization
- **Code Generation** - Developer productivity tools
- **Analytics** - Extracting insights from unstructured data
- **Search** - Semantic and conversational search
- **Document Processing** - Form recognition and data extraction

## Support & Help

- Connect with Sergio Zenatti: `/sergiozenatti`
- Access Azure support: https://azure.microsoft.com/support
- Community forums and GitHub discussions

---

**Presentation Date:** 2023  
**Presenter:** Sergio Zenatti Filho  
**Topic:** Getting Started with Azure OpenAI
