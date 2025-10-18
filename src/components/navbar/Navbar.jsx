import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const { setCurrency } = useContext(CoinContext);

    const currencyHandler = (event) => {
    const selectedValue = event.target.value;
      switch (selectedValue) {
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      // "usd" 作为默认选项
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

 

  return (
    <div className='navbar'>
      <Link to="/">
       <img src={logo} alt="logo" className='logo' />
      
      </Link>
    <ul>
      <Link to="/">
      <li>Home</li>
      </Link>
       
        <Link to="/">
      <li>Features</li> 
      </Link>

      <Link to="/">
      <li>Pricing</li>
      </Link>

      <Link to="/">
      <li>Blog</li>
      </Link>
        </ul>

    <div className="nav-right">
      <select onChange={currencyHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="inr">INR</option>
      </select>

      <button>Sign up <img src={arrow_icon} alt="arrow icon"/></button>

    </div>
    
    </div>
  )
}

export default Navbar