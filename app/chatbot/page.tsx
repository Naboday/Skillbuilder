"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Predefined responses for the chatbot
const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! How can I help you with your learning journey today?",
    "Hi there! I'm your Skill Builder assistant. What would you like to learn about?",
    "Welcome to Skill Builder! I'm here to help you master new skills. What are you interested in?",
  ],
  help: [
    "I can help you with finding learning resources, answering questions about our courses, or suggesting learning paths based on your interests.",
    "Need assistance? I can guide you through our platform, recommend courses, or answer questions about specific technologies.",
    "I'm here to support your learning journey. Ask me about courses, technologies, or how to get started with a new skill!",
  ],
  courses: [
    "We offer courses in Web Development, Mobile Development, Data Science, and DevOps. Which area interests you?",
    "Our platform has learning paths for various tech domains including frontend, backend, mobile, data science, and cloud technologies.",
    "Skill Builder provides structured learning paths in multiple domains. You can explore them in the Skills section of our platform.",
  ],
  webdev: [
    "Our Web Development track covers HTML, CSS, JavaScript, React, Node.js, and more. Would you like to start with frontend or backend?",
    "For web development, we recommend starting with HTML and CSS basics, then moving to JavaScript, and finally learning a framework like React.",
    "Web development is divided into frontend (what users see) and backend (server-side logic). Which aspect are you more interested in?",
  ],
  mobile: [
    "Our Mobile Development track covers iOS (Swift), Android (Kotlin), and cross-platform frameworks like React Native and Flutter.",
    "Mobile app development requires understanding platform-specific guidelines. We recommend starting with the basics of UI design for mobile.",
    "For beginners in mobile development, we suggest exploring React Native as it allows you to build apps for both iOS and Android.",
  ],
  data: [
    "Our Data Science curriculum includes Python, data analysis with pandas, visualization with matplotlib, and machine learning with scikit-learn.",
    "Data Science is a broad field. We recommend starting with Python basics, then learning data manipulation, visualization, and finally machine learning.",
    "For aspiring data scientists, we offer courses on statistical analysis, data cleaning, visualization, and building predictive models.",
  ],
  devops: [
    "Our DevOps track covers containerization (Docker), orchestration (Kubernetes), CI/CD pipelines, and cloud platforms like AWS and Azure.",
    "DevOps bridges development and operations. Our courses teach you how to automate deployment, testing, and infrastructure management.",
    "For DevOps learning, we recommend starting with Linux basics, then Docker, followed by CI/CD concepts and cloud services.",
  ],
  progress: [
    "You can track your learning progress in the Progress Report section. It shows your completion rates across different domains.",
    "The Progress dashboard visualizes your learning journey and helps identify areas where you might need to focus more.",
    "Check your Progress Report regularly to see how far you've come and what's next in your learning path.",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase your question?",
    "I don't have information on that topic yet. Would you like to know about our available courses instead?",
    "I'm still learning! Could you try asking about our courses, learning paths, or how to use the platform?",
  ],
}

// Function to get a random response from a category
function getRandomResponse(category: string): string {
  const responses = botResponses[category] || botResponses.fallback
  return responses[Math.floor(Math.random() * responses.length)]
}

// Function to determine which category a message belongs to
function categorizeMessage(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "greeting"
  }
  if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("assist")) {
    return "help"
  }
  if (lowerMessage.includes("course") || lowerMessage.includes("learn") || lowerMessage.includes("study")) {
    return "courses"
  }
  if (
    lowerMessage.includes("web") ||
    lowerMessage.includes("html") ||
    lowerMessage.includes("css") ||
    lowerMessage.includes("javascript") ||
    lowerMessage.includes("react")
  ) {
    return "webdev"
  }
  if (
    lowerMessage.includes("mobile") ||
    lowerMessage.includes("app") ||
    lowerMessage.includes("android") ||
    lowerMessage.includes("ios") ||
    lowerMessage.includes("flutter")
  ) {
    return "mobile"
  }
  if (
    lowerMessage.includes("data") ||
    lowerMessage.includes("python") ||
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("analytics")
  ) {
    return "data"
  }
  if (
    lowerMessage.includes("devops") ||
    lowerMessage.includes("docker") ||
    lowerMessage.includes("kubernetes") ||
    lowerMessage.includes("cloud")
  ) {
    return "devops"
  }
  if (lowerMessage.includes("progress") || lowerMessage.includes("track") || lowerMessage.includes("report")) {
    return "progress"
  }

  return "fallback"
}

export default function ChatbotPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    // Add initial greeting message
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "Hello! I'm your Skill Builder AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [user, isLoading, router, messages.length])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot typing
    setIsTyping(true)

    // Determine response category and get response
    const category = categorizeMessage(inputValue)
    const botResponse = getRandomResponse(category)

    // Add bot response after a delay
    setTimeout(
      () => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: botResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>AI Learning Assistant</CardTitle>
              <CardDescription>
                Ask questions about courses, get learning recommendations, or find resources
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="h-[calc(100vh-24rem)] overflow-y-auto pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[80%] ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src={user.avatar_url || undefined} alt={user.username} />
                        <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex mb-4 justify-start">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="px-4 py-2 rounded-lg bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
