# MataTabi-AI ReAct Workflow

The ReAct (Reason + Act) pipeline orchestrates advanced Windows troubleshooting by combining internal reasoning with simulated tool executions to arrive at highly accurate, verified solutions.

## 1. Workflow Architecture

The Agent iterates through the following sequence until a definitive solution is found:

1.  **Thought**: The LLM analyzes the user's request and the current history to determine the next logical step. This forms a **Hidden Chain of Thought**; the user does not see this internal monologue, allowing the AI to process complex Windows diagnostics securely without overwhelming the user interface.
2.  **Action**: The LLM selects a specific tool to execute from its arsenal (e.g., `PowerShell_Simulate`, `Net_Diagnostic`, `KB_Search`, `Security_Audit`) along with specific inputs.
3.  **Observation**: The `reactAgent.js` orchestrator executes the requested tool (or simulates its execution) and returns the result string back to the LLM's context.
4.  **Reflection**: In the next iteration, the LLM evaluates the Observation against its original Thought to determine if the action was successful and if it moves closer to the goal.
5.  **Answer**: Once sufficient data is gathered, verified, and reflected upon, the LLM sets the action tool to `None` and outputs a final, structured `answer` to the user.

## 2. Core Capabilities

*   **Windows Troubleshooting Support**: The agent is heavily biased towards deep registry, Active Directory, and OS-level fixes rather than surface-level UI suggestions.
*   **PowerShell Command Generation**: Utilizes the `PowerShell_Simulate` tool to iteratively refine and test PS scripts before providing them to the user, ensuring syntactic correctness.
*   **Networking Diagnostics**: Uses the `Net_Diagnostic` tool to troubleshoot connectivity, DNS routing, and proxy issues inherently common in enterprise Windows environments.
*   **Security Recommendations**: Integrates the `Security_Audit` tool to ensure any proposed configuration changes (like opening firewall ports or altering execution policies) are accompanied by strict security best practices.
