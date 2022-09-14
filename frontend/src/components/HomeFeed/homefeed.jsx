import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../store/session';

const HomeFeed = () => {

    const currentUser = useSelector(getCurrentUser);

    const navigate = useNavigate();



    useEffect(() => {
        if (!currentUser) navigate("/");

    }, [])
  return (
    <div>
        <h1 className="big-title">{currentUser && currentUser.name}</h1>
        <div className="group-organizer">

        </div>
    </div>
    )
}

export default HomeFeed;