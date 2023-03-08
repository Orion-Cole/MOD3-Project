import React from 'react'
import { Link } from 'react-router-dom'
import LogOut from '../log_out'
import './index.css'

const Nav = () => {
  return (
    <div id='nav-container'>
      <LogOut className='nav-item' />
      <Link className='nav-item' to={'/home'}>HOME</Link>
      <Link className='nav-item' to={'/profile'}>PROFILE</Link>
      <Link className='nav-item' to={'/wishlist'}>WISHLIST</Link>
    </div>
  )
}

export default Nav