"use client";

import { useState } from "react";
import { Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "agent" | "user";
  name: string;
  text: string;
  time: string;
}

const messages: Message[] = [
  {
    id: "m1",
    sender: "agent",
    name: "Sarah Al-Mansour",
    text: "Hello Ahmed! Thank you for your interest in the Rimal Gardens Villa. I have reviewed your application and everything looks great.",
    time: "Mar 14, 10:30 AM",
  },
  {
    id: "m2",
    sender: "user",
    name: "Ahmed",
    text: "Thank you Sarah. When can we schedule the contract signing?",
    time: "Mar 14, 11:15 AM",
  },
  {
    id: "m3",
    sender: "agent",
    name: "Sarah Al-Mansour",
    text: "I have availability on March 15th at 11:00 AM. We can meet at our Olaya office in the Boardroom. I will prepare all the necessary documents.",
    time: "Mar 14, 11:45 AM",
  },
  {
    id: "m4",
    sender: "user",
    name: "Ahmed",
    text: "Perfect, that works for me. Should I bring any additional documents?",
    time: "Mar 14, 12:00 PM",
  },
  {
    id: "m5",
    sender: "agent",
    name: "Sarah Al-Mansour",
    text: "Please bring your national ID, proof of income, and the signed NDA we discussed. I will also email you a checklist shortly. Looking forward to seeing you!",
    time: "Mar 14, 12:20 PM",
  },
  {
    id: "m6",
    sender: "agent",
    name: "Sarah Al-Mansour",
    text: "Hi Ahmed, just a quick update — the contract signing went smoothly. Your first installment is due by March 10th. Feel free to reach out if you have any questions about the payment schedule.",
    time: "Mar 16, 9:00 AM",
  },
];

export default function PortalMessagesPage() {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Messages</h1>
        <p className="text-sm text-gray-light mt-1">
          Chat with your assigned agent
        </p>
      </div>

      <div className="bg-black-deep border border-black-border rounded-sm flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
        {/* Agent header */}
        <div className="px-5 py-4 border-b border-black-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <span className="text-gold text-xs font-medium">SA</span>
          </div>
          <div>
            <p className="text-sm text-white">Sarah Al-Mansour</p>
            <p className="text-xs text-success">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                  msg.sender === "agent"
                    ? "bg-gold/20 border border-gold/30"
                    : "bg-blue-500/20 border border-blue-500/30"
                )}
              >
                {msg.sender === "agent" ? (
                  <span className="text-gold text-[10px] font-medium">SA</span>
                ) : (
                  <User className="w-3 h-3 text-blue-400" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  "rounded-sm p-3",
                  msg.sender === "agent"
                    ? "bg-black-surface border border-black-border"
                    : "bg-gold/10 border border-gold/20"
                )}
              >
                <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                <p className="text-[10px] text-gray-mid mt-1.5">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-black-border">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input-luxury flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                  setNewMessage("");
                }
              }}
            />
            <button
              className="btn-gold px-4"
              onClick={() => {
                if (newMessage.trim()) {
                  setNewMessage("");
                }
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
