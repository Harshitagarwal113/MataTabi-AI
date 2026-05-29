/**
 * Guardrail Shield
 * Purpose: Protects the AI from prompt injections and malicious queries.
 */

const THREAT_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /system prompt/i,
  /jailbreak/i,
  /bypass/i,
  /DAN/i, // Do Anything Now
  /translate this to/i, // Encoding attacks
  /base64/i
];

export async function runGuardrail(userQuery) {
  if (!userQuery || typeof userQuery !== 'string') {
    return { status: "blocked", reason: "Invalid input type." };
  }

  if (userQuery.length > 1000) {
    return { status: "blocked", reason: "Query length exceeds maximum limit." };
  }

  for (const pattern of THREAT_PATTERNS) {
    if (pattern.test(userQuery)) {
      return { status: "blocked", reason: "Malicious intent or prompt injection detected." };
    }
  }

  return { status: "allowed" };
}
