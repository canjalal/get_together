import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, logout } from '../../store/session';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './loggedinmenu.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';

const LoggedInMenu = () => {

    const sessionUser = useSelector(getCurrentUser);

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();
    
  return (
    <>
    {location.pathname !== '/groups/new' && <div id="new-group-link"><Link to="/groups/new" className="green-link">Start a new group</Link></div>}
    {/* <div>Notifications</div> */}
    <div className="profile-link" onClick={(e)=> { setShowMenu((prev) => !prev);
    e.stopPropagation();}}>{sessionUser.name}'s Profile
    { showMenu ? <IoChevronUp /> : <IoChevronDown />}
    </div>
    {/* placeholder for dropdown menu with logout */}
    {showMenu && <DropDownMenu setShowMenu={setShowMenu} />}
    
    </>
  )
}

export default LoggedInMenu