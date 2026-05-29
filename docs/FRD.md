# MataTabi-AI Functional Requirement Document (FRD)

## 1. Functional Requirements
MataTabi-AI requires a rigid, linear pipeline to process user queries. Every request must pass through the predefined Glass Box workflow to ensure accuracy, security, and adherence to the Windows-specific domain. The system relies entirely on stateless operations, with no external database layer, using Next.js Serverless/Edge functions to process data via the Gemini API.

## 2. Workflow Definitions
The system operates on the following **Glass Box Workflow**:

1.  **User Query:** The raw string input submitted via the client UI.
2.  **Guardrail Validation:** Initial filtering to block non-Windows queries, malicious prompts, and off-topic requests.
3.  **Intent Detection:** Classification of the query into specific Windows domains (e.g., PowerShell, Registry, Networking, BSOD).
4.  **Knowledge Retrieval:** Fetching static contexts, error codes, or standard procedures from the local JSON Knowledge Base.
5.  **Prompt Chaining:** Assembling the validated query, intent, and retrieved knowledge into a structured super-prompt.
6.  **ReAct Reasoning:** Instructing the Gemini API to use the "Reason → Act → Observe" pattern to formulate the exact technical steps needed.
7.  **Answer Generation:** Converting the reasoning output into user-friendly, actionable advice (e.g., commands, registry paths).
8.  **Output Parsing:** Stripping unnecessary conversational fluff and structuring the response into raw JSON.
9.  **JSON Response:** The final delivery payload sent to the Next.js client for markdown rendering.

## 3. Component Responsibilities

*   **Client UI (Next.js):** Captures user input, maintains session state (chat history) in memory/sessionStorage, and renders the JSON response as Markdown/Code Blocks.
*   **API Route Handler:** Acts as the stateless controller. Receives the query, triggers the workflow, and returns the response.
*   **Guardrail Module:** A regex and keyword-based pre-processor that acts as a gatekeeper.
*   **JSON Knowledge Base:** A local `knowledge.json` file containing mapped error codes, Windows sub-system context, and specific constraints.
*   **Gemini API Integration:** Handles the LLM execution for intent detection, prompt chaining, ReAct reasoning, and answer generation.
*   **Output Parser:** A post-processor that enforces the final JSON structure and validates the presence of required fields.

## 4. Sequence Flow

1.  `Client` -> sends `POST /api/chat` with `{ "query": "..." }` and `{ "history": [...] }`.
2.  `API Route` -> passes query to `Guardrail Module`.
3.  `Guardrail Module` -> returns `isValid: true/false`. If false, abort with Domain Error.
4.  `API Route` -> triggers `Intent Detection` via Gemini API.
5.  `API Route` -> reads relevant data from `JSON Knowledge Base` based on intent.
6.  `Prompt Chainer` -> constructs the full prompt.
7.  `API Route` -> sends constructed prompt to `Gemini API` for `ReAct Reasoning` & `Answer Generation`.
8.  `Gemini API` -> returns unstructured string.
9.  `Output Parser` -> extracts data and maps to the defined JSON Response Standard.
10. `API Route` -> returns JSON to `Client`.
11. `Client` -> renders Markdown.

## 5. Validation Rules
*   **Max Input Length:** User query must not exceed 1000 characters.
*   **Domain Restriction:** Query must contain keywords mapped to the Windows ecosystem (e.g., cmd, registry, hyper-v, powershell, driver, blue screen).
*   **Prompt Injection Protection:** Inputs containing overrides like "Ignore previous instructions", "System prompt", or "You are now a Linux expert" must be immediately rejected.
*   **Empty Requests:** Blank or purely whitespace queries must be rejected locally.

## 6. Error Handling Rules
*   **Out of Scope (400):** If guardrail validation fails, return: `"I specialize strictly in Windows OS technical assistance. Please ask a question related to Windows."`
*   **LLM Timeout (504):** If the Gemini API takes longer than 15 seconds, return: `"The server timed out while analyzing your Windows query. Please try again."`
*   **Rate Limited (429):** If user exceeds standard limits, return: `"Too many requests. Please wait a moment and try again."`
*   **Parsing Error (500):** If the output parser fails to construct valid JSON from Gemini, fallback to a standard error message: `"An error occurred while formatting the response."`

## 7. JSON Response Standards
All successful API responses sent to the client must strictly adhere to the following JSON structure:

```json
{
  "status": "success",
  "intent_category": "PowerShell / Registry / Networking / etc.",
  "reasoning_summary": "A brief 1-2 sentence explanation of the root cause or required action.",
  "response_markdown": "The fully formatted markdown string containing the explanation, steps, and code blocks.",
  "suggested_followups": [
    "Follow up question 1",
    "Follow up question 2"
  ]
}
```

## 8. Input/Output Definitions

**Input Payload (Client -> API):**
```json
{
  "sessionId": "abc-123",
  "query": "How do I restart the print spooler service via PowerShell?",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

**Error Output Payload (API -> Client):**
```json
{
  "status": "error",
  "error_type": "GUARDRAIL_VIOLATION | TIMEOUT | RATE_LIMIT",
  "message": "Human readable error message to display in UI."
}
```
