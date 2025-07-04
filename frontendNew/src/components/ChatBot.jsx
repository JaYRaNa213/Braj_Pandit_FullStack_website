import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ChatBot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: t("chat.welcome") },
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: t("chat.bot_response"),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput("");
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-7 right-5 z-50">
      {open ? (
        <div className="w-80 h-96 bg-white dark:bg-gray-800 shadow-xl rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <span>{t("chat.title")}</span>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-100 dark:bg-gray-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    msg.from === "user"
                      ? "bg-red-500 text-white"
                      : "bg-white dark:bg-gray-600 border text-gray-700 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-600 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="flex-1 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white dark:border-gray-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              {t("chat.send")}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
        >
          <FaComments size={22} />
        </button>
      )}
    </div>
  );
}
