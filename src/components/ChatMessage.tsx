import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { CodeBlock } from './CodeBlock';

interface ChatMessageProps {
  message: Message;
  userAvatar: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, userAvatar }) => {
  const isUser = message.role === 'user';
  const avatarSrc = isUser 
    ? (userAvatar || 'https://via.placeholder.com/40') 
    : 'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=64&h=64&fit=crop';

  const processMessageContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
        });
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'plaintext',
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex),
      });
    }

    return parts;
  };

  const messageParts = processMessageContent(message.content);

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <img
        src={avatarSrc}
        alt={`${isUser ? 'User' : 'Jarvis'} avatar`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div
        className={`max-w-[70%] rounded-2xl px-6 py-4 ${
          isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {messageParts.map((part, index) => (
          <div key={index}>
            {part.type === 'code' ? (
              <CodeBlock code={part.content} language={part.language} />
            ) : (
              <ReactMarkdown className="text-sm prose prose-sm max-w-none">
                {part.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};