import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomBar from './BottomBar'
import GroupDescriptionForm from './GroupDescriptionForm'
import './groupform.css'
import { GroupFormContext } from './GroupFormContext'
import GroupKeywordsForm from './GroupKeywordsForm'
import GroupLocationForm from './GroupLocationForm'
import GroupNameForm from './GroupNameForm'
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
            case 1:
                return <GroupLocationForm />
            case 2:
                return <GroupKeywordsForm />
            case 3:
                return <GroupNameForm />
            case 4:
                return <GroupDescriptionForm />
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