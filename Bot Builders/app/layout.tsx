import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from "next/dynamic"

const AuthProvider = dynamic(() => import("./firebase/auth").then((mod) => mod.AuthProvider), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedTracker - Medication Adherence App",
  description: "Track your medications, get reminders, and improve your health outcomes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'