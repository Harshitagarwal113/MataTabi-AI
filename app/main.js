import { callGemini } from './gemini.js';
import { runGuardrail } from './guardrail.js';
import { retrieveContext } from './knowledgeLoader.js';
import { validateOutput } from './outputParser.js';
import fs from 'fs/promises';
import path from 'path';

/**
 * Main Application Orchestrator
 * Purpose: Integrates the entire Glass Box Architecture.
 */

// Simple in-memory session mapping
const sessionStore = new Map();

async function loadPrompt(name) {
  return await fs.readFile(path.join(process.cwd(), 'prompts', name), 'utf-8');
}

export async function processRequest(sessionId, userQuery) {
  // 1. Guardrail Shield
  const guardrail = await runGuardrail(userQuery);
  if (guardrail.status === 'blocked') {
    return { error: `Request Blocked: ${guardrail.reason}` };
  }

  // 2. Session Setup
  if (!sessionStore.has(sessionId)) sessionStore.set(sessionId, []);
  const history = sessionStore.get(sessionId);

  // 3. Knowledge Retrieval
  const kbResults = await retrieveContext(userQuery);
  const kbContext = JSON.stringify(kbResults);

  // 4. Load System Prompts
  const sysPrompt = await loadPrompt('system_prompt.txt');
  const chainPromptTemplate = await loadPrompt('react_prompt.txt'); // Merging ReAct into main flow
  
  const finalPrompt = chainPromptTemplate
    .replace('{{USER_REQUEST}}', userQuery)
    .replace('{{KB_CONTEXT}}', kbContext)
    .replace('{{HISTORY}}', JSON.stringify(history.slice(-3)));

  // 5. Reasoning & LLM Execution
  let finalJsonRaw = await callGemini(finalPrompt, sysPrompt);
  
  // 6. Output Parser Validation
  let validation = await validateOutput(finalJsonRaw);
  
  // Retry logic if validation fails
  if (!validation.isValid) {
    console.log("Output validation failed. Retrying...");
    const retryPrompt = `${finalPrompt}\n\nWARNING: Your previous response was invalid. Ensure it strictly matches the JSON Schema. Error: ${validation.error}`;
    finalJsonRaw = await callGemini(retryPrompt, sysPrompt);
    validation = await validateOutput(finalJsonRaw);
  }

  if (!validation.isValid) {
    throw new Error("Failed to generate a valid structured response after retries.");
  }

  // 7. Update Session
  history.push({ role: 'user', content: userQuery });
  history.push({ role: 'assistant', content: validation.parsedData.answer });
  sessionStore.set(sessionId, history);

  // 8. JSON Response
  return validation.parsedData;
}
