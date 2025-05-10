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
import { ImagePlus, Wifi, Wind, Dumbbell, BookOpen, Loader2, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { hostelApi } from "@/api/hostelApi"
import { useNavigate } from "react-router-dom"

export default function AddHostel() {
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }
    const newUrls = files.map(file => URL.createObjectURL(file))
    setImageUrls(prev => [...prev, ...newUrls])
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(imageUrls[index])
    setImageUrls(prev => prev.filter((_, i) => i !== index))
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    email: "",
    contactNumber: "",
    facilities: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const hostelData = {
        ownerId: user.id,
        ...formData,
        images: images
      }
      const result = await hostelApi.createHostel(hostelData)
      navigate('/hostel-dashboard')
    } catch (error) {
      console.error('Error creating hostel:', error)
      // Add error handling UI here
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleFacility = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Fixed on mobile, static on desktop */}
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
                      ? 'Tap to upload (Max 5 images)'
                      : `${images.length} image${images.length > 1 ? 's' : ''} selected (${5 - images.length} remaining)`}
                  </span>
                </Label>
              )}
            </Card>

            {/* Amenities Section - Moved to left column on desktop */}
            <div className="py-4">
              <Label className="mb-4 block">Facilities & Amenities</Label>
              <div className="grid grid-cols-5 gap-3 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <span className="text-sm">WiFi</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Wind className="w-5 h-5" />
                  </div>
                  <span className="text-sm">AC</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Loader2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Laundry</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-gray-100">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Gym</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-gray-100">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Library</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input 
                  id="ownerName" 
                  placeholder="Enter owner's name"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Hostel Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter hostel name"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type of Hostel</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select hostel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boys">Boys Hostel</SelectItem>
                    <SelectItem value="girls">Girls Hostel</SelectItem>
                    <SelectItem value="mixed">Mixed Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Location Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  placeholder="+1 (XXX) XXX-XXXX"
                  type="tel"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className="h-11"
                  required
                />
              </div>
            </div>

            {/* Submit Button - Now part of the form, not fixed */}
            <Button 
              type="submit" 
              className="w-full h-11" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Hostel'
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}