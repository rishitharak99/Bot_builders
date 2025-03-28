import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bell, Globe, Lock, Moon, User } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <header className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Information</p>
                <p className="text-sm text-muted-foreground">Update your personal details</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings/profile">Edit</Link>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Healthcare Providers</p>
                <p className="text-sm text-muted-foreground">Manage your doctors and caregivers</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings/providers">Edit</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Medication Reminders</p>
                <p className="text-sm text-muted-foreground">Notifications for scheduled medications</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Refill Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when medications are running low</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive text message reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Language & Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch id="dark-mode" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-size">Text Size</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="text-size">
                  <SelectValue placeholder="Select text size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="x-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-muted-foreground">Share data with healthcare providers</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Biometric Authentication</p>
                <p className="text-sm text-muted-foreground">Use fingerprint or face ID to login</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardContent>
        </Card>

        <div className="pt-4">
          <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

