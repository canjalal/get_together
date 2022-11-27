import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import BottomBar from './BottomBar'
import GroupDescriptionForm from './GroupDescriptionForm'
import './groupform.css'
import { GroupFormContext } from './GroupFormContext'
import GroupGuidelinesForm from './GroupGuideLines'
import GroupKeywordsForm from './GroupKeywordsForm'
import GroupLocationForm from './GroupLocationForm'
import GroupNameForm from './GroupNameForm'
import NewGroupNav from './NewGroupNav'

const GroupFormIntro = (props) => {

    const [displayNewGrp, setDisplayNewGrp] = useState(false);

    const { pageNum } = useContext(GroupFormContext);

    const completed = useRef(null);
    const uncompleted = useRef(null);

    useEffect(() => {
        console.log(completed);
        if(completed.current) completed.current.style.width = `${pageNum * 100 / 5}%`;
        if(uncompleted.current) uncompleted.current.style.width = `${(5 - pageNum) * 100 / 5}%`;
    }, [pageNum]);
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
                 return <GroupGuidelinesForm />
        }
    }

  return (
    <>
        <div className="group-intro">
        <p className="pre-heading">
            BECOME AN ORGANIZER
        </p>
        <h1 className="first-step">We'll walk you through a few steps to build your local community</h1>
        <button className="standard-button" onClick={(e) => setDisplayNewGrp(true)}>Get started</button>

    </div>
    {displayNewGrp && <div id="new-group">
        <NewGroupNav />
        <div id="progress-bar">
            <div id="completed-progress" ref={completed}></div>
            <div id="uncompleted-progress" ref={uncompleted}></div>
        </div>
        <div className="verbal-progress">
            STEP {pageNum} OF 5 
        </div>
            {
                pickElement(pageNum)
            }
        <BottomBar />
    </div>}
    </>

  )
}

export default GroupFormIntro