import { X } from 'lucide-react'
import React from 'react'
import { BeatLoader } from 'react-spinners'

const SuccessModal = () => {

  return (
    <div className='absolute p-9 rounded-lg border bg-white h-96 w-[700px] shadow-2xl z-50 top-[120px] '>
        <div className="">
            <div className="absolute top-2 right-2">
                <X />
            </div>
            <div className="text-center">
                <h2 className="text-5xl font-bold">Success!</h2>
                <p className="text-xl font-semibold">Your registeration has been successfully submitted.</p>
                <BeatLoader style={{color: "black"}} className='text-black mt-10' />
            </div>
        </div>
    </div>
  )
}

export default SuccessModal