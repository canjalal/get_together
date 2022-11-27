import React, { useRef } from "react";
import {logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOutsideClickDetected from "../ModalClickWrapper";
import { useEffect } from "react";

const DropDownMenu = ({setShowMenu}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const cancelModal = useOutsideClickDetected(dropdownRef);

    useEffect(() => {
        setShowMenu(!cancelModal);
    }, [cancelModal]);


    const buttonClickHandler = (e) => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <div className="dropdown" ref={dropdownRef}>
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