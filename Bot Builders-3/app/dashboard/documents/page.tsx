import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Search, Upload } from "lucide-react"

export default function DocumentsPage() {
  const documents = [
    {
      id: "DOC-001",
      name: "Medical History.pdf",
      type: "Medical Record",
      date: "Mar 15, 2025",
      size: "1.2 MB",
    },
    {
      id: "DOC-002",
      name: "Lab Results - Blood Work.pdf",
      type: "Lab Results",
      date: "Mar 01, 2025",
      size: "850 KB",
    },
    {
      id: "DOC-003",
      name: "Prescription - Lisinopril.pdf",
      type: "Prescription",
      date: "Feb 15, 2025",
      size: "450 KB",
    },
    {
      id: "DOC-004",
      name: "Cardiology Report.pdf",
      type: "Specialist Report",
      date: "Feb 01, 2025",
      size: "1.5 MB",
    },
    {
      id: "DOC-005",
      name: "Insurance Claim Form.pdf",
      type: "Insurance",
      date: "Jan 15, 2025",
      size: "750 KB",
    },
    {
      id: "DOC-006",
      name: "Vaccination Record.pdf",
      type: "Medical Record",
      date: "Jan 01, 2025",
      size: "550 KB",
    },
  ]

  const categories = [
    { name: "Medical Records", count: 12 },
    { name: "Lab Results", count: 8 },
    { name: "Prescriptions", count: 15 },
    { name: "Insurance Documents", count: 5 },
    { name: "Specialist Reports", count: 7 },
  ]

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Documents</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Medical Documents</h1>
              <p className="text-muted-foreground">Access and manage your medical records and documents</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-9 w-full sm:w-[300px]" />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    All Documents <span className="ml-auto">47</span>
                  </Button>
                  {categories.map((category) => (
                    <Button key={category.name} variant="ghost" className="w-full justify-start font-normal">
                      {category.name} <span className="ml-auto">{category.count}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Your recently uploaded and accessed documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span>{document.name}</span>
                          </TableCell>
                          <TableCell>{document.type}</TableCell>
                          <TableCell>{document.date}</TableCell>
                          <TableCell>{document.size}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share Documents</CardTitle>
                  <CardDescription>Share your medical documents with healthcare providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Share with Healthcare Provider</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Securely share your medical documents with your healthcare providers.
                      </p>
                      <div className="flex gap-2">
                        <Input placeholder="Provider's email address" className="flex-1" />
                        <Button>Share</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Request Medical Records</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Request your medical records from healthcare facilities.
                      </p>
                      <Button variant="outline">Request Records</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

