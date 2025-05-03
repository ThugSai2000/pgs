import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Trash2, UserRoundPen } from 'lucide-react'
import React from 'react'

const Users = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-96 h-screen border border-1 border-black'>
         
         {/* navbar division tag */}
        <div className='w-96 h-16 border border-1 border-orange-500 flex justify-center items-center '>
            <label className='w-12 h-7  text-lg text-gray-800'>Users</label>
        </div>
        {/* body dividion tags */}
     
        <div className='w-96  border border-1 border-red-500 flex justify-center bg-pink-200'>            
          <div className='grid gap-4 pt-4'>

            <div className='w-80 h-20  flex justify-center items-center bg-white rounded-lg'>
                <div className='w-12 h-12  flex justify-center items-center'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className='w-64 h-11  flex justify-center gap-32 items-center'>
                    <p className="pl-1">Vamshi</p> 
                    <div className="w-20 h-11  flex justify-center items-center justify-around"><UserRoundPen /><Trash2 /></div>
                </div>
            </div>

            <div className='w-80 h-20  flex justify-center items-center bg-white rounded-lg'>
                <div className='w-12 h-12 flex justify-center items-center'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className='w-64 h-11  flex justify-center gap-32 items-center'>
                    <p className="pl-1">Vamshi</p> 
                    <div className="w-20 h-11  flex justify-center items-center justify-around"><UserRoundPen /><Trash2 /></div>
                </div>
            </div>

            <div className='w-80 h-20  flex justify-center items-center  bg-white rounded-lg'>
                <div className='w-12 h-12  flex justify-center items-center'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className='w-64 h-11  flex justify-center gap-32 items-center'>
                    <p className="pl-1">Vamshi</p> 
                    <div className="w-20 h-11  flex justify-center items-center justify-around"><UserRoundPen /><Trash2 /></div>
                </div>
            </div>

            <div className='w-80 h-20  flex justify-center items-center bg-white rounded-lg'>
                <div className='w-12 h-12  flex justify-center items-center'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className='w-64 h-11  flex justify-center gap-32 items-center'>
                    <p className="pl-1">Vamshi</p> 
                    <div className="w-20 h-11 flex justify-center items-center justify-around"><UserRoundPen /><Trash2 /></div>
                </div>
            </div>

            <div className='w-80 h-20  flex justify-center items-center  bg-white rounded-lg'>
                <div className='w-12 h-12 flex justify-center items-center'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className='w-64 h-11  flex justify-center gap-32 items-center'>
                    <p className="pl-1">Vamshi</p> 
                    <div className="w-20 h-11  flex justify-center items-center justify-around"><UserRoundPen /><Trash2 /></div>
                </div>
            </div>

            

          </div>
        </div>

      </div>
    </div>
  )
}

export default Users
