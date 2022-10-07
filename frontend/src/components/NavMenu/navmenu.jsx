import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../../store/session';
import LoggedInMenu from '../LoggedInMenu/loggedinmenu';
import LoggedOutMenu from '../LoggedOutMenu/loggedoutmenu';
import './navmenu.css'
import linkedinlogo from './LI-Bug.svg.original.svg';
import githublogo from './GitHub-Mark-120px-plus.png';
import SearchBar from '../Search/SearchBar';

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
            <div>
            <span>
                <a href="https://www.linkedin.com/in/vincentshuali/"><img src={linkedinlogo} alt="LinkedIn-link" className="logos" /></a>
                <a href="https://github.com/canjalal"><img src={githublogo} alt="GitHub-link" className="logos" /></a>
    </span>
            </div>    
            <SearchBar />
        </div>
        <div className="right-menu">
            {/* Place holder for component */}
            {sessionUser ? <LoggedInMenu /> : <LoggedOutMenu />}
        </div>
    </div>
  )
}

export default NavMenu