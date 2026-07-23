import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { chatWithAI } from "@/lib/chat.functions";
import { supabase } from "@/integrations/supabase/client";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm VillageFinder AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;

      if (!token) {
        throw new Error("User is not logged in.");
      }

      const response = await chatWithAI({
        data: {
          message: userMessage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Sorry! Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:scale-110 transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-bold">🤖 VillageFinder AI</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] break-words rounded-xl p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t p-3">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  sendMessage();
                }
              }}
              className="flex-1 rounded-lg border px-3 py-2 outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-lg bg-primary px-4 text-white disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}