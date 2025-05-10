import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function AddResident() {
  const { roomId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [idProofImage, setIdProofImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIdProofImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your form submission logic here
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center">
            <button 
              onClick={() => window.history.back()} 
              className="mr-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">Add New Resident</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-primary" 
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="container max-w-2xl mx-auto p-4 space-y-6">
        <div className="space-y-4">
          {/* Resident ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resident ID</label>
            <Input 
              placeholder="Enter resident ID"
              className="h-11"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              placeholder="Enter full name"
              className="h-11"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input 
              type="email"
              placeholder="Enter email address"
              className="h-11"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input 
              type="tel"
              placeholder="Enter phone number"
              className="h-11"
            />
          </div>

          {/* Native Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Native Address</label>
            <Textarea 
              placeholder="Enter complete address"
              className="min-h-[100px]"
            />
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Occupation</label>
            <Input 
              placeholder="Enter occupation"
              className="h-11"
            />
          </div>

          {/* Room ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Room ID</label>
            <Input 
              value={roomId}
              readOnly
              className="h-11 bg-muted"
            />
          </div>

          {/* ID Proof Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">ID Proof Image</label>
            <div 
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => document.getElementById('id-proof-input').click()}
            >
              {idProofImage ? (
                <img 
                  src={idProofImage} 
                  alt="ID Proof" 
                  className="max-h-48 mx-auto rounded-lg"
                />
              ) : (
                <div className="py-4">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tap to upload ID proof</p>
                </div>
              )}
              <input
                id="id-proof-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        {/* Submit Button - Only visible on desktop */}
        <Button 
          type="submit" 
          className="w-full h-11 hidden md:block" 
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Resident'}
        </Button>
      </form>
    </div>
  )
}