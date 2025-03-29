"use client"

import type React from "react"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState("dr-smith")
  const [messageInput, setMessageInput] = useState("")

  const contacts = [
    {
      id: "dr-smith",
      name: "Dr. Sarah Smith",
      role: "Primary Care Physician",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you feeling today?",
      time: "10:30 AM",
      unread: 1,
      online: true,
    },
    {
      id: "dr-chen",
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Your test results look good.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "nurse-johnson",
      name: "Nurse Johnson",
      role: "Registered Nurse",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Don't forget to take your medication.",
      time: "Yesterday",
      unread: 2,
      online: true,
    },
    {
      id: "dr-patel",
      name: "Dr. Anita Patel",
      role: "Endocrinologist",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Let's discuss your treatment plan.",
      time: "Monday",
      unread: 0,
      online: false,
    },
    {
      id: "pharmacy",
      name: "MedPortal Pharmacy",
      role: "Pharmacy Services",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Your prescription is ready for pickup.",
      time: "Monday",
      unread: 0,
      online: true,
    },
  ]

  const messages = {
    "dr-smith": [
      { sender: "them", content: "Hello! How are you feeling today?", time: "10:30 AM" },
      { sender: "me", content: "I'm feeling much better, thank you.", time: "10:32 AM" },
      {
        sender: "them",
        content: "That's great to hear! Have you been taking your medication as prescribed?",
        time: "10:33 AM",
      },
      { sender: "me", content: "Yes, I've been following the schedule exactly.", time: "10:35 AM" },
      { sender: "them", content: "Excellent. Any side effects to report?", time: "10:36 AM" },
    ],
    "dr-chen": [
      { sender: "them", content: "I've reviewed your latest test results.", time: "Yesterday" },
      { sender: "them", content: "Your blood pressure is looking much better.", time: "Yesterday" },
      { sender: "me", content: "That's good news! The new medication seems to be working.", time: "Yesterday" },
      {
        sender: "them",
        content: "Yes, it appears to be effective. Let's continue with this regimen.",
        time: "Yesterday",
      },
    ],
    "nurse-johnson": [
      { sender: "them", content: "Don't forget to take your medication with food.", time: "Yesterday" },
      { sender: "me", content: "Thanks for the reminder!", time: "Yesterday" },
      { sender: "them", content: "You're welcome. How are you feeling today?", time: "Yesterday" },
      { sender: "me", content: "Much better than last week.", time: "Yesterday" },
      { sender: "them", content: "That's great! Remember to log your symptoms in the app.", time: "Yesterday" },
      { sender: "them", content: "Also, don't forget your appointment next week.", time: "Yesterday" },
    ],
    "dr-patel": [
      { sender: "them", content: "Your latest A1C levels are looking good.", time: "Monday" },
      { sender: "me", content: "That's great to hear!", time: "Monday" },
      { sender: "them", content: "Let's discuss your treatment plan at your next appointment.", time: "Monday" },
      { sender: "me", content: "Looking forward to it.", time: "Monday" },
    ],
    pharmacy: [
      { sender: "them", content: "Your prescription for Lisinopril has been refilled.", time: "Monday" },
      { sender: "them", content: "It's ready for pickup at your local pharmacy.", time: "Monday" },
      { sender: "me", content: "Thank you! I'll pick it up tomorrow.", time: "Monday" },
      { sender: "them", content: "You're welcome. Let us know if you need anything else.", time: "Monday" },
    ],
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // In a real app, you would send this message to your backend
    setMessageInput("")
  }

  const activeContact = contacts.find((contact) => contact.id === activeChat)

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Messages</div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="grid h-full md:grid-cols-[280px_1fr]">
          {/* Contacts sidebar */}
          <div className="border-r">
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer ${
                      activeChat === contact.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setActiveChat(contact.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col h-full">
            {activeContact && (
              <>
                <div className="flex items-center gap-3 border-b p-4">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                    <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{activeContact.name}</p>
                    <p className="text-sm text-muted-foreground">{activeContact.role}</p>
                  </div>
                  <div className="ml-auto">
                    {activeContact.online ? (
                      <span className="text-xs text-green-500 flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                        Online
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Offline</span>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages[activeChat as keyof typeof messages].map((message, index) => (
                    <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

