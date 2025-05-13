import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Home, Wallet2, Users2, ArrowLeft } from "lucide-react"
import { hostelApi } from "@/api/hostelApi"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export default function HostelDashboard() {
  const [hostels, setHostels] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const result = await hostelApi.getAllHostels(user.id)
        setHostels(result)
      } catch (error) {
        console.error('Error fetching hostels:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHostels()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:static">
        <div className="flex h-14 items-center px-4 md:px-6">
          <button 
            onClick={() => window.history.back()} 
            className="mr-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent md:mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Hostel Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          {/* Left Column */}
          <div className="md:col-span-8 space-y-6">
            {/* Your Hostels Section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Your Hostels</h2>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : hostels.length === 0 ? (
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">No hostels found. Add your first hostel to get started.</p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate('/add-hostel')}
                  >
                    Add Hostel
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {hostels.map((hostel) => (
                    <Card key={hostel.id} className="p-4 flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={hostel.images[0] || '/default-hostel.jpg'} 
                          alt={hostel.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{hostel.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>📍</span> {hostel.address}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Type: {hostel.type}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Quick Actions Grid */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 px-2 flex flex-col items-center gap-2 "
                  onClick={() => navigate('/add-hostel')}
                >
                <div className="p-4 bg-blue-100 rounded-full ">
                <Plus className="h-5 w-5 text-blue-500" />
                </div>
                  <span>Add Hostel</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 px-2 flex flex-col items-center gap-2"
                  onClick={() => navigate('/room-management')}
                ><div className="p-4 bg-blue-100 rounded-full text-blue-500">
                  <Home className="h-5 w-5  "/></div>
                  <span>Manage Rooms</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 px-2 flex flex-col items-center gap-2"
                ><div className="p-4 bg-orange-100 rounded-full text-orange-500">
                  <Wallet2 className="h-5 w-5" /></div>
                  <span>Payments</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 px-2 flex flex-col items-center gap-2"
                ><div className="p-4 bg-green-100 rounded-full text-green-500">
                  <Users2 className="h-5 w-5" /></div>
                  <span>Student Records</span>
                </Button>
              </div>
            </section>
          </div>

          {/* Right Column - Recent Activities */}
          <div className="mt-6 md:mt-0 md:col-span-4">
            <section>
              <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <ActivityItem
                  type="success"
                  title="New student registered in Room 203"
                  time="2 hours ago"
                />
                <ActivityItem
                  type="warning"
                  title="Maintenance request for Room 105"
                  time="4 hours ago"
                />
                <ActivityItem
                  type="info"
                  title="Payment received from Room 304"
                  time="5 hours ago"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

// Activity Item Component
function ActivityItem({ type, title, time }) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'info':
        return '📋'
      default:
        return '•'
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border">
      <span className="text-lg">{getIcon()}</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}