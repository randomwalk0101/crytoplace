import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Coin from './pages/coin/Coin';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';





const App = () => {
  return (
    <div className='app'> 
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:id' element={<Coin/>}/> 


      </Routes>
      <Footer/>




    </div>
  )
}

export default App