import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, logout } from '../../store/session';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './loggedinmenu.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const LoggedInMenu = () => {

    const sessionUser = useSelector(getCurrentUser);

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(()=> {
        if(showMenu) {
            document.querySelector('.dropdown').style.display = "flex";
        } else {
        document.querySelector('.dropdown').style.display = "none";
        }
    }, [showMenu]);

    const cancelModal = (e) => {
        if(!document.querySelector('.dropdown').contains(e.target)) {
            setShowMenu(false);
        }
      }
    
      useEffect(()=> {
        window.addEventListener('click', cancelModal);
        return () => {
            window.removeEventListener('click', cancelModal);
        }
      }, [])
    
  return (
    <>
    {location.pathname !== '/groups/new' && <div id="new-group-link"><Link to="/groups/new" className="green-link">Start a new group</Link></div>}
    {/* <div>Notifications</div> */}
    <div className="profile-link" onClick={(e)=> { setShowMenu((prev) => !prev);
    e.stopPropagation();}}>{sessionUser.name}'s Profile
    { showMenu ? <IoChevronUp /> : <IoChevronDown />}
    </div>
    {/* placeholder for dropdown menu with logout */}
    <div className="dropdown">
        {/* <div>
            <ul>
                <li>Your events</li>
                <li>Your groups</li>
            </ul>
        </div>

        <hr />
        <ul>
            <li>View profile</li>
            <li>Settings</li>
            <li>Log out</li>
        </ul> */}
        <button className="small-button" onClick={()=> {
        dispatch(logout());
        navigate("/");
    }}>Logout</button>
    </div>
    
    </>
  )
}

export default LoggedInMenu