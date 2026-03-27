"use client";
import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setChat([...chat, { user: message, bot: data.reply }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen p-5">
      <div className="flex-1 overflow-auto">
        {chat.map((c, i) => (
          <div key={i} className="mb-2">
            <p><b>You:</b> {c.user}</p>
            <p><b>AI:</b> {c.bot}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 w-full"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4">Send</button>
      </div>
    </div>
  );
}