import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import LoggedInMenu from '../LoggedInMenu/loggedinmenu';
import LoggedOutMenu from '../LoggedOutMenu/loggedoutmenu';
import './navmenu.css'

const NavMenu = (props) => {

    const sessionUser = useSelector(state => state.session.user);
  return (
    <div className="nav-menu">
        <div className="left-menu">
            <div className="logo"><Link to="/">GetTogether</Link></div>
            <div className="search-bar">Search Placeholder</div>
        </div>
        <div className="right-menu">
            {/* Place holder for component */}
            {sessionUser ? <LoggedInMenu /> : <LoggedOutMenu />}
        </div>
    </div>
  )
}

export default NavMenu