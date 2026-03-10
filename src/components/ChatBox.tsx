"use client";

import { useChat, type Message } from "ai/react";
import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[400px] transition-all duration-300">
                    {/* Header */}
                    <div className="bg-white/10 p-4 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-white font-mono font-bold">Ask about Amogh</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/50 hover:text-white transition-colors p-1"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <p className="text-white/50 text-sm font-mono text-center mt-4">
                                Hi! I&apos;m an AI assistant. Ask me anything about Amogh&apos;s work or
                                experience!
                            </p>
                        )}

                        {messages.map((m: Message) => (
                            <div
                                key={m.id}
                                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"
                                    }`}
                            >
                                <span
                                    className={`text-xs font-mono mb-1 ${m.role === "user" ? "text-blue-400" : "text-green-400"
                                        }`}
                                >
                                    {m.role === "user" ? "You" : "AI"}
                                </span>
                                <div
                                    className={`max-w-[85%] rounded-lg p-3 text-sm font-mono ${m.role === "user"
                                        ? "bg-blue-600/30 text-white border border-blue-500/30"
                                        : "bg-white/10 text-white border border-white/5"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-white/50 text-sm font-mono animate-pulse">
                                Thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-3 border-t border-white/10 bg-black/50"
                    >
                        <div className="flex gap-2 relative">
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type a question..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-white/30"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="bg-white/20 hover:bg-white/30 text-white font-mono px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm font-bold"
                            >
                                ↑
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
                {isOpen ? (
                    <span className="font-mono font-bold">Close Chat</span>
                ) : (
                    <span className="font-mono font-bold group-hover:scale-105 transition-transform flex items-center gap-2">
                        Ask AI <span className="text-xl">✨</span>
                    </span>
                )}
            </button>
        </div>
    );
}
