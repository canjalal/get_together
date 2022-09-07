import React from 'react'
import { useNavigate } from 'react-router-dom'
import './groupform.css'

const GroupForm1 = (props) => {

// const navigate = useNavigate();

//     if(!sessionUser) {
//         navigate("/");
//     }

  return (
    <div >
        <p className="pre-heading">
            BECOME AN ORGANIZER
        </p>
        <h1 className="first-step">We'll walk you through a few steps to build your local community</h1>
        <button className="standard-button">Get started</button>
    </div>
  )
}

export default GroupForm1