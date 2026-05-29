import { NextResponse } from 'next/server';
import { processRequest } from '../../main.js';

// Basic In-Memory Rate Limiter Map: IP -> { count, startTime }
// Note: In serverless deployments with multiple instances (like Vercel edge), 
// this map won't be shared across instances. Use Redis for production.
const rateLimitMap = new Map();
const RATE_LIMIT_MAX_REQUESTS = 15; // Max 15 messages per minute per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request) {
  try {
    // 1. Origin Verification (Security)
    const origin = request.headers.get('origin') || request.headers.get('referer');
    const host = request.headers.get('host');
    
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          console.warn(`Blocked request from invalid origin: ${origin}`);
          return NextResponse.json({ error: "Forbidden: Invalid Origin" }, { status: 403 });
        }
      } catch(e) {
        // Invalid URL format
      }
    }

    // 2. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown-ip';
    const now = Date.now();
    
    if (rateLimitMap.has(ip)) {
      const record = rateLimitMap.get(ip);
      if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
      } else {
        if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
          return NextResponse.json({ error: "Too Many Requests. Please wait a minute." }, { status: 429 });
        }
        record.count += 1;
        rateLimitMap.set(ip, record);
      }
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: now });
    }

    // 3. Process Request
    const { query, sessionId } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const sid = sessionId || 'default-session';
    const responseData = await processRequest(sid, query);
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
