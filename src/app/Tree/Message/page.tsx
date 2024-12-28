"use client";

import { useState } from "react";
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

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome! How can we help you today?",
      sender: "company",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      // Simulate company response after 1 second
      setTimeout(() => {
        const companyMessage: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. We'll get back to you soon.",
          sender: "company",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, companyMessage]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900">
      <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-100 dark:bg-blue-900 ml-auto"
                    : "bg-gray-100 dark:bg-gray-700"
                } max-w-[80%] ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <p className="dark:text-gray-100">{message.text}</p>
                <small className="text-gray-500 dark:text-gray-400">
                  {message.timestamp.toLocaleTimeString()}
                </small>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Textarea
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          />
          <Button onClick={handleSendMessage} className="w-full">
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
