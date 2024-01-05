import React from 'react'
import Home from '../Home'
import Login from '../Login/Login'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div>
      <Home />
        {/* <Outlet/> */}
    </div>
  )
}

export default Root;