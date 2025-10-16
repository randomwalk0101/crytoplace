import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'




const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Features</li>
          <li>pricing</li>
          <li>Blog</li>
        </ul>

    <div className="nav-right">
      <select>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="inr">GBP</option>
      </select>

      <button>Sign up <img src="" alt=""/></button>


    </div>
    
    </div>
  )
}

export default Navbar