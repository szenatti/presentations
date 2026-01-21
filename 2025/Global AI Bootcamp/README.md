# Getting Started with Phi-4 and Chainlit

**Global AI Bootcamp Perth 2025** | April 26, 2025

## Overview

This presentation demonstrates how to build intelligent, on-device chat applications using **Microsoft Phi-4** (a compact 14B-parameter language model) and **Chainlit** (an open-source framework for rapid LLM app development). The session uses an engaging metaphor of building "smart, talking toys" to illustrate how to overcome challenges in embedding AI into resource-constrained environments.

## Presenter

**Sergio Zenatti Filho**  
Sr Cloud Solution Architect, Microsoft  
[LinkedIn: /sergiozenatti](https://linkedin.com/in/sergiozenatti)

---

## Event Details

**Perth Global AI Bootcamp 2025**
- **Date**: Saturday, 26 April 2025
- **Time**: 9:00 AM – 3:00 PM AWST
- **Location**: Level 10, 100 St Georges Terrace, Perth 6000, Australia
- **Event Type**: In-Person
- **Organized by**: [Global AI Perth](https://globalai.community/chapters/perth/)
- **Register**: [Perth Global AI Bootcamp](https://globalai.community/chapters/perth/events/perth-global-ai-bootcamp/)
- **Call for Speakers**: [Sessionize](https://sessionize.com/global-ai-bootcamp-perth-20253772/)

---

## The Problem Statement: "Our Toy Workshop Challenge"

Imagine building smart, talking toys for every child in the world. You face two big challenges:

### 1. **The Brains Problem** 🧠
Most talking-toy brains (AI models) are huge and power-hungry. Fitting a traditional large language model into a tiny teddy bear is impossible. We need something small, light, but still remarkably intelligent.

### 2. **The Assembly Problem** ⚙️
Wiring every button and switch by hand takes forever. By the time you finish, the holidays are over! We need a fast, efficient way to integrate AI into applications.

---

## The Heroes: Phi-4 and Chainlit

### **Tiny Phi (Microsoft Phi-4)** 🧩
The pocket-sized genius—a compact yet powerful AI model.

**What is Phi-4?**
- **Type**: State-of-the-art open language model
- **Architecture**: 14 billion-parameter, dense decoder-only Transformer
- **Context Window**: 16,000 tokens
- **License**: MIT (fully open-source)

**Training Details**
- **Data**: 9.8 trillion tokens (cutoff: June 2024)
- **Quality Focus**: Synthetic datasets, filtered public-domain web content, academic books, Q&A datasets
- **Compute**: 1,920 NVIDIA H100-80 GB GPUs
- **Duration**: 21 days (October – November 2024)
- **Release Date**: December 12, 2024

**Key Strengths**
- High-quality, advanced reasoning despite compact size
- Optimized for edge deployment (AI PCs, mobile, IoT devices)
- Fully open-source with MIT license
- Excellent performance-to-size ratio

**Deployment Options**
- **On Cloud**: Run on Azure ML, Azure Inference services
- **On Edge**: Deploy on AI PCs, smartphones (iOS/Android), IoT devices, gaming consoles

---

### **Magic Chain (Chainlit)** ⚡
The super-fast conveyor belt that snaps AI brains into applications with just a tap.

**What is Chainlit?**
- **Type**: Open-source Python framework for building and sharing LLM-powered chat applications
- **Release Date**: July 20, 2023 (v0.1.0)
- **Current Stable Version**: 2.5.5 (April 2025)
- **License**: Apache 2.0
- **Language Stack**: 
  - Backend: Python (≥ 3.9)
  - Frontend: React/TypeScript

**GitHub Stats**
- **Stars**: ~9.4k
- **Forks**: ~1.3k
- **GitHub**: [Chainlit/chainlit](https://github.com/Chainlit/chainlit)

**Key Features**
- **Instant UI**: ChatGPT-style web interface (no frontend coding required)
- **Step-by-Step Visualization**: See how the model reasons through problems
- **Data Logging**: Built-in logging for analytics and debugging
- **Rich Components**: Support for Markdown, code blocks, images, audio, file uploads, forms
- **Development Tools**: Trace viewer, prompt/state diff, telemetry & analytics
- **CLI**: `chainlit run my_app.py` for instant live-reload dev server

**Framework Integrations**
- LangChain
- LlamaIndex
- Haystack
- Custom Python code

**LLM Provider Support**
- OpenAI
- Anthropic
- Hugging Face
- Azure OpenAI
- Vertex AI
- Custom endpoints

**Deployment Options**
- Local development
- Docker containerization
- Static export
- Managed Chainlit Cloud

---

## Demo: Phi-4 + Chainlit + Multimodal

This presentation includes a live demonstration of:

1. **Chainlit + Phi-4** (text-based chat using Ollama)
2. **Chainlit + Phi-4 Multimodal** (vision capabilities)

### Getting Started with the Demo

The demo is available on GitHub: [phi4-chainlit-demo-ai-bootcamp](https://github.com/szenatti/phi4-chainlit-demo-ai-bootcamp)

---

## Quick Start Guide

### Prerequisites

| Component | Version | Notes |
|-----------|---------|-------|
| Python | 3.9+ | Recommended: use pyenv or VS Code Python extension |
| Git | any | For version control (optional) |
| VS Code | 1.90+ | Install Python extension |
| Ollama | 0.5.13+ | Brings its own runtime; downloads and runs Phi-4 |
| Homebrew | latest | macOS only (use Chocolatey/winget on Windows) |

### Step 1: Install Ollama + Phi-4

**macOS / Linux**
```bash
brew install ollama
ollama serve &            # runs as a background service
ollama pull phi4          # downloads the model (~9 GB)
```

**Windows (PowerShell)**
```powershell
winget install Ollama.Ollama
Start-Process "ollama" -ArgumentList "serve"
ollama pull phi4
```

### Step 2: Clone the Demo Repository

```bash
git clone https://github.com/szenatti/phi4-chainlit-demo-ai-bootcamp
cd phi4-chainlit-demo-ai-bootcamp
```

### Step 3: Set Up Virtual Environment

**macOS / Linux**
```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

**Windows (PowerShell)**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Run the Chainlit App

```bash
chainlit run app.py
```

The UI opens at **http://localhost:8000/**. Start chatting with Phi-4 running locally on your machine!

### Step 5: VS Code Debugging (Optional)

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Chainlit",
      "type": "debugpy",
      "request": "launch",
      "module": "chainlit",
      "console": "integratedTerminal",
      "args": ["run", "app.py", "-w"],
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```

Press **F5** to start Chainlit with hot-reload and debugging enabled.

---

## Demo Application Code

### Simple 10-Line Chainlit + Phi-4 App

```python
import chainlit as cl
import httpx

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "phi4"

@cl.on_message
async def main(message: cl.Message):
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "messages": [{"role": "user", "content": message.content}],
                "stream": False,
            },
            timeout=60,
        )
    data = resp.json()
    await cl.Message(content=data["message"]["content"]).send()
```

### For Azure OpenAI Integration

See the included `app-azure-phi4.py` in the repository for Azure OpenAI integration examples.

---

## Demo Files

This presentation includes sample media files for testing multimodal capabilities:

| File | Type | Use Case |
|------|------|----------|
| `10_April_Fool_Day's_Story_(Terrence_-_April_Fool).ogg` | Audio | Test audio processing with Phi-4 Multimodal |
| `1889_recording_by_Otto_von_Bismarck.ogg` | Audio | Historical audio transcription demo |
| `Barbara_Sahakian_BBC_Radio4_The_Life_Scientific_29_May_2012_b01j5j24.flac` | Audio (FLAC) | High-quality audio processing example |
| `_Come_to_the_orchard_in_spring__by_Rumi.wav` | Audio | Poetry reading sample |
| `Perth_CBD_skyline_from_State_War_Memorial_Lookout,_2023,_04_b.jpg` | Image | Vision-based demo with local imagery |

**Note**: These demo files can be used to test Phi-4 Multimodal's image and audio understanding capabilities within the Chainlit UI.

---

## Repository Contents

The demo repository includes:

| File | Purpose |
|------|---------|
| `app.py` | Chainlit + Phi-4 (Ollama) implementation |
| `app-azure-phi4.py` | Chainlit + Phi-4 (Azure OpenAI) implementation |
| `requirements.txt` | Python dependencies |
| `chainlit.md` | Chainlit UI configuration |
| `.chainlit/` | Chainlit configuration directory |
| `public/` | Static assets |
| `Demo Files/` | Sample media for multimodal testing |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Connection refused** | Ensure `ollama serve` is running in the background |
| **Long first response** | Phi-4 loads into RAM on first call—give it ~30 seconds |
| **Out-of-memory error** | Use a quantized variant: `ollama pull phi4:Q5_K_M` |
| **VS Code debugger stops early** | Check that debugpy is installed: `pip install debugpy` |

---

## Next Steps After the Demo

1. **🎨 Explore Chainlit Components**: Try cards, widgets, file upload functionality
2. **🔗 Add Tool Integration**: Integrate LangChain or LlamaIndex for function calling
3. **📝 Build RAG Pipelines**: Add a `/data` folder and implement Retrieval-Augmented Generation
4. **🚀 Containerize**: Use Docker + GPU acceleration for faster inference
5. **📊 Deploy**: Move from local dev to cloud or edge deployment

---

## Real-World Use Cases

### Edge AI Applications
- **IoT Devices**: Run Phi-4 on edge devices for privacy-preserving AI
- **Mobile Apps**: Deploy on iOS/Android with offline capabilities
- **Gaming**: Integrate into games for NPC dialogue generation
- **Embedded Systems**: Add intelligence to hardware without cloud dependency

### Enterprise Applications
- **Customer Support**: Build chatbots that run locally
- **Internal Knowledge Bases**: Deploy RAG systems on-premises
- **Data Privacy**: Process sensitive data without sending to cloud
- **Cost Optimization**: Reduce cloud API costs with on-premises models

### Creative Applications
- **Content Generation**: Write stories, emails, code with local inference
- **Interactive Toys**: Exactly what our "smart toy workshop" needs!
- **Educational Tools**: Interactive learning assistants
- **Accessibility**: Voice and text assistance applications

---

## Learning Resources

### Official Documentation
- **Chainlit Docs**: [https://docs.chainlit.io/](https://docs.chainlit.io/)
- **Microsoft Phi-4 Blog**: [aka.ms/phi4](http://aka.ms/phi4)
- **Ollama**: [https://ollama.ai/](https://ollama.ai/)

### GitHub Repositories
- **Demo Repository**: [phi4-chainlit-demo-ai-bootcamp](https://github.com/szenatti/phi4-chainlit-demo-ai-bootcamp)
- **Phi-4 Multimodal**: [phi4-multimodel](https://github.com/szenatti/phi4-multimodel)
- **Chainlit**: [Chainlit/chainlit](https://github.com/Chainlit/chainlit)

### Blog Posts & Articles
- Installing & Running Microsoft Phi-4 Multimodal Instruct Locally with Chainlit
- Chainlit Quick-start Guide

---

## Key Insights

### Why Phi-4?
✅ **Compact**: 14B parameters fit on edge devices  
✅ **Performant**: Advanced reasoning despite small size  
✅ **Open**: MIT license, fully customizable  
✅ **Efficient**: Lower latency than cloud calls  
✅ **Private**: Keep data on-device  

### Why Chainlit?
✅ **Fast Development**: Build production-ready UI in minutes  
✅ **Rich Features**: Analytics, debugging, file uploads  
✅ **Framework Agnostic**: Works with any Python code  
✅ **Easy Deployment**: Local, Docker, or managed cloud  
✅ **Active Community**: Well-maintained with regular updates  

### Together: Phi-4 + Chainlit = 🚀
**Lightning-fast, high-performance AI applications** that you can build and deploy in minutes!

---

## Community & Support

**Global AI Community**
- **Homepage**: [https://globalai.community/](https://globalai.community/)
- **Perth Chapter**: [https://globalai.community/chapters/perth/](https://globalai.community/chapters/perth/)
- **Events**: [https://globalai.community/chapters/perth/events/](https://globalai.community/chapters/perth/events/)

**Stay Connected**
- YouTube: [@globalaicommunity](https://www.youtube.com/globalaicommunity)
- LinkedIn: [Global AI Community](https://www.linkedin.com/company/global-ai-community)
- Twitter/X: [@GlobAICommunity](https://x.com/GlobAICommunity)
- Medium: [global-ai-community](https://medium.com/global-ai-community)

---

## Q&A

Have questions? Connect with the presenter:

**Sergio Zenatti Filho**
- LinkedIn: [/sergiozenatti](https://linkedin.com/in/sergiozenatti)
- Microsoft: Sr Cloud Solution Architect

---

## License

- **Phi-4**: MIT
- **Chainlit**: Apache 2.0
- **Demo Repository**: MIT

---

**Last Updated**: January 21, 2026  
**Event Date**: April 26, 2025  
**Presentation Deck**: PHI-4 - Chainlit.pdf  
**Demo Repository**: [phi4-chainlit-demo-ai-bootcamp](https://github.com/szenatti/phi4-chainlit-demo-ai-bootcamp)  
**Event**: [Perth Global AI Bootcamp 2025](https://globalai.community/chapters/perth/events/perth-global-ai-bootcamp/)
