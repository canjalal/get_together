import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/session';

const LoggedInMenu = () => {

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
  return (
    <>
    <div>Start a new group</div>
    <div>Notifications</div>
    <div>{sessionUser.name}'s Profile</div>
    {/* placeholder for dropdown menu with logout */}
    <button onClick={()=> dispatch(logout())}>Logout</button>
    </>
  )
}

export default LoggedInMenu