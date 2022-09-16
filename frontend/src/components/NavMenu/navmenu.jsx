import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../../store/session';
import LoggedInMenu from '../LoggedInMenu/loggedinmenu';
import LoggedOutMenu from '../LoggedOutMenu/loggedoutmenu';
import './navmenu.css'

const NavMenu = (props) => {

    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") document.querySelector(".nav-menu").classList.add("home-nav");
        // console.log(location.pathname);

    }, []);

    const sessionUser = useSelector(getCurrentUser);
  return (
    <div className="nav-menu">
        <div className="left-menu">
            <div className="logo">
                {sessionUser ? <Link to="/home">GetTogether</Link> : <Link to="/">GetTogether</Link>}
            </div>
                
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