import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Building2 } from "lucide-react"
import { useParams } from "react-router-dom"

export default function PaymentManagement() {
  const { residentId } = useParams()

  const residentInfo = {
    id: "RES123",
    name: "John Anderson",
    unit: "A-203",
    contact: "(555) 123-4567",
    moveInDate: "January 15, 2023",
    avatar: "/avatars/john.jpg"
  }

  const currentPayment = {
    month: "March 2024",
    status: "pending",
    amount: 1500.00,
    dueDate: "March 5, 2024"
  }

  const paymentHistory = [
    {
      month: "February 2024",
      status: "paid",
      amount: 1500.00,
      paymentDate: "Feb 3, 2024",
      method: "Credit Card"
    },
    {
      month: "January 2024",
      status: "late",
      amount: 1500.00,
      paymentDate: "Jan 7, 2024",
      method: "Bank Transfer"
    },
    {
      month: "December 2023",
      status: "paid",
      amount: 1500.00,
      paymentDate: "Dec 4, 2023",
      method: "Credit Card"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <button 
            onClick={() => window.history.back()} 
            className="mr-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Payment Management</h1>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resident Info Card */}
            <div className="bg-white rounded-lg p-4 space-y-4 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">{residentInfo.name}</h2>
                  <p className="text-sm text-muted-foreground">{residentInfo.unit}</p>
                </div>
                <Avatar className="h-12 w-12">
                  <img src={residentInfo.avatar} alt={residentInfo.name} />
                </Avatar>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p>{residentInfo.contact}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Move-in Date</p>
                  <p>{residentInfo.moveInDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Resident ID</p>
                  <p>{residentInfo.id}</p>
                </div>
              </div>
            </div>

            {/* Current Payment Status */}
            <div className="bg-white rounded-lg p-4 space-y-4 shadow-lg border border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{currentPayment.month}</h3>
                <Badge 
                  variant={currentPayment.status === 'pending' ? 'destructive' : 'default'}
                  className="rounded-full"
                >
                  {currentPayment.status === 'pending' ? 'Pending' : 'Paid'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Amount</span>
                  <span className="font-medium">${currentPayment.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span>{currentPayment.dueDate}</span>
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" variant="default">
                Update Payment Status
              </Button>
            </div>
          </div>

          {/* Right Column - Payment History */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold">Payment History</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="bg-white rounded-lg p-4 space-y-4 shadow-lg border border-gray-100">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{payment.month}</h4>
                    <Badge 
                      variant={
                        payment.status === 'paid' ? 'success' : 
                        payment.status === 'late' ? 'warning' : 'default'
                      }
                      className="rounded-full"
                    >
                      {payment.status === 'paid' ? 'Paid on time' : 'Late payment'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount Paid</span>
                      <span>${payment.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Date</span>
                      <span>{payment.paymentDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="flex items-center gap-2">
                        {payment.method === 'Credit Card' ? 
                          <CreditCard className="h-4 w-4" /> : 
                          <Building2 className="h-4 w-4" />
                        }
                        {payment.method}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}