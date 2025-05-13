import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import {
  ImagePlus,
  Wifi,
  Wind,
  Dumbbell,
  BookOpen,
  Loader2,
  X,
  Utensils,
  Shield,
  Car,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { hostelApi } from "@/api/hostelApi"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

// Define the validation schema using zod
const hostelSchema = z.object({
  name: z.string().min(1, { message: "Hostel name is required" }),
  type: z.enum(["boys", "girls", "mixed"], { message: "Hostel type is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  contactNumber: z
    .string()
    .min(1, { message: "Contact number is required" })
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }),
  facilities: z
    .array(z.enum(["WiFi", "AC", "Laundry", "Gym", "Library", "Cafeteria", "Security", "Parking"]))
    .min(1, { message: "At least one facility is required" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" })
    .max(5, { message: "Maximum 5 images allowed" }),
})

export default function AddHostel() {
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [selectedFacilities, setSelectedFacilities] = useState([])

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imageUrls])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }
    const newUrls = files.map((file) => URL.createObjectURL(file))
    setImageUrls((prev) => [...prev, ...newUrls])
    setImages((prev) => [...prev, ...files])
    setErrors((prev) => ({ ...prev, images: null }))
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(imageUrls[index])
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    )
    setErrors((prev) => ({ ...prev, facilities: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Collect form data
      const form = e.target
      const formData = new FormData(form)
      const data = {
        name: formData.get("name"),
        type: formData.get("type"),
        address: formData.get("address"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
        facilities: selectedFacilities,
        images: images,
      }

      // Validate form data using zod
      const validatedData = hostelSchema.parse(data)

      const hostelData = {
        ownerId: user.id,
        ...validatedData,
      }

      // Prepare FormData for API call
      const apiFormData = new FormData()
      Object.entries(hostelData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => apiFormData.append("images", file))
        } else if (key === "facilities") {
          apiFormData.append("facilities", JSON.stringify(value))
        } else {
          apiFormData.append(key, value)
        }
      })

      const result = await hostelApi.createHostel(apiFormData)
      navigate("/hostel-dashboard")
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
      } else {
        console.error("Error creating hostel:", error)
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
        <div className="flex h-14 items-center px-4 max-w-6xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="mr-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Add New Hostel</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:py-8 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <Card className="p-4 border-dashed">
              {imageUrls.length > 0 ? (
                <div className="relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {imageUrls.map((url, index) => (
                        <CarouselItem key={url}>
                          <div className="relative aspect-[4/3]">
                            <img
                              src={url}
                              alt={`Hostel image ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 md:-left-6" />
                    <CarouselNext className="-right-4 md:-right-6" />
                  </Carousel>
                </div>
              ) : null}

              {images.length < 5 && (
                <Label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center py-8 cursor-pointer mt-4"
                >
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="images"
                  />
                  <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium">Add Hostel Images</span>
                  <span className="text-xs text-gray-500 text-center">
                    {images.length === 0
                      ? "Tap to upload (Max 5 images)"
                      : `${images.length} image${images.length > 1 ? "s" : ""} selected (${
                          5 - images.length
                        } remaining)`}
                  </span>
                </Label>
              )}
              {errors.images && <p className="text-sm text-red-600 mt-2">{errors.images}</p>}
            </Card>

            {/* Facilities Section */}
            <div className="py-4">
              <Label className="mb-4 block">Facilities & Amenities</Label>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  "WiFi",
                  "AC",
                  "Laundry",
                  "Gym",
                  "Library",
                  "Cafeteria",
                  "Security",
                  "Parking",
                ].map((facility) => (
                  <button
                    key={facility}
                    type="button"
                    onClick={() => toggleFacility(facility)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg ${
                      selectedFacilities.includes(facility) ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <div className="p-3 rounded-full">
                      {facility === "WiFi" && <Wifi className="w-5 h-5" />}
                      {facility === "AC" && <Wind className="w-5 h-5" />}
                      {facility === "Laundry" && <Loader2 className="w-5 h-5" />}
                      {facility === "Gym" && <Dumbbell className="w-5 h-5" />}
                      {facility === "Library" && <BookOpen className="w-5 h-5" />}
                      {facility === "Cafeteria" && <Utensils className="w-5 h-5" />}
                      {facility === "Security" && <Shield className="w-5 h-5" />}
                      {facility === "Parking" && <Car className="w-5 h-5" />}
                    </div>
                    <span className="text-sm">{facility}</span>
                  </button>
                ))}
              </div>
              {errors.facilities && (
                <p className="text-sm text-red-600 mt-2">{errors.facilities}</p>
              )}
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input id="ownerName" name="ownerName" placeholder="Enter owner's name" className="h-11" />
                {errors.ownerName && (
                  <p className="text-sm text-red-600">{errors.ownerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Hostel Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter hostel name"
                  className="h-11"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type of Hostel</Label>
                <Select name="type" onValueChange={(value) => (form.type.value = value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select hostel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boys">Boys Hostel</SelectItem>
                    <SelectItem value="girls">Girls Hostel</SelectItem>
                    <SelectItem value="mixed">Mixed Hostel</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Location Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter complete address"
                  className="min-h-[100px]"
                />
                {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="+1 (XXX) XXX-XXXX"
                  type="tel"
                  className="h-11"
                />
                {errors.contactNumber && (
                  <p className="text-sm text-red-600">{errors.contactNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  className="h-11"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                "Create Hostel"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}