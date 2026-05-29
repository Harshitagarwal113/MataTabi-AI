import { NextResponse } from 'next/server';
import { processRequest } from '../../main.js';

export async function POST(request) {
  try {
    const { query, sessionId } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const sid = sessionId || 'default-session';
    
    // Call the core AI orchestrator
    const responseData = await processRequest(sid, query);
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
