import { NavBarLink } from '../constants'
import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = (props) => {
  return (
    <nav className='z-10 sticky top-0 flex items-center justify-center gap-12 w-full px-[5vw] py-5  border-b border-grey bg-white'>
      <div className="inline-block">
        <img src="/uniuyo-logo.png" className='w-24' alt="Logo" />
      </div>
    </nav>
  )
}

export default NavBar