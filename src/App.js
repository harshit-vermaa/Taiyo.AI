import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contact from './Pages/Contact/Contact'
import Maps from './Pages/Maps/Maps'
import LinearMap from './Component/Maps/LinearMap/LinearMap'
import MarkedMap from './Component/Maps/MarkedMap/MarkedMap'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Contact />} />
          <Route path='/maps' element={<Maps />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App