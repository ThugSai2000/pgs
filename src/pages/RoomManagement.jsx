import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bed, Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

export default function RoomManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const rooms = [
    { number: '101', type: 'Single Room', capacity: 1, color: 'blue' },
    { number: '102', type: 'Single Room', capacity: 1, color: 'blue' },
    { number: '103', type: 'Single Room', capacity: 1, color: 'blue' },
    { number: '201', type: 'Double Room', capacity: 2, color: 'green' },
    { number: '202', type: 'Double Room', capacity: 2, color: 'green' },
    { number: '203', type: 'Double Room', capacity: 2, color: 'green' },
    { number: '301', type: 'Triple Room', capacity: 3, color: 'purple' },
    { number: '302', type: 'Triple Room', capacity: 3, color: 'purple' },
    { number: '401', type: 'Quad Room', capacity: 4, color: 'orange' },
    { number: '402', type: 'Quad Room', capacity: 4, color: 'orange' },
  ]

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <h1 className="text-lg font-semibold">Room Management</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 sticky top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-12 h-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Room Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredRooms.map((room) => (
          <RoomCard key={room.number} room={room} />
        ))}
      </div>
    </div>
  )
}

function RoomCard({ room }) {
  const getBgColor = () => {
    switch (room.color) {
      case 'blue':
        return 'bg-blue-50'
      case 'green':
        return 'bg-green-50'
      case 'purple':
        return 'bg-purple-50'
      case 'orange':
        return 'bg-orange-50'
      default:
        return 'bg-gray-50'
    }
  }

  const getIconColor = () => {
    switch (room.color) {
      case 'blue':
        return 'text-blue-500'
      case 'green':
        return 'text-green-500'
      case 'purple':
        return 'text-purple-500'
      case 'orange':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <button 
      className={`${getBgColor()} p-4 rounded-lg text-center hover:opacity-90 transition-opacity`}
      onClick={() => window.location.href = `/room-residents/${room.number}`}
    >
      <Bed className={`mx-auto h-6 w-6 mb-2 ${getIconColor()}`} />
      <div className="text-lg font-medium">{room.number}</div>
      <div className="text-sm text-muted-foreground">{room.type}</div>
      <div className="text-sm text-muted-foreground">
        {room.capacity} {room.capacity === 1 ? 'Person' : 'Persons'}
      </div>
    </button>
  )
}