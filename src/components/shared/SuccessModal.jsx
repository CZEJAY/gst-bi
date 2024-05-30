import { CheckCircle2, X } from 'lucide-react'
import React from 'react'
import { ClipLoader } from 'react-spinners'

const SuccessModal = ({
    image,
    firstname,
    surname,
    othername,
    onclickModal
}) => {

  return (
    <div className='absolute p-9 rounded-lg border bg-white h-96 w-[700px] shadow-2xl z-50 top-[120px] '>
        <div className="">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={onclickModal} >
                <X />
            </div>
            <div className="text-center">
                <h2 className="text-5xl font-bold text-emerald-500">Success!</h2>
                <p className="text-xl font-semibold text-emerald-400">Your registeration has been successfully submitted.</p>
            </div>
            <div className="flex justify-center flex-col items-center mt-10">
                <div className="relative">
                    <img className='h-24  object-cover' src={image} alt="user" />
                    <div className="absolute top-0 right-0">
                        <CheckCircle2 className=' text-emerald-500' />
                    </div>
                </div>    
                <div className="text-lg font-semibold">{surname} {firstname}, {othername}</div>            
            </div>
        </div>
    </div>
  )
}

export default SuccessModal