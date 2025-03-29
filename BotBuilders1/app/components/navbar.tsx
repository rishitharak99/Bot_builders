"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "../context/auth-context"
import { Button } from "@/components/ui/button"
import { Home, PlusCircle, ShoppingCart, User, Package, BarChart, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/medications", label: "Medications", icon: PlusCircle },
    { href: "/marketplace", label: "Shop", icon: ShoppingCart },
    { href: "/orders", label: "Orders", icon: Package },
    { href: "/reports", label: "Reports", icon: BarChart },
    { href: "/profile", label: "Profile", icon: User },
  ]

  if (!user) return null

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive(item.href) ? "text-primary" : "text-gray-500"
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-full">
                <Menu size={20} />
                <span className="text-xs mt-1">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[40vh]">
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.slice(5).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="flex items-center justify-start space-x-2 p-2"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col h-screen w-64 bg-white border-r fixed">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">MedTrack</h1>
          <p className="text-sm text-gray-500">Medication Tracker</p>
        </div>
        <div className="flex flex-col flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 p-2 rounded-md ${
                isActive(item.href) ? "bg-primary text-white" : "hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="p-4 border-t">
          <Button variant="ghost" className="flex items-center justify-start w-full space-x-2" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  )
}

