"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Mock user for the app
const DEMO_USER = {
  uid: "demo-user-123",
  email: "demo@example.com",
  displayName: "Demo User",
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: "",
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => "demo-token",
  getIdTokenResult: async () => ({
    token: "demo-token",
    claims: {},
    expirationTime: "",
    authTime: "",
    issuedAtTime: "",
    signInProvider: null,
    signInSecondFactor: null,
  }),
  reload: async () => {},
  toJSON: () => ({}),
  phoneNumber: null,
  photoURL: null,
  providerId: "password",
}

type User = typeof DEMO_USER

type AuthContextType = {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate authentication loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate signup delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const customUser = { ...DEMO_USER, displayName: name, email }
    setUser(customUser)
    return customUser
  }

  const signIn = async (email: string, password: string) => {
    // Simulate signin delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser(DEMO_USER)
  }

  const logout = async () => {
    // Simulate logout delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, isDemo: true }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

