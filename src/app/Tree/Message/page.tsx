"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  text: string;
  sender: "user" | "company";
  timestamp: Date;
};

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome! How can I help you today?",
      sender: "company",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (userInput: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const prompt = `Respond to this message in a helpful, friendly manner: ${userInput}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I'm having trouble understanding. Could you please rephrase that?";
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateResponse(newMessage);

      // Add AI response
      const companyMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: "company",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, companyMessage]);
    } catch (error) {
      console.error("Error handling message:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble responding. Please try again later.",
        sender: "company",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>AI Chat Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 rounded-md border p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"
                  }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                    }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage()
            }
          />
          <Button
            onClick={handleSendMessage}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
