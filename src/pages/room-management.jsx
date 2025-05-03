import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Bed, BedDouble, BedSingle, Dice4, ListFilter, Search } from 'lucide-react'

import React from 'react'

const RoomManagement = () => {
  return (
  <div className='w-full h-full flex justify-center items-center'>
    <div className='w-96 h-screen border border-1px border-black'>

        {/* navbar division tag */}
       <div className='w-96 h-14 border border-1px border-red-500 flex justify-center items-center'>
        <label className='w-44 h-7 font-medium text-lg text-gray-800'>Room Management</label>
       </div>

       {/* search & filter tags */}
       <div className='w-96 h-16  flex justify-center items-center justify-around'>
        <div className='w-72 h-10  flex jsutify-center'> 
        <div className='w-10 h-10  flex justify-center items-center'><Search /></div>
          <Input className="w-64 h-10 pr-4" type="text" placeholder='Search Rooms...'  /></div>
        <div className='w-10 h-10 border border-1px border-red-500 flex justify-center items-center bg-gray-200 rounded-lg'><ListFilter /></div>
        </div>


           {/* body rooms conatiner */}
        <div className='w-96  border border-1px border-red-500 flex justify-center'>
          <div className='   grid grid-cols-2 gap-8 pt-4'>

            <div className='w-40 h-40  flex justify-center flex-col items-center bg-blue-100 rounded-xl'>
              <div className='w-8 h-10'><BedSingle color='blue' /></div>
              <h3 className='text-xl font-bold text-gray-800'>101</h3>
              <p className='text-gray-600'>Single Room</p>
              <p className='text-gray-500 text-sm'>1 person</p>
            </div>

            <div className='w-40 h-40  flex justify-center flex-col items-center bg-green-100 rounded-xl'>
              <div className='w-8 h-10'><BedDouble color='green'/></div>
              <h3 className='text-xl font-bold text-gray-800'>201</h3>
              <p className='text-gray-600'>Double Room</p>
              <p className='text-gray-500 text-sm'>2 persons</p>
            </div>
            
            <div className='w-40 h-40  flex justify-center flex-col items-center bg-violet-100 rounded-xl'>
              <div className='w-8 h-10'><Bed color='violet' /></div>
              <h3 className='text-xl font-bold text-gray-800'>301</h3>
              <p className='text-gray-600'>Triple Room</p>
              <p className='text-gray-500 text-sm'>3 persons</p>
            </div>

            <div className='w-40 h-40  flex justify-center flex-col items-center bg-orange-100 rounded-xl'>
              <div className='w-8 h-10'><Dice4 color='orange' /></div>
              <h3 className='text-xl font-bold text-gray-800'>401</h3>
              <p className='text-gray-600'>Quad Room</p>
              <p className='text-gray-500 text-sm'>4 persons</p>
            </div>

          </div>
        </div>



    </div>
  </div>
  )
}

export default RoomManagement
