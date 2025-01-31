import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Onboarding } from './components/Onboarding';
import { Message, UserSettings } from './types';
import { sendMessage } from './services/akashApi';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response || 'Sorry, I encountered an error processing your request.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userSettings) {
    return <Onboarding onComplete={setUserSettings} />;
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col bg-white">
        <header className="px-6 py-4 bg-green-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=64&h=64&fit=crop"
              alt="DomiWiz"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="font-semibold">DomiWiz</h1>
              <p className="text-xs opacity-75">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={userSettings.avatar || 'https://via.placeholder.com/40'}
              alt={userSettings.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{userSettings.name}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              userAvatar={userSettings.avatar}
            />
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center text-gray-500">
              <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;