import React from 'react'
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

const Layout = (props) => {
  return (
    <div className=''>
    <Navbar/>
          { props.children }
    <Footer/>
    </div>
  )
}

export default Layout