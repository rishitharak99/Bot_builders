"use client"

import type React from "react"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Send, User } from "lucide-react"

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! I'm your healthcare assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Clear input
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse = "I'm processing your request. A healthcare professional will follow up if needed."

      if (input.toLowerCase().includes("appointment")) {
        botResponse = "Would you like to schedule an appointment with your doctor? I can help you with that."
      } else if (input.toLowerCase().includes("medication") || input.toLowerCase().includes("medicine")) {
        botResponse = "Do you need information about your medications or would you like to request a refill?"
      } else if (input.toLowerCase().includes("symptom") || input.toLowerCase().includes("pain")) {
        botResponse =
          "I understand you're not feeling well. Can you describe your symptoms in more detail so I can provide better assistance?"
      }

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 1000)
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Healthcare Assistant</div>
      </header>
      <main className="flex-1 p-4 sm:p-6 overflow-hidden flex flex-col">
        <div className="mx-auto w-full max-w-3xl space-y-6 flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Healthcare Chatbot</CardTitle>
              <CardDescription>Ask questions about your health, medications, or appointments</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-blue-100"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

