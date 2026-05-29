/**
 * Gemini API Client
 * Purpose: Connects to Google's Gemini API with retries and error handling.
 */

export async function callGemini(prompt, systemInstruction = null, retries = 3) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  const modelName = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json"
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = { role: "system", parts: [{ text: systemInstruction }] };
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error ${response.status}: ${errText}`);
      }

      const data = await response.json();
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("Gemini API returned no candidates. This may be due to safety filters.");
      }
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error(`Gemini call failed (Attempt ${attempt}/${retries}):`, error.message);
      if (attempt === retries) {
        throw new Error("Max retries reached for Gemini API.");
      }
      // Exponential backoff
      await new Promise(res => setTimeout(res, 1000 * attempt));
    }
  }
}
