# MataTabi-AI Product Requirement Document (PRD)

## 1. Product Vision
MataTabi-AI is an advanced, highly specialized Windows Operating System Technical Assistant. Powered by the Gemini API, it empowers system administrators, IT professionals, and Windows power users with expert-level insights, troubleshooting guidance, and architectural knowledge. The application provides a lightweight, session-based web experience that acts as a definitive technical companion for all Windows environments.

## 2. Problem Statement
IT professionals and Windows enthusiasts frequently encounter complex system issues ranging from BSODs and driver conflicts to Active Directory and Group Policy misconfigurations. Finding accurate, actionable, and context-aware solutions often requires navigating dense documentation or outdated forum threads. There is a lack of a unified, AI-driven conversational tool that specializes strictly in the Windows ecosystem, providing instant, precise, and secure technical guidance without the overhead of heavy software or persistent databases.

## 3. User Personas
*   **System Administrator (SysAdmin Sam):** Manages Windows Server environments, Active Directory, and Group Policy. Needs quick PowerShell scripts, registry insights, and architectural guidance.
*   **Helpdesk Technician (Techie Tina):** Handles day-to-day user issues, networking, DNS/DHCP troubleshooting, and Defender alerts. Requires step-by-step troubleshooting workflows.
*   **Power User / Enthusiast (Pro Pete):** Tweaks OS performance, resolves driver conflicts, and analyzes BSOD minidump error codes. Needs deep-dive insights into the Windows Kernel and Services.

## 4. User Stories
*   As a SysAdmin, I want to ask MataTabi-AI for a PowerShell script to audit Active Directory users, so I can automate routine security checks.
*   As a Helpdesk Technician, I want to input an Event Viewer error code so that I can get an immediate explanation and a step-by-step troubleshooting guide.
*   As a Power User, I want to know the exact registry keys to optimize Windows performance safely.
*   As a user, I want the AI to reject non-Windows-related queries so that the chatbot remains highly focused and relevant to my technical needs.
*   As a user, I want my chat session to reset when I close the application, ensuring no local data bloat or privacy concerns.

## 5. Functional Requirements
*   **Conversational Interface:** Real-time chat UI with robust markdown support for rendering code blocks (PowerShell, CMD, JSON).
*   **Domain Specialization:** The chatbot must exclusively handle queries related to: Windows Architecture, Kernel, Registry, Active Directory, Group Policy, Networking (DNS, DHCP), Windows Security, Defender, BitLocker, Event Viewer, Services, Windows Server, Troubleshooting, Driver Issues, BSOD Errors, and Performance Optimization.
*   **Guardrail Shield:** A pre-processing layer to filter and block out-of-scope requests (e.g., Mac/Linux queries, general knowledge, non-technical queries).
*   **Prompt Chaining & ReAct Loop:** Break down complex Windows troubleshooting queries into reasoning steps (ReAct) using prompt chaining to formulate accurate responses.
*   **Output Parser:** Format the Gemini API outputs consistently, ensuring actionable steps and clean JSON or Markdown delivery.
*   **Knowledge Base Retrieval:** Utilize a lightweight JSON-based knowledge base for static facts, common error codes, and predefined system prompts.
*   **Session Management:** Maintain conversation history strictly within the active browser session.

## 6. Non-Functional Requirements
*   **Performance:** The web app must load in under 2 seconds. API responses should stream and render quickly to ensure a responsive feel.
*   **Scalability:** Must handle multiple concurrent users efficiently via Vercel deployments.
*   **Usability:** Clean, minimalist UI optimized for the readability of technical content, terminal commands, and code snippets.
*   **Reliability:** Graceful error handling for API timeouts, rate limits, or network failures.

## 7. Security Requirements
*   **Stateless Architecture:** No permanent database storage of user queries, conversational history, or personal data.
*   **API Key Protection:** Gemini API keys must be securely stored in Vercel environment variables and strictly accessed via server-side API routes; they must never be exposed to the client bundle.
*   **Input Sanitization & Injection Prevention:** The Guardrail Shield must sanitize inputs to prevent prompt injection attacks or attempts to bypass domain restrictions.
*   **Client-Side Execution Isolation:** The app must not execute any generated PowerShell or CMD scripts directly on the client machine; it only provides text output.

## 8. Technical Constraints
*   **Language:** JavaScript only (No TypeScript).
*   **Framework:** Next.js.
*   **LLM Provider:** Gemini API.
*   **Deployment:** Vercel.
*   **Database:** No Database allowed.
*   **Knowledge Base:** JSON format only.
*   **State Management:** Session-based Chat History only.

## 9. Success Metrics
*   **Domain Accuracy:** High user rating on the technical accuracy and relevance of Windows-specific solutions.
*   **Guardrail Effectiveness:** 99% success rate in correctly identifying and blocking non-Windows queries.
*   **Latency:** Average API response and reasoning layer execution time under 3 seconds.
*   **Engagement:** Increase in average session length and the number of technical resolutions successfully provided per session.

## 10. Complete Architecture Pipeline
1.  **PRD** (Product Requirement Document) establishes the vision.
2.  **FRD** (Functional Requirement Document) defines the features.
3.  **Guardrail Shield:** Validates the user input against Windows-specific domains.
4.  **Prompt Chaining:** Constructs context-aware sequences for the LLM.
5.  **ReAct Loop:** Analyzes the problem, forms an action plan, and observes simulated outcomes.
6.  **Reasoning Layer:** Refines the technical steps (e.g., verifying PowerShell syntax).
7.  **Output Parser:** Structures the final result into the desired format.
8.  **JSON Response:** Delivers the finalized payload to the client interface.
