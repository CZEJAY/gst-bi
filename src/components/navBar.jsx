import { NavBarLink } from '../constants'
import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = (props) => {
  return (
    <nav className='z-10 sticky top-0 flex items-center justify-center gap-12 w-full px-[5vw] py-5  border-b border-grey bg-white'>
      <div className="inline-flex items-center gap-3">
        <img src="/uniuyo-logo.png" className='w-36 ' alt="Logo" />
        <div className="">
        </div>
        <div className="mx-auto ">
           <p className='font-bold text-6xl leading-5 text-center uppercase'>University of Uyo GST Portal</p>
        </div>
      </div>

    </nav>
  )
}

export default NavBar