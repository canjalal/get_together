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
import { IoMdSearch } from 'react-icons/io';

const NavMenu = (props) => {

    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") document.querySelector(".nav-menu").classList.add("home-nav");
        // console.log(location.pathname);

    }, []);

    const toggleMiniSearch = (e) => {
        const miniSearchBar = document.querySelector(".mini-search-bar");

        miniSearchBar.classList.toggle("mobilized");
        miniSearchBar.classList.toggle("demobilized");
    }

    const sessionUser = useSelector(getCurrentUser);
  return (
    <div className="menu-wrapper">
        <div className="nav-menu">
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
        <div className="mini-search-bar demobilized">
            <SearchBar />
        </div>
    </div>
  )
}

export default NavMenu