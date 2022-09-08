import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomBar from './BottomBar'
import './groupform.css'
import { GroupFormContext } from './GroupFormContext'
import GroupKeywordsForm from './GroupKeywordsForm'
import GroupLocationForm from './GroupLocationForm'
import NewGroupNav from './NewGroupNav'

const GroupFormIntro = (props) => {

    const { formData, setFormData,
        pageNum, setPageNum,
        pageisDone, setPageisDone} = useContext(GroupFormContext);


// const navigate = useNavigate();

//     if(!sessionUser) {
//         navigate("/");
//     }

// Make a modal that covers entire screen

    const pickElement = (page) => {
        switch(page) {
            case 0:
                return <GroupLocationForm />
            case 1:
                return <GroupKeywordsForm />
                
            default:
                 return "Invalido";
        }
    }

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
            {
                pickElement(pageNum)
            }
        <BottomBar />
        </div>
    </>

  )
}

export default GroupFormIntro