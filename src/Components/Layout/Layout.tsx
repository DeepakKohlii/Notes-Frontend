import React from 'react'
import { useLocation } from "react-router-dom";
import Register from '../Authorization/Register';
import Login from '../Authorization/Login';

const Layout = () => {
    const location = useLocation();
  return (
    <div>
    {location.pathname === "/login" && <main>{Login}</main>}
    {location.pathname === "/register" && <main>{Register}</main>}
    
  </div>
  )
}

export default Layout