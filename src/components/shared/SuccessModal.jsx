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
                 
                <div className="text-2xl font-semibold">{surname} {firstname}, {othername}</div>            
            <div className="mt-16 flex items-center flex-col">
               <p className='font-bold text-xl leading-6 ml-2'>
                Please proceed with the print button to get a print out.
               </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SuccessModal