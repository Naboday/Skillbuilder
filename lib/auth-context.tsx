"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/lib/data"

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (username: string, email: string, password: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: (User & { email: string; password: string })[] = [
  {
    id: "user-1",
    username: "testuser",
    full_name: "Test User",
    avatar_url: null,
    email: "test@example.com",
    password: "password123",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("skillbuilder_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      const { password, email, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("skillbuilder_user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const signUp = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if user already exists
    const userExists = mockUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase(),
    )

    if (userExists) {
      return false
    }

    // Create new user
    const newUser = {
      id: `user-${mockUsers.length + 1}`,
      username,
      full_name: null,
      avatar_url: null,
      email,
      password,
    }

    mockUsers.push(newUser)

    const { password: _, email: __, ...userWithoutSensitiveInfo } = newUser
    setUser(userWithoutSensitiveInfo)
    localStorage.setItem("skillbuilder_user", JSON.stringify(userWithoutSensitiveInfo))

    return true
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("skillbuilder_user")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
