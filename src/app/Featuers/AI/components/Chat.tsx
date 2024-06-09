// src/components/Chatbot.tsx
import React, { useState, FormEvent } from "react";

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/Ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    console.log(data, "Data");
    // setResponse(data.response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">AI Chatbot</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
        {/* {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold">Response:</h2>
            <p>{response}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Chatbot;
