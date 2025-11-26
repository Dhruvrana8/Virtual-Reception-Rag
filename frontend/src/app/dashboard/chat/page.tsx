"use client";

import { useState, useRef } from "react";
import { Send, Paperclip, FileText, X } from "lucide-react";
import clsx from "clsx";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  name: string;
  size: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I am your Virtual Receptionist. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !uploadedFile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setUploadedFile(null);

    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Thank you for your message. I am processing your request.",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="h-16 border-b border-gray-100 flex items-center px-6 justify-between">
        <h2 className="text-lg font-semibold text-gray-900">General Chat</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-500">Online</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              "flex w-full",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={clsx(
                "max-w-[70%] rounded-2xl px-5 py-3 shadow-sm",
                msg.role === "user"
                  ? "bg-lavender text-gray-900 rounded-br-none"
                  : "bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-none"
              )}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <span className="text-[10px] opacity-50 mt-1 block">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          {uploadedFile && (
            <div className="mb-3 flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100 w-fit">
              <div className="w-8 h-8 bg-lavender/30 rounded flex items-center justify-center text-lavender-dark">
                <FileText className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="font-medium text-gray-700">{uploadedFile.name}</p>
                <p className="text-gray-400">{uploadedFile.size}</p>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <form
            onSubmit={handleSend}
            className="relative flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-lavender-dark hover:bg-lavender/10 rounded-xl transition-all"
              title="Upload Document"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-lavender/30 focus:bg-white transition-all outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() && !uploadedFile}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-lavender hover:bg-lavender-dark text-gray-900 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
