import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X, Sparkles } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I can chat or generate images. Try 'Create a cyberpunk city'!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.imageUrl) {
        setMessages((prev) => [
          ...prev,
          { text: data.reply, sender: "bot", imageUrl: data.imageUrl },
        ]);
      } else {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Something went wrong.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-purple-700 to-pink-600 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2 text-white font-bold">
              <Sparkles size={20} />
              <span>AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === "user" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none" : "bg-gray-800 border border-gray-700 text-gray-200 rounded-bl-none"}`}>
                  <p>{msg.text}</p>
                  {msg.imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-white/20 shadow-lg">
                        <img src={msg.imageUrl} alt="Generated" className="w-full h-auto object-cover" onLoad={scrollToBottom} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-none border border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-gray-900 border-t border-gray-800">
            <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-full border border-gray-700 focus-within:border-pink-500 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe an image..."
                className="flex-1 bg-transparent text-white px-3 outline-none text-sm"
              />
              <button onClick={handleSend} disabled={isLoading} className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white shadow-lg hover:opacity-90 disabled:opacity-50">
                {isLoading ? <Sparkles size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="group relative w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300">
          <MessageSquare size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;