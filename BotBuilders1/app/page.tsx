"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Clock, Calendar, ShoppingCart, Activity, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  const router = useRouter()
  const { user, loading, signIn, signUp, isDemo } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [authError, setAuthError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already logged in
  if (user && !loading) {
    router.push("/dashboard")
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (error: any) {
      setAuthError(error.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    try {
      await signUp(email, password, name)
      router.push("/dashboard")
    } catch (error: any) {
      setAuthError(error.message || "Failed to sign up")
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">MedTrack</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-600">Demo Application</AlertTitle>
          <AlertDescription>
            This is a demo application running with mock data. Any email and password will work for sign in.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Track Your Medications with Ease</h2>
            <p className="text-lg text-gray-600">
              MedTrack helps you stay on top of your medication schedule, order medicines, and track your health
              progress.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Pill className="text-primary h-6 w-6" />
                <div>
                  <h3 className="font-medium">Medication Tracking</h3>
                  <p className="text-sm text-gray-500">Never miss a dose again</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="text-primary h-6 w-6" />
                <div>
                  <h3 className="font-medium">Timely Reminders</h3>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="text-primary h-6 w-6" />
                <div>
                  <h3 className="font-medium">Timely Reminders</h3>
                  <p className="text-sm text-gray-500">Get notified when it's time</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <ShoppingCart className="text-primary h-6 w-6" />
                <div>
                  <h3 className="font-medium">Medicine Marketplace</h3>
                  <p className="text-sm text-gray-500">Order medicines online</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Activity className="text-primary h-6 w-6" />
                <div>
                  <h3 className="font-medium">Health Reports</h3>
                  <p className="text-sm text-gray-500">Track your adherence</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="signin" className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSignIn}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {authError && <p className="text-sm text-destructive">{authError}</p>}
                      <p className="text-sm text-blue-600">Demo mode: Any email and password will work</p>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new account to get started</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSignUp}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">Email</Label>
                        <Input
                          id="email-signup"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-signup">Password</Label>
                        <Input
                          id="password-signup"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {authError && <p className="text-sm text-destructive">{authError}</p>}
                      <p className="text-sm text-blue-600">Demo mode: Any information will create a demo account</p>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Sign Up"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MedTrack. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

