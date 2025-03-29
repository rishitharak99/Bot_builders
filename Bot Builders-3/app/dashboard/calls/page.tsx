import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Search } from "lucide-react"

export default function CallsPage() {
  const recentCalls = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      role: "Primary Care Physician",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "outgoing",
      date: "Today",
      time: "10:15 AM",
      duration: "15 minutes",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "incoming",
      date: "Yesterday",
      time: "2:30 PM",
      duration: "10 minutes",
    },
    {
      id: 3,
      name: "Nurse Johnson",
      role: "Registered Nurse",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "outgoing",
      date: "Yesterday",
      time: "11:45 AM",
      duration: "5 minutes",
    },
    {
      id: 4,
      name: "Dr. Anita Patel",
      role: "Endocrinologist",
      avatar: "/placeholder.svg?height=40&width=40",
      type: "incoming",
      date: "Monday",
      time: "3:00 PM",
      duration: "20 minutes",
    },
  ]

  const contacts = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      role: "Primary Care Physician",
      avatar: "/placeholder.svg?height=40&width=40",
      available: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "/placeholder.svg?height=40&width=40",
      available: false,
    },
    {
      id: 3,
      name: "Nurse Johnson",
      role: "Registered Nurse",
      avatar: "/placeholder.svg?height=40&width=40",
      available: true,
    },
    {
      id: 4,
      name: "Dr. Anita Patel",
      role: "Endocrinologist",
      avatar: "/placeholder.svg?height=40&width=40",
      available: false,
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      role: "Neurologist",
      avatar: "/placeholder.svg?height=40&width=40",
      available: true,
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Calls</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Voice Calls</h1>
              <p className="text-muted-foreground">Make and receive calls with your healthcare providers</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-9 w-full sm:w-[300px]" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
                <CardDescription>Your call history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={call.avatar} alt={call.name} />
                        <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{call.name}</p>
                          {call.type === "incoming" ? (
                            <PhoneIncoming className="h-3 w-3 text-green-500" />
                          ) : (
                            <PhoneOutgoing className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{call.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {call.date} at {call.time} • {call.duration}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
                <CardDescription>Your healthcare providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.available && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {contact.available ? "Available now" : "Unavailable"}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant={contact.available ? "default" : "outline"}>
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Calls</CardTitle>
              <CardDescription>Your upcoming scheduled calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Sarah Smith" />
                      <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Sarah Smith</p>
                      <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                      <p className="text-xs text-muted-foreground">
                        Friday, March 31, 2025 • 2:30 PM • Follow-up Consultation
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm">Join Call</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Michael Chen" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Cardiologist</p>
                      <p className="text-xs text-muted-foreground">
                        Monday, April 3, 2025 • 10:00 AM • Medication Review
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm">Join Call</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

