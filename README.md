# MataTabi-AI

MataTabi-AI is an advanced, Next.js-based AI Agent Pipeline specialized in Windows troubleshooting, system configuration, and security diagnostics.

## System Architecture

The application is entirely JavaScript-based, designed for serverless compatibility (Vercel), and incorporates the following core modules:

1. **Guardrail Layer (`app/guardrail.js`)**: Real-time detection of prompt injections, role manipulations, and malicious intents.
2. **Knowledge Retrieval (`app/knowledgeLoader.js`)**: Semantic searching over a local JSON Knowledge Base (`docs/windows_knowledge.json`).
3. **ReAct & Prompt Chain (`app/promptChain.js`, `app/reactAgent.js`)**: A sophisticated Reason + Act loop that internally simulates actions before replying.
4. **Output Parser (`app/outputParser.js`)**: Validates LLM responses against strict JSON schemas (`parsers/outputSchema.json`).
5. **Session History**: Maintains stateless conversation history maps for multi-turn conversational context.
6. **Gemini API Integration (`app/gemini.js`)**: Direct REST integration with Google's Gemini 1.5 Pro.

## Project Structure

```text
project/
├── app/
│   ├── main.js             # Core Orchestrator
│   ├── gemini.js           # API Connector
│   ├── knowledgeLoader.js  # JSON KB Loader
│   ├── outputParser.js     # Response Validator
│   ├── promptChain.js      # Prompt Engineering Logic
│   ├── reactAgent.js       # ReAct Loop Implementation
│   └── guardrail.js        # Security Shield
├── prompts/                # AI Prompt Templates
├── parsers/
│   └── outputSchema.json   # Output Validation Schema
├── docs/
│   ├── windows_knowledge.json # Core KB Data
│   └── ...
└── README.md
```

## Setup & Execution

1. Clone the repository to your local environment.
2. Install dependencies (Next.js environment required).
3. Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Requirements Met
* JavaScript Only
* Next.js & Vercel Compatible
* Gemini API Integration
* JSON Knowledge Base driven
* Session-based Chat History
* Database-free architecture
