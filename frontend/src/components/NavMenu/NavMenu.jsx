import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../../store/session';
import LoggedInMenu from '../LoggedInMenu/LoggedInMenu';
import LoggedOutMenu from '../LoggedOutMenu/loggedoutmenu';
import './navmenu.css'
import linkedinlogo from './LI-Bug.svg.original.svg';
import githublogo from './GitHub-Mark-120px-plus.png';
import SearchBar from '../Search/SearchBar';
import { IoMdSearch } from 'react-icons/io';
import { useRef } from 'react';

const NavMenu = (props) => {

    const location = useLocation();

    const miniSearchBarRef = useRef(null);
    const navMenuRef = useRef(null);

    useEffect(() => {
        if(location.pathname === "/") navMenuRef.current.classList.add("home-nav");
        // console.log(location.pathname);

    }, []);

    const toggleMiniSearch = (e) => {

        miniSearchBarRef.current.classList.toggle("mobilized");
        miniSearchBarRef.current.classList.toggle("demobilized");
    }

    const sessionUser = useSelector(getCurrentUser);
  return (
    <div className="menu-wrapper">
        <div className="nav-menu" ref={navMenuRef}>
            <div className="left-menu">
                <div className="logo">
                    {sessionUser ? <Link to="/home">GetTogether</Link> : <Link to="/">GetTogether</Link>}
                </div>
                <div>
                    {/* Move the following to the footer or something  */}
                <div id="self-promo">
                    <a href="https://www.linkedin.com/in/vincentshuali/"><img src={linkedinlogo} alt="LinkedIn-link" className="logos" /></a>
                    <a href="https://github.com/canjalal"><img src={githublogo} alt="GitHub-link" className="logos" /></a>
        </div>
                </div>
                <div className="big-search-bar">
                <SearchBar />                
                </div>    

                <div className="mini-search" onClick={toggleMiniSearch}><IoMdSearch /></div>
            </div>
            <div className="right-menu">
                {/* Place holder for component */}
                {sessionUser ? <LoggedInMenu /> : <LoggedOutMenu />}
            </div>
        </div>
        <div className="mini-search-bar demobilized" ref={miniSearchBarRef}>
            <SearchBar />
        </div>
    </div>
  )
}

export default NavMenu