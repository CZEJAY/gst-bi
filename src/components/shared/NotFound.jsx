
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    navigate("/")
  return (
    <div>NotFound</div>
  )
}

export default NotFound