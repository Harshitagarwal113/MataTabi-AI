"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

const generateId = () => Math.random().toString(36).substring(2, 15);

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load session history on mount
  useEffect(() => {
    const saved = localStorage.getItem('matatabi_sessions');
    if (saved) {
      try {
        const parsedSessions = JSON.parse(saved);
        if (parsedSessions.length > 0) {
          setSessions(parsedSessions);
          setCurrentSessionId(parsedSessions[0].id);
        } else {
          createNewSession();
        }
      } catch(e) {
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  // Save history on change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('matatabi_sessions', JSON.stringify(sessions));
    } else if (sessions.length === 0 && currentSessionId !== null) {
      localStorage.removeItem('matatabi_sessions');
    }
  }, [sessions]);

  const createNewSession = () => {
    const newId = generateId();
    setSessions(prev => [{ id: newId, title: 'New Conversation', messages: [] }, ...prev]);
    setCurrentSessionId(newId);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    // Only create a new one if the current one isn't empty
    const currentSession = sessions.find(s => s.id === currentSessionId);
    if (currentSession && currentSession.messages.length === 0) return;
    createNewSession();
  };

  const handleDeleteChat = () => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== currentSessionId);
      if (updated.length > 0) {
        setCurrentSessionId(updated[0].id);
      } else {
        const newId = generateId();
        setCurrentSessionId(newId);
        return [{ id: newId, title: 'New Conversation', messages: [] }];
      }
      return updated;
    });
  };

  const loadSession = (id) => {
    setCurrentSessionId(id);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSuggest = (text) => {
    setInput(text);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !currentSessionId) return;
    
    const userText = input.trim();
    setInput('');
    setIsLoading(true);

    // Optimistically update UI
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        const title = s.messages.length === 0 ? userText.slice(0, 30) + (userText.length > 30 ? '...' : '') : s.title;
        return { ...s, title, messages: [...s.messages, { role: 'user', text: userText }] };
      }
      return s;
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText, sessionId: currentSessionId })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Server Error');
      }

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, { role: 'assistant', text: data.answer || data.error, meta: data }] };
        }
        return s;
      }));
    } catch (error) {
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, { role: 'assistant', text: `System Error: ${error.message}` }] };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const currentMessages = sessions.find(s => s.id === currentSessionId)?.messages || [];

  return (
    <div className="flex h-screen bg-background text-textMain overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={loadSession}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 flex flex-col relative h-[calc(100vh-65px)]">
          <ChatWindow 
            messages={currentMessages} 
            isLoading={isLoading} 
            onSuggest={handleSuggest}
          />
          
          <div className="shrink-0">
            <ChatInput 
              input={input} 
              setInput={setInput} 
              onSend={handleSend} 
              isLoading={isLoading} 
            />
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
