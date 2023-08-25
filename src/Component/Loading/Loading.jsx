import React from 'react'

const Loading = () => {
  return (
    <div style={{height:'100%', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}} >
      <p style={{ backgroundColor:'#1976d2', padding:'10px 30px', color:'white', fontSize:'30px'}} >Please wait</p>
    </div>
  )
}

export default Loading