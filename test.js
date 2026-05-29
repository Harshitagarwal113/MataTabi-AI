import { processRequest } from './app/main.js';
import fs from 'fs';

// Load environment variables manually for this test script
try {
  const envFile = fs.readFileSync('.env', 'utf-8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)="?(.*?)"?$/);
    if (match) {
      process.env[match[1].trim()] = match[2].replace(/"/g, '').trim();
    }
  });
} catch (e) {
  console.log("No .env file found or error reading it.");
}

async function run() {
  console.log("Starting MataTabi-AI Test...");
  try {
    const sessionId = "test-session-123";
    const userQuery = "How do I flush the DNS cache in Windows?";
    
    console.log(`User Query: "${userQuery}"\n`);
    const response = await processRequest(sessionId, userQuery);
    
    console.log("\n=============================");
    console.log("FINAL RESPONSE FROM MATATABI-AI");
    console.log("=============================\n");
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error("Test failed with error:", err);
  }
}

run();
