import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomBar from './BottomBar'
import './groupform.css'
import NewGroupNav from './NewGroupNav'

const GroupFormIntro = (props) => {

    const [formData, setFormData] = useState({
        location: "",
        group_keywords: "",
        name: "",
        description: ""
    });

    const [pageNum, setPageNum] = useState(0);

// const navigate = useNavigate();

//     if(!sessionUser) {
//         navigate("/");
//     }

// Make a modal that covers entire screen

  return (
    <>
        <div >
        <p className="pre-heading">
            BECOME AN ORGANIZER
        </p>
        <h1 className="first-step">We'll walk you through a few steps to build your local community</h1>
        <button className="standard-button" onClick={(e) => {document.querySelector("#new-group").style.display = "flex"}}>Get started</button>

    </div>
    <div id="new-group">
        <NewGroupNav />
            Merge your auth branch!
        <BottomBar props={{pageNum, setPageNum,
                            formData, setFormData}} />
        </div>
    </>

  )
}

export default GroupFormIntro