import fs from 'fs/promises';
import path from 'path';

/**
 * Knowledge Base Loader & Retriever
 * Purpose: Retrieves relevant facts from the JSON KB.
 */

export async function loadKnowledge() {
  try {
    const kbPath = path.join(process.cwd(), 'docs', 'windows_knowledge.json');
    const data = await fs.readFile(kbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading knowledge base:", error);
    return { categories: [] };
  }
}

export async function retrieveContext(query) {
  const kb = await loadKnowledge();
  const tokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  const results = [];

  for (const category of kb.categories || []) {
    for (const entry of category.entries || []) {
      const textBlock = `${category.name} ${entry.topic} ${entry.content} ${(entry.keywords || []).join(' ')}`.toLowerCase();
      
      const matchScore = tokens.reduce((score, token) => {
        return score + (textBlock.includes(token) ? 1 : 0);
      }, 0);

      if (matchScore > 0) {
        results.push({ ...entry, domain: category.name, score: matchScore });
      }
    }
  }

  // Sort by relevance score
  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}
