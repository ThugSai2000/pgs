import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Camera, WifiIcon , Wifi, AirVent, WashingMachine, Utensils, SquareParking,Library, Dumbbell} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Select,SelectItem } from '@/components/ui/select'
import { SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { Textarea } from '@/components/ui/textarea'
import { map } from 'zod'



const menuList = [
                  {id: 1, name: "Wifi", icon:Wifi}, 
                  {id: 2, name: "AC", icon:AirVent}, 
                  {id: 3, name: "WashingMachine", icon:WashingMachine},
                  {id: 4, name: "Cafeteria", icon:Utensils},
                  {id: 5, name: "Parking", icon:SquareParking},
                  {id: 6, name: "library", icon:Library},
                  {id: 7, name: "Gym", icon:Dumbbell}
                ]



const AddNewHostel = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [hostelImages, setHostelImages] = useState([]);

  const getHostelImages = (event) =>{
        const files=Array.from(event.target.files)
        const newImageUrls = files.map(file => {
          if(file){
            return URL.createObjectURL(file)
          }
          return null
        }).filter(url => url !== null)
        setHostelImages(prevImages => [...prevImages, ...newImageUrls])
  }
  
useEffect(() => {
  return () => {
    hostelImages.forEach(url => URL.revokeObjectURL(url))
  }
},[hostelImages])

  return (
<div className='w-full h-full  flex justify-center'>
  <div className='w-96 h-screen  border border-2 border-red-500 '>

       {/* navbar division tag */}
     <div className='w-96 h-16  flex justify-center items-center bg-red-100'>
        <div className='w-10 h-10  flex justify-center items-center' >
        <ArrowLeft />
        </div>
        <div className='w-72 h-7 font-medium text-gray-800 pr-8 text-lg'>Add New Hostel</div>
     </div>

       {/* body input image division tag */}
    <div className='w-96   flex justify-center items-center gap-4 flex-col bg-green-100 '>
     <label className="border-2 border-dashed border-gray-300 rounded-lg w-80 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 mt-6 box-border">

      {hostelImages.length > 0 ?(<div 
      className='flex flex-wrap gap-2 p-2 overflow-auto h-full'>
        {hostelImages.map((image,index) =>(
          <img
          key={index}
          src={image} />
        )
      )}
      </div>) : (<> <div className='w-12 h-12 mb-4'><Camera className='w-12 h-12' /></div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">Add Hostel Images</p>
        <p className="text-sm text-gray-500">Tap to upload</p>
      </div></>)}

      {/* <div className='w-12 h-12 mb-4'><Camera className='w-12 h-12' /></div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">Add Hostel Images</p>
        <p className="text-sm text-gray-500">Tap to upload</p>
      </div> */}
      <Input type="file"className="hidden" onChange={getHostelImages} multiple
      />
     </label>

      {/* credentials division tags */}
     <div className='w-80 h-16 flex-col'>
      <div className='w-80 h-4 text-sm font-medium text-gray-700  pb-5 '>Owner Name</div>
      <Input className='w-80 h-10 mt-2 bg-indigo-100' type='text' placeholder='Enter owners name'></Input>
     </div>

     <div className='w-80 h-16  flex gap-2 flex-col'>
     <div className='w-80 h-4 text-sm font-medium text-gray-700 pb-5'>Hostel Name</div>
     <Input className='w-80 h-10 bg-indigo-100' type='text' placeholder='Enter Hostel name'></Input>
     </div>

    <div className='w-80 h-16  flex gap-2 flex-col'>
      <div class="mb-4">
       <label for="hostelType" class="block text-sm font-medium text-gray-700 mb-1">Type of Hostel</label>
       <select
         id="hostelType"
         class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2  focus:ring-red-500"
       >
       <option value="" disabled selected>Select hostel type</option>
       <option value="option1">Boys Hostel</option>
       <option value="option2">Girls Hostel</option>
       </select>
      </div>

     </div>
     <div className='w-80 h-30  flex gap-2 flex-col'>
      <div className='w-80 h-4 text-sm font-medium text-gray-700 pb-5'>Address</div>
      <Textarea type="text" placeholder='Enter complete address'></Textarea>
    </div>

     <div className='w-80 h-16  flex gap-2 flex-col'>
      <div className='w-80 h-4 text-sm font-medium text-gray-700 pb-5'>Contact Number</div>
      <Input className='w-80 h-10 bg-indigo-100' type='text' placeholder='+91 0000000000'  />
     </div>

     <div className='w-80 h-16 border-2 border border-solid border-black flex gap-2 flex-col'>
      <div className='w-80 h-4 text-sm font-medium text-gray-700 pb-5'>Email Address</div>
      <Input className='w-80 h-10 bg-indigo-100' type='text' placeholder='Enter Email Address'  />
     </div>
     
       {/* facilities and amenities division tag */}
     <div className='w-80 h-36 border-2 border border-solid border-black'>
      <div className='w-80 h-4 text-sm border border-1 border-solid border-red-500 pb-5 text-gray-700 font-medium'>Facilities & Amenities</div>
      <div className='w-80 h-28 border border-1 border-solid border-red-500 mt-2 flex flex-row justify-around'>
       
        

    <div
      className={`facility grid grid-cols-5 gap-4 cursor-pointer ${
        isSelected ? "selected" : ""
      }`}
    >
      {
        menuList.map((item, index) =>{

          const Icon = item.icon
          return <Button
          variant="ghost" // Use ghost variant to minimize default button styling
          onClick={(e) => {
                      setIsSelected(!isSelected);
          }}
          className={`p-0  ${isSelected ? "bg-blue-500" : "bg-gray-500"}`}
        >
          <Icon
            className={`w-10 h-10`}
          />
        {/* <p className="mt-2 text-sm">{item.name}</p> */}

        </Button>

        })
      }
      
    </div>
        
      </div>
     </div>

     {/* create hostel Button  tag */}
     <Button type='text' className='w-80 h-12 flex justify-center items-center bg-blue-500 text-white rounded-lg'>Create Hostel</Button>
    </div>
     
  </div>

</div>
  )
}

export default AddNewHostel
