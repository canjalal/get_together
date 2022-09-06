import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/session';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './loggedinmenu.css';

const LoggedInMenu = () => {

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);

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
    <div>Start a new group</div>
    <div>Notifications</div>
    <div className="profile-link" onClick={(e)=> { setShowMenu((prev) => !prev);
    e.stopPropagation();}}>{sessionUser.name}'s Profile
    { showMenu ? <IoChevronUp /> : <IoChevronDown />}
    </div>
    {/* placeholder for dropdown menu with logout */}
    <div className="dropdown">
        <div>
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
        </ul>
    </div>
    <button onClick={()=> dispatch(logout())}>Logout</button>
    </>
  )
}

export default LoggedInMenu