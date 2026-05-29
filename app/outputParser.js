import fs from 'fs/promises';
import path from 'path';

/**
 * Output Parser
 * Purpose: Validates the LLM response against the strict JSON Schema.
 */

export async function validateOutput(llmRawResponse) {
  try {
    const cleaned = llmRawResponse.replace(/^```json/mi, '').replace(/```$/m, '').trim();
    const data = JSON.parse(cleaned);

    const schemaPath = path.join(process.cwd(), 'parsers', 'outputSchema.json');
    const schemaRaw = await fs.readFile(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaRaw);

    if (schema.required) {
      for (const field of schema.required) {
        if (data[field] === undefined) {
          throw new Error(`Validation blocked: Missing required field '${field}'.`);
        }
      }
    }

    if (typeof data.confidence_score !== 'number' || data.confidence_score < 0 || data.confidence_score > 1) {
      throw new Error(`Validation blocked: Invalid confidence_score.`);
    }

    return { isValid: true, parsedData: data };
  } catch (error) {
    console.error("Output Parser Error:", error.message);
    return { isValid: false, error: error.message };
  }
}
