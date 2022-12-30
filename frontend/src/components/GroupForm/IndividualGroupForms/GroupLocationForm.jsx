import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react';
import { GroupFormContext } from '../GroupFormContext';

const GroupLocationForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);

    const [grpLoc, setGrpLoc] = useState(formData.location || "San Francisco, CA");

    const locFormRef = useRef(null);
    const locFieldRef = useRef(null);
    const [displayLocForm, setDisplayLocForm] = useState(false);
    const [displayLocField, setDisplayLocField] = useState(true);

    const handleLocChange = (e) => {
        setFormData({
            ...formData, location: e.target.value
        });

        setGrpLoc(e.target.value);

        setPageisDone(!!e.target.value.length);
    }


    useEffect(() => {

        setPageisDone(true); // default location of SF is fine
        setDisplayLocForm(false);
        setDisplayLocField(true);

        setFormData({
            ...formData, location: grpLoc
        });

    }, []);

    const toggleLocForm = (e) => {
        setDisplayLocForm(!displayLocForm);
        setDisplayLocField(!displayLocField);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(pageisDone) toggleLocForm(e);
    }

  return (
    <div className="group-form-body">
        <h1>First, set your group's location</h1>
        <p>Meetup groups meet locally, in person and online.
            We'll connect you with people in your area, and more can join you online.</p>
            {displayLocField && <div id="location-field" ref={locFieldRef}>{grpLoc} <a id="loc-change" className="green-link" onClick={toggleLocForm}>Change location</a></div>}
           {displayLocForm && <form id="loc-form" onSubmit={handleSubmit} ref={locFormRef}>
                <input type="text" value={grpLoc} onChange={handleLocChange} />
            </form>}

    </div>
  )
}

export default GroupLocationForm