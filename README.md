<div align="center">
  <img src="public/logo.png" alt="MataTabi-AI Logo" width="120" />
  <h1>MataTabi-AI</h1>
  <p><b>The Ultimate Windows Operating System Technical Assistant</b></p>
</div>

MataTabi-AI is an elite, locally-orchestrated AI assistant specialized entirely in Windows OS environments. Designed by **Harshit Agarwal**, this application utilizes a custom "Glass Box Architecture" to provide highly accurate, safe, and actionable technical support for Windows systems.

---

## 🌟 Key Features

*   **Premium ChatGPT-Style UI**: A sleek, immersive dark mode interface built with Next.js and Tailwind CSS. Features transparent AI messaging, rich Markdown formatting, and smooth animations.
*   **True Multi-Session History**: Conversations are persistently stored in your browser's local storage with zero database overhead. Instantly switch between recent chats.
*   **Rich Markdown Rendering**: AI responses are strictly formatted and rendered beautifully with headings, bulleted lists, and proper syntax-highlighted code blocks using `react-markdown` and `@tailwindcss/typography`.
*   **Enterprise-Grade Security**: 
    *   **Rate Limiting**: Built-in IP-based rate limiting (max 15 requests/minute) prevents DDoS attacks.
    *   **CSRF Protection**: Strict Origin and Host header validation.
    *   **Prompt Guardrails**: Intercepts and blocks malicious prompt injections, jailbreak attempts, and off-topic requests before they ever reach the LLM.
*   **ReAct Logic Engine**: Dynamically reasons through problems, formulating exact executable PowerShell commands, registry edits, and diagnostic steps.
*   **Guaranteed Structured Output**: An advanced recursive Output Parser ensures the AI's response adheres to strict architectural rules.

---

## 🏗️ Architecture

MataTabi-AI strictly follows the **Glass Box Architecture**:

1.  **UI/Client** (Next.js App Router)
2.  **API Route & Rate Limiting** (`app/api/chat/route.js`)
3.  **Guardrail Shield** (`app/guardrail.js`)
4.  **Knowledge Retrieval** (`app/knowledgeLoader.js`)
5.  **Prompt Chaining & Merging** (`app/main.js`)
6.  **LLM Execution** (Gemini API)
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
