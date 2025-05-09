import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Camera, Wifi, AirVent, WashingMachine, Utensils, SquareParking, Library, Dumbbell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { addHostel } from '../api/api';

// Define Zod schema for form validation
const hostelSchema = z.object({
  ownerName: z.string().min(1, 'Owner name is required').max(100, 'Owner name is too long'),
  hostelName: z.string().min(1, 'Hostel name is required').max(100, 'Hostel name is too long'),
  hostelType: z.enum(['Boys Hostel', 'Girls Hostel'], { required_error: 'Hostel type is required' }),
  address: z.string().min(1, 'Address is required').max(500, 'Address is too long'),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits').max(15, 'Contact number is too long'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  facilities: z.array(z.string()).min(1, 'At least one facility must be selected'),
  images: z.array(z.any())
    .min(1, 'At least one image is required')
    .max(10, 'Cannot upload more than 10 images'),
});

const menuList = [
  { id: 1, name: 'Wifi', icon: Wifi },
  { id: 2, name: 'AC', icon: AirVent },
  { id: 3, name: 'WashingMachine', icon: WashingMachine },
  { id: 4, name: 'Cafeteria', icon: Utensils },
  { id: 5, name: 'Parking', icon: SquareParking },
  { id: 6, name: 'Library', icon: Library },
  { id: 7, name: 'Gym', icon: Dumbbell },
];

const AddNewHostel = () =>
{
  const [formData, setFormData] = useState({
    ownerName: '',
    hostelName: '',
    hostelType: '',
    address: '',
    contactNumber: '',
    email: '',
    facilities: [],
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [hostelImages, setHostelImages] = useState([]); // For image previews

  // Handle image uploads
  const getHostelImages = (event) =>
  {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({ ...prev, images: files }));

    // Create preview URLs
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setHostelImages(newImageUrls);
  };

  // Clean up object URLs on component unmount
  useEffect(() =>
  {
    return () =>
    {
      hostelImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [hostelImages]);

  // Handle form input changes
  const handleInputChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name])
    {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle facility selection
  const toggleFacility = (facility) =>
  {
    setFormData((prev) =>
    {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities };
    });
    // Clear facilities error when user selects something
    if (errors.facilities)
    {
      setErrors(prev => ({ ...prev, facilities: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try
    {
      // Validate form data with Zod
      const validatedData = hostelSchema.parse(formData);
      console.log('Form data is valid:', validatedData);

      // If validation passes, proceed with form submission
      const response = await addHostel(validatedData);
      console.log('API response:', response);

      // Reset form after successful submission
      setFormData({
        ownerName: '',
        hostelName: '',
        hostelType: '',
        address: '',
        contactNumber: '',
        email: '',
        facilities: [],
        images: [],
      });
      setHostelImages([]);
      setErrors({});

    } catch (error)
    {
      // Handle validation errors
      if (error instanceof z.ZodError)
      {
        const formattedErrors = error.errors.reduce((acc, curr) =>
        {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else
      {
        // Handle API errors
        console.error('API error:', error);
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-96 h-screen border-2 border-red-500">
        {/* Navbar */}
        <div className="w-96 h-16 flex justify-center items-center bg-red-100">
          <div className="w-10 h-10 flex justify-center items-center">
            <ArrowLeft />
          </div>
          <div className="w-72 h-7 font-medium text-gray-800 pr-8 text-lg">Add New Hostel</div>
        </div>

        {/* Form Body */}
        <div className="w-96 flex justify-center items-center gap-4 flex-col bg-green-100">
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            {/* Image Upload */}
            <div className="w-80">
              <label className="border-2 border-dashed border-gray-300 rounded-lg w-80 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 mt-6 box-border">
                {hostelImages.length > 0 ? (
                  <div className="flex flex-wrap gap-2 p-2 overflow-auto h-full">
                    {hostelImages.map((image, index) => (
                      <img key={index} src={image} alt="Hostel preview" className="w-16 h-16 object-cover" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 mb-4">
                      <Camera className="w-12 h-12" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-700">Add Hostel Images</p>
                      <p className="text-sm text-gray-500">Tap to upload</p>
                    </div>
                  </>
                )}
                <Input
                  type="file"
                  className="hidden"
                  onChange={getHostelImages}
                  multiple
                  accept="image/*"
                />
              </label>
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>

            {/* Owner Name */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
              <Input
                className="w-80 h-10 bg-indigo-100"
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="Enter owner's name"
              />
              {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
            </div>

            {/* Hostel Name */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Name</label>
              <Input
                className="w-80 h-10 bg-indigo-100"
                type="text"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleInputChange}
                placeholder="Enter hostel name"
              />
              {errors.hostelName && <p className="text-red-500 text-sm mt-1">{errors.hostelName}</p>}
            </div>

            {/* Hostel Type */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Hostel</label>
              <Select
                name="hostelType"
                value={formData.hostelType}
                onValueChange={(value) =>
                {
                  setFormData((prev) => ({ ...prev, hostelType: value }));
                  if (errors.hostelType)
                  {
                    setErrors(prev => ({ ...prev, hostelType: '' }));
                  }
                }}
              >
                <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm">
                  <SelectValue placeholder="Select hostel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boys Hostel">Boys Hostel</SelectItem>
                  <SelectItem value="Girls Hostel">Girls Hostel</SelectItem>
                </SelectContent>
              </Select>
              {errors.hostelType && <p className="text-red-500 text-sm mt-1">{errors.hostelType}</p>}
            </div>

            {/* Address */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                className="bg-indigo-100"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Contact Number */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <Input
                className="w-80 h-10 bg-indigo-100"
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+91 0000000000"
              />
              {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
            </div>

            {/* Email Address */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input
                className="w-80 h-10 bg-indigo-100"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email Address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Facilities & Amenities */}
            <div className="w-80">
              <label className="block text-sm font-medium text-gray-700 mb-1">Facilities & Amenities</label>
              <div className="flex flex-wrap gap-2">
                {menuList.map((item) =>
                {
                  const Icon = item.icon;
                  const isSelected = formData.facilities.includes(item.name);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleFacility(item.name)}
                      className={`p-2 rounded-md flex flex-col items-center justify-center w-16 h-16 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                      <Icon className="w-6 h-6" />
                      <p className="mt-1 text-xs">{item.name}</p>
                    </button>
                  );
                })}
              </div>
              {errors.facilities && <p className="text-red-500 text-sm mt-1">{errors.facilities}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-80 h-12 flex justify-center items-center bg-blue-500 text-white rounded-lg mt-4 mb-8"
            >
              Create Hostel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewHostel;