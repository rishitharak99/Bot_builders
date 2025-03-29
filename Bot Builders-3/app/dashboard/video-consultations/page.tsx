import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video } from "lucide-react"

export default function VideoConsultationsPage() {
  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Sarah Smith",
      specialty: "Primary Care Physician",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Friday, March 31, 2025",
      time: "2:30 PM - 3:00 PM",
      reason: "Follow-up Consultation",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Monday, April 3, 2025",
      time: "10:00 AM - 10:30 AM",
      reason: "Medication Review",
    },
  ]

  const pastConsultations = [
    {
      id: 1,
      doctor: "Dr. Anita Patel",
      specialty: "Endocrinologist",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Monday, March 20, 2025",
      time: "3:00 PM - 3:30 PM",
      reason: "Diabetes Management",
    },
    {
      id: 2,
      doctor: "Dr. James Wilson",
      specialty: "Neurologist",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Friday, March 10, 2025",
      time: "1:15 PM - 1:45 PM",
      reason: "Headache Assessment",
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Video Consultations</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Video Consultations</h1>
              <p className="text-muted-foreground">Connect with your healthcare providers through video calls</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Schedule New Consultation</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Consultations</CardTitle>
              <CardDescription>Your scheduled video consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingConsultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={consultation.avatar} alt={consultation.doctor} />
                        <AvatarFallback>{consultation.doctor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{consultation.doctor}</p>
                        <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{consultation.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{consultation.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Video className="h-3 w-3 mr-1" />
                            <span>{consultation.reason}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm">Join Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Consultations</CardTitle>
              <CardDescription>Your previous video consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastConsultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={consultation.avatar} alt={consultation.doctor} />
                        <AvatarFallback>{consultation.doctor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{consultation.doctor}</p>
                        <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                        <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{consultation.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{consultation.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Video className="h-3 w-3 mr-1" />
                            <span>{consultation.reason}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Summary
                      </Button>
                      <Button size="sm" variant="outline">
                        Book Follow-up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Video Consultations Work</CardTitle>
              <CardDescription>Learn how to prepare for your video consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Before Your Consultation</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Test your camera and microphone</li>
                    <li>Ensure you have a stable internet connection</li>
                    <li>Find a quiet, well-lit space</li>
                    <li>Have your health information ready</li>
                    <li>Prepare a list of questions for your doctor</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">During Your Consultation</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Join the call 5 minutes before the scheduled time</li>
                    <li>Speak clearly and face the camera</li>
                    <li>Take notes of important information</li>
                    <li>Ask questions if you don't understand something</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">After Your Consultation</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Review your consultation summary</li>
                    <li>Follow the prescribed treatment plan</li>
                    <li>Schedule follow-up appointments if needed</li>
                    <li>Contact your doctor if you have additional questions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

