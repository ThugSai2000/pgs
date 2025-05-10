import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil, Trash2, FileText } from "lucide-react"

export default function RoomResidents() {
    const roomId = 101
  const residents = [
    {
      id: 1,
      name: 'Joe Belfiore',
      status: 'Currently checked in',
      avatar: '/avatars/joe.jpg',
      statusColor: 'green'
    },
    {
      id: 2,
      name: 'Bill Gates',
      status: 'Attending meeting',
      avatar: '/avatars/bill.jpg',
      statusColor: 'green'
    },
    {
      id: 3,
      name: 'Mark Zuckerberg',
      status: 'Maintenance request pending',
      avatar: '/avatars/mark.jpg',
      statusColor: 'yellow'
    },
    {
      id: 4,
      name: 'Marissa Mayer',
      status: 'Checked out',
      avatar: '/avatars/marissa.jpg',
      statusColor: 'red'
    },
    {
      id: 5,
      name: 'Sundar Pichai',
      status: 'Room cleaning in progress',
      avatar: '/avatars/sundar.jpg',
      statusColor: 'green'
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
          <h1 className="text-lg font-semibold">Room Residents</h1>
        </div>
      </div>

      {/* Residents List */}
      <div className="p-4 space-y-3">
        {residents.map((resident) => (
          <div 
            key={resident.id} 
            className="flex items-center justify-between p-4 bg-background rounded-lg border cursor-pointer hover:bg-accent/50"
            onClick={() => window.location.href = `/payment-management/${resident.id}`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <img src={resident.avatar} alt={resident.name} />
                </Avatar>
                <span 
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white bg-${resident.statusColor}-500`}
                />
              </div>
              <div>
                <h3 className="font-medium">{resident.name}</h3>
                <p className="text-sm text-muted-foreground">{resident.status}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resident FAB */}
      
      <button 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        onClick={() => window.location.href = `/add-resident/${roomId}`}
      >
        <Pencil className="h-6 w-6" />
      </button>
    </div>
  )
}