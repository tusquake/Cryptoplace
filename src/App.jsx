import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Coin from './pages/Coin/Coin'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/coin/:coinId' element={<Coin />}></Route>
      </Routes>
      <Footer />
    </div>

  )
}

export default App
