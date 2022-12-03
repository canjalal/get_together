import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const LoggedOutMenu = () => {

    const location = useLocation();

  return (
    <>
            {location.pathname !== '/signup' && <div><Link to="/signup">Sign Up</Link></div>}
            {location.pathname !== '/login' && <div><Link to="/login">Log In</Link></div>}
    </>
  )
}

export default LoggedOutMenu