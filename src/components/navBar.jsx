import { NavBarLink } from '../constants'
import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = (props) => {
  return (
    <nav className='z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white'>
        {
            NavBarLink.map((item, i) => {
                const {icon: Icon} = item
                // const isActive = pathname === item.href
                return (
                    <Link key={i} to={item.href} className={`"bg-orange-900 rounded-lg text-white"} flex items-center justify-center w-1/5 h-full text-lg`}>
                        <Icon size={25}/>
                        {item.label}
                    </Link>
                )
            })
         }
    </nav>
  )
}

export default NavBar