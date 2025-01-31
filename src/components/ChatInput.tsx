import React, { useState } from 'react';
import { Send, Smile, Plus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Plus size={20} />
        </button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-sm px-4 py-2">
        <textarea 
        name="tbox" 
        //cols="24" 
        rows='5'
        wrap="soft"
            //type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste article, project or write-up..."
            className="flex-1 bg-transparent outline-none"
          ></textarea>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Smile size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`p-2 rounded-full ${
            message.trim()
              ? 'text-indigo-600 hover:text-indigo-700'
              : 'text-gray-400'
          } transition-colors`}
          disabled={!message.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};