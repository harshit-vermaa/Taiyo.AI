import React from 'react'
import {NavLink} from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{height:'100%', width:'100%', padding:'10px 0px', borderTop:'1px solid black', display:'flex',flexDirection:'column', textAlign:'center'}} >
      <p>Created By Harshit Verma</p>
      <div style={{display:'flex', gap:'20px', justifyContent:'center'}} >
        <NavLink to='https://www.linkedin.com/in/harshit-verma-6646bb216/' >linkedin</NavLink>
        <NavLink to='https://github.com/harshit-vermaa' >Github</NavLink>
        <NavLink to='https://drive.google.com/file/d/1Kf0u4q1UtaVHyHmzBYuV4KfuWv6QD2zT/view?usp=drive_link' >My Resume</NavLink>
      </div>
    </div>
  )
}

export default Footer