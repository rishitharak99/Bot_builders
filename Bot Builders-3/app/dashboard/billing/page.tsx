import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, FileText } from "lucide-react"

export default function BillingPage() {
  const invoices = [
    {
      id: "INV-001",
      date: "Mar 15, 2025",
      description: "Primary Care Visit",
      amount: "$150.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "Mar 01, 2025",
      description: "Prescription Refill",
      amount: "$45.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "Feb 15, 2025",
      description: "Laboratory Tests",
      amount: "$210.00",
      status: "Pending",
    },
    {
      id: "INV-004",
      date: "Feb 01, 2025",
      description: "Specialist Consultation",
      amount: "$250.00",
      status: "Paid",
    },
    {
      id: "INV-005",
      date: "Jan 15, 2025",
      description: "Physical Therapy",
      amount: "$180.00",
      status: "Overdue",
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ending in 4242",
      expiry: "04/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Credit Card",
      name: "Mastercard ending in 5555",
      expiry: "08/27",
      isDefault: false,
    },
  ]

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger />
        <div className="font-semibold">Billing</div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Billing & Payments</h1>
              <p className="text-muted-foreground">Manage your billing information and payment methods</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <CreditCard className="mr-2 h-4 w-4" /> Make a Payment
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Current Balance</CardTitle>
                <CardDescription>Your outstanding balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$180.00</div>
                <p className="text-sm text-muted-foreground mt-1">Due by April 15, 2025</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Pay Now</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Insurance</CardTitle>
                <CardDescription>Your insurance information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Provider</p>
                    <p className="text-sm">Blue Cross Blue Shield</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Policy Number</p>
                    <p className="text-sm">BCBS-12345678</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Group Number</p>
                    <p className="text-sm">GRP-987654</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Insurance
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                        {method.isDefault && (
                          <span className="inline-block mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Default
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
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
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

