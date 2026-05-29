# ⊞ MataTabi-AI

**The Ultimate Windows Operating System Technical Assistant**

MataTabi-AI is an elite, locally-orchestrated AI assistant specialized entirely in Windows OS environments. Designed by **Harshit Agarwal**, this application utilizes a custom "Glass Box Architecture" to provide highly accurate, safe, and actionable technical support for Windows systems.

---

## 🌟 Key Features

*   **True Multi-Session History**: Conversations are persistently stored in your browser's local storage with zero database overhead. Instantly switch between recent chats.
*   **Deep Dark Mode UI**: A stunning, premium frontend built with Next.js and Tailwind CSS featuring glassmorphism, animated gradients, and interactive hover states.
*   **Strict Guardrail Shield**: Intercepts and blocks non-Windows queries instantly before they ever reach the LLM, saving tokens and ensuring strict domain adherence.
*   **ReAct Logic Engine**: Dynamically reasons through problems, formulating exact executable PowerShell commands, registry edits, and diagnostic steps.
*   **RAG Knowledge Base**: Uses TF-IDF token matching against a localized `windows_knowledge.json` file to inject context-specific facts.
*   **Guaranteed Structured JSON**: An advanced recursive Output Parser ensures the AI's response perfectly matches the required JSON Schema, automatically triggering a "Retry Prompt" if the LLM hallucinates an invalid structure.

---

## 🏗️ Architecture

MataTabi-AI strictly follows the **Glass Box Architecture**:

1.  **UI/Client** (Next.js App Router)
2.  **API Route** (`app/api/chat/route.js`)
3.  **Guardrail Shield** (`app/guardrail.js`)
4.  **Knowledge Retrieval** (`app/knowledgeLoader.js`)
5.  **Prompt Chaining & Merging** (`app/main.js`)
6.  **LLM Execution** (Gemini 3.1 Flash Lite API)
7.  **JSON Output Validator** (`app/outputParser.js`)

---

## 🚀 Getting Started

### Prerequisites
*   Node.js installed locally
*   A Gemini API Key

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Harshitagarwal113/MataTabi-AI.git
   cd MataTabi-AI
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   GEMINI_MODEL="gemini-3.1-flash-lite"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 Developer
Created by **Harshit Agarwal**. 
Dedicated to building professional, enterprise-grade AI applications.
