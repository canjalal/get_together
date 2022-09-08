import React, { useContext, useEffect, useState } from 'react'
import { GroupFormContext } from './GroupFormContext';

const GroupKeywordsForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);


    useEffect(() => {




    }, []);



    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if(pageisDone) toggleLocForm(e);
    // }

  return (
    <div className="group-form-body">
        <h1>Choose a few topics that describe your group's interests</h1>
        <p>Be specific! This will help us promote your group to the right people. You can choose up to 15 topics.</p>
            {/* <div id="location-field">{grpLoc} <a id="loc-change" className="green-link" onClick={toggleLocForm}>Change location</a></div>
            <form id="loc-form" onSubmit={handleSubmit}>
                <input type="text" value={grpLoc} onChange={handleLocChange} />
            </form> */}

    </div>
  )
}

export default GroupKeywordsForm