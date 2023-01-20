import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import BottomBar from './BottomBar'
import GroupDescriptionForm from './IndividualGroupForms/GroupDescriptionForm'
import './groupform.css'
import GroupGuidelinesForm from './IndividualGroupForms/GroupGuideLines'
import GroupKeywordsForm from './IndividualGroupForms/GroupKeywordsForm'
import GroupLocationForm from './IndividualGroupForms/GroupLocationForm'
import GroupNameForm from './IndividualGroupForms/GroupNameForm'
import NewGroupNav from './NewGroupNav'

const GroupFormIntro = (props) => {

    const [displayNewGrp, setDisplayNewGrp] = useState(false);

    const [formData, setFormData] = useState({
        location: "",
        keywordIds: "",
        name: "",
        description: ""
    });

    const [pageNum, setPageNum] = useState(1);

    const [pageisDone, setPageisDone] = useState(false);

// Make a modal that covers entire screen

    const pickElement = (page) => {
        switch(page) {
            case 1:
                return <GroupLocationForm
                        formData={formData} setFormData={setFormData} setPageisDone={setPageisDone} pageisDone={pageisDone} />
            case 2:
                return <GroupKeywordsForm
                    formData={formData} setFormData={setFormData} setPageisDone={setPageisDone} />
            case 3:
                return <GroupNameForm
                    formData={formData} setFormData={setFormData} setPageisDone={setPageisDone} />
            case 4:
                return <GroupDescriptionForm
                    formData={formData} setFormData={setFormData} setPageisDone={setPageisDone} pageisDone={pageisDone} />
            default:
                 return <GroupGuidelinesForm
                    setPageisDone={setPageisDone} />
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
        <div id="progress-bar" style={{gridTemplateColumns: `${pageNum * 20}% ${(5 - pageNum) * 20 }%`}}>
            <div id="completed-progress"></div>
            <div id="uncompleted-progress"></div>
        </div>
        <div className="verbal-progress">
            STEP {pageNum} OF 5 
        </div>
            {
                pickElement(pageNum)
            }
        <BottomBar pageNum={pageNum} setPageNum={setPageNum} pageisDone={pageisDone} formData={formData} setPageisDone={setPageisDone} />
    </div>}
    </>

  )
}

export default GroupFormIntro