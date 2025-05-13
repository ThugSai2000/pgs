import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Thermometer, Bath, Users, Loader2 } from "lucide-react"
import { roomApi } from "@/api/roomApi"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import * as z from "zod"

// Define the validation schema using zod
const formSchema = z.object({
  floorNo: z.string().min(1, { message: "Floor number is required" }),
  roomNo: z.string().min(1, { message: "Room number is required" }),
  roomType: z.string().min(1, { message: "Room type is required" }),
  pricePerHead: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
      message: "Price must be a positive number",
    }),
  isAC: z.boolean(),
  geezerCount: z.number().min(0, { message: "Geyser count cannot be negative" }),
  bathroomCount: z.number().min(1, { message: "At least one bathroom is required" }),
  status: z.enum(["available", "occupied", "maintenance"]),
  maxHeadCount: z.number().min(1, { message: "At least one occupant is required" }),
  currentHeadCount: z.number().min(0, { message: "Current head count cannot be negative" }),
})

export default function AddRoom() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { hostelId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    floorNo: "",
    roomNo: "",
    roomType: "",
    pricePerHead: "",
    isAC: false,
    geezerCount: 0,
    bathroomCount: 1,
    status: "available",
    maxHeadCount: 1,
    currentHeadCount: 0,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error for the field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    console.log("Form data submitted:", formData)

    try {
      // Validate form data using zod
      const validatedData = formSchema.parse(formData)

      const roomData = {
        hostelId: parseInt(hostelId),
        ...validatedData,
        pricePerHead: parseInt(validatedData.pricePerHead),
        floorNo: parseInt(valid   ,parseInt(validatedData.floorNo)),
        maxHeadCount: parseInt(validatedData.maxHeadCount),
      }

      await roomApi.addRoom(roomData)
      navigate(`/room-management/${hostelId}`)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
      } else {
        console.error("Error creating room:", error)
        // Add error handling UI here (e.g., toast notification)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="md:static sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 max-w-2xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="mr-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Add New Room</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto p-4 pb-16 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Floor Number */}
            <div className="space-y-2">
              <Label htmlFor="floorNo">Floor Number</Label>
              <Select
                value={formData.floorNo}
                onValueChange={(value) => handleInputChange("floorNo", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>
                      {`Floor ${i + 1}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.floorNo && (
                <p className="text-sm text-red-600">{errors.floorNo}</p>
              )}
            </div>

            {/* Room Number */}
            <div className="space-y-2">
              <Label htmlFor="roomNo">Room Number</Label>
              <Input
                id="roomNo"
                value={formData.roomNo}
                onChange={(e) => handleInputChange("roomNo", e.target.value)}
                placeholder="Enter room number"
                className="h-11"
              />
              {errors.roomNo && (
                <p className="text-sm text-red-600">{errors.roomNo}</p>
              )}
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select
                value={formData.roomType}
                onValueChange={(value) => handleInputChange("roomType", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Room</SelectItem>
                  <SelectItem value="double">Double Room</SelectItem>
                  <SelectItem value="triple">Triple Room</SelectItem>
                  <SelectItem value="quad">Quad Room</SelectItem>
                </SelectContent>
              </Select>
              {errors.roomType && (
                <p className="text-sm text-red-600">{errors.roomType}</p>
              )}
            </div>

            {/* Price Per Head */}
            <div className="space-y-2">
              <Label htmlFor="pricePerHead">Price Per Head</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <Input
                  id="pricePerHead"
                  type="number"
                  value={formData.pricePerHead}
                  onChange={(e) => handleInputChange("pricePerHead", e.target.value)}
                  placeholder="Enter price"
                  className="h-11 pl-7"
                />
              </div>
              {errors.pricePerHead && (
                <p className="text-sm text-red-600">{errors.pricePerHead}</p>
              )}
            </div>

            {/* Room Cooling */}
            <div className="space-y-2">
              <Label>Room Cooling</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.isAC ? "default" : "outline"}
                  className="flex-1 h-11"
                  onClick={() => handleInputChange("isAC", true)}
                >
                  <Thermometer className="mr-2 h-4 w-4" />
                  AC
                </Button>
                <Button
                  type="button"
                  variant={!formData.isAC ? "default" : "outline"}
                  className="flex-1 h-11"
                  onClick={() => handleInputChange("isAC", false)}
                >
                  <Thermometer className="mr-2 h-4 w-4" />
                  Non-AC
                </Button>
              </div>
            </div>

            {/* Geyser Count */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Geyser Count</Label>
                <div className="text-sm text-muted-foreground">
                  Number of geysers in the room
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleInputChange(
                      "geezerCount",
                      Math.max(0, formData.geezerCount - 1)
                    )
                  }
                  disabled={formData.geezerCount <= 0}
                >
                  -
                </Button>
                <span className="w-8 text-center">{formData.geezerCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleInputChange("geezerCount", formData.geezerCount + 1)
                  }
                >
                  +
                </Button>
              </div>
            </div>
            {errors.geezerCount && (
              <p className="text-sm text-red-600">{errors.geezerCount}</p>
            )}

            {/* Bathroom Count */}
            <div className="space-y-2">
              <Label>Number of Bathrooms</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleInputChange(
                      "bathroomCount",
                      Math.max(1, formData.bathroomCount - 1)
                    )
                  }
                  disabled={formData.bathroomCount <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{formData.bathroomCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleInputChange("bathroomCount", formData.bathroomCount + 1)
                  }
                >
                  +
                </Button>
              </div>
              {errors.bathroomCount && (
                <p className="text-sm text-red-600">{errors.bathroomCount}</p>
              )}
            </div>

            {/* Max Head Count */}
            <div className="space-y-2">
              <Label>Maximum Occupancy</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleInputChange(
                      "maxHeadCount",
                      Math.max(1, formData.maxHeadCount - 1)
                    )
                  }
                  disabled={formData.maxHeadCount <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{formData.maxHeadCount}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleInputChange("maxHeadCount", formData.maxHeadCount + 1)
                  }
                >
                  +
                </Button>
              </div>
              {errors.maxHeadCount && (
                <p className="text-sm text-red-600">{errors.maxHeadCount}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Room"
            )}
          </Button>
        </form>
      </main>
    </div>
  )
}
console.log()