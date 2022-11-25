import React from "react";
import {logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DropDownMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const buttonClickHandler = (e) => {
        dispatch(logout());
        navigate("/");
    }

    return (
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
        <button className="small-button"
        onClick={buttonClickHandler}>Logout</button>
    </div>
    )
}
export default DropDownMenu;