import fs from 'fs/promises';
import path from 'path';

/**
 * ReAct Agent Pipeline for MataTabi-AI
 * Architecture: Thought -> Action -> Observation -> Reflection -> Answer
 */

// Simulated Gemini API Call
// In a production environment, this integrates with the @google/genai SDK
async function callGemini(promptContent) {
  console.log(`[Gemini ReAct API] Executing ReAct loop prompt...`);
  
  // Mock response for architectural demonstration.
  // This simulates the LLM deciding it has enough information to answer.
  return JSON.stringify({
    thought: "I have gathered enough information from previous steps to provide a comprehensive solution.",
    action: { tool: "None", input: "" },
    observation: "",
    reflection: "The user needs to reset their network adapter to resolve the DNS issue. I will provide a secure PowerShell command.",
    answer: "To resolve your networking issue, you need to flush your DNS and reset the adapter. Please open PowerShell as Administrator and run:\n\n```powershell\nClear-DnsClientCache\nRestart-NetAdapter -Name 'Wi-Fi' -Confirm:$false\n```\n\n**Security Recommendation:** Ensure you are running this from a trusted network profile."
  });
}

// Implementations of Available Tools
const tools = {
  KB_Search: async (query) => {
    return `[KB Result] Found documentation for ${query}: Microsoft recommends checking Event Viewer ID 4199.`;
  },
  PowerShell_Simulate: async (command) => {
    return `[PS Simulation] Command '${command}' executed successfully. Output: True. No syntax errors detected.`;
  },
  Net_Diagnostic: async (target) => {
    return `[Net Diag] Diagnostic for ${target}: Latency 20ms, 0% packet loss. DNS resolution failed for primary server.`;
  },
  Security_Audit: async (component) => {
    return `[Security Audit] Recommendation for ${component}: Ensure Windows Defender Firewall is enabled and Execution Policy is set to RemoteSigned.`;
  }
};

/**
 * Utility to load the ReAct prompt template from the filesystem.
 */
async function loadPrompt(filename) {
  try {
    const filepath = path.join(process.cwd(), 'prompts', filename);
    return await fs.readFile(filepath, 'utf-8');
  } catch (error) {
    console.error(`Failed to load prompt: ${filename}`, error);
    throw new Error(`Missing required prompt template: ${filename}`);
  }
}

/**
 * Executes the ReAct Agent loop.
 * @param {string} userQuery - The user's input query.
 * @param {number} maxIterations - Maximum ReAct cycles to prevent infinite loops.
 * @returns {Promise<Object>} The final result or error.
 */
export async function runReActAgent(userQuery, maxIterations = 5) {
  try {
    const basePromptTemplate = await loadPrompt('react_prompt.txt');
    let history = [];
    let iteration = 0;
    
    console.log(`\n[ReAct Agent] Starting pipeline for task: "${userQuery}"`);

    while (iteration < maxIterations) {
      iteration++;
      console.log(`\n[ReAct Agent] --- Iteration ${iteration} ---`);
      
      const prompt = basePromptTemplate
        .replace('{{USER_REQUEST}}', userQuery)
        .replace('{{HISTORY}}', JSON.stringify(history, null, 2));

      // 1. Ask LLM to Think and decide Action
      const rawResponse = await callGemini(prompt);
      let parsedResponse;
      try {
        // Strip potential markdown JSON wrapping
        const cleaned = rawResponse.replace(/^```json/m, '').replace(/```$/m, '').trim();
        parsedResponse = JSON.parse(cleaned);
      } catch (e) {
        throw new Error("Failed to parse ReAct LLM response as JSON");
      }

      console.log(`[Thought] ${parsedResponse.thought}`);
      
      // 2. Check if Answer is ready
      if (parsedResponse.action.tool === 'None' || parsedResponse.answer) {
        console.log(`[Reflection] ${parsedResponse.reflection}`);
        console.log(`[ReAct Agent] Pipeline finished successfully.`);
        return {
          success: true,
          answer: parsedResponse.answer,
          iterations: iteration,
          chainOfThought: history // Hidden chain of thought returned as metadata
        };
      }

      // 3. Execute Action
      const toolName = parsedResponse.action.tool;
      const toolInput = parsedResponse.action.input;
      console.log(`[Action] Executing tool '${toolName}' with input: "${toolInput}"`);
      
      let observation = "";
      if (tools[toolName]) {
        observation = await tools[toolName](toolInput);
      } else {
        observation = `Error: Tool '${toolName}' not recognized.`;
      }
      console.log(`[Observation] ${observation}`);

      // 4. Update History for Reflection in next cycle
      history.push({
        iteration,
        thought: parsedResponse.thought,
        action: parsedResponse.action,
        observation: observation
      });
    }

    console.log(`[ReAct Agent] Max iterations reached.`);
    return {
      success: false,
      error: "Max iterations reached without formulating a final answer.",
      chainOfThought: history
    };

  } catch (error) {
    console.error("ReAct Agent Execution Failed:", error);
    return { success: false, error: error.message };
  }
}
