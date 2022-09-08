import React, { useContext, useEffect, useState } from 'react'
import { GroupFormContext } from './GroupFormContext';

const GroupLocationForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);

    const [grpLoc, setGrpLoc] = useState("San Francisco, CA");

    const handleLocChange = (e) => {
        setFormData({
            formData, location: e.target.value
        });

        setGrpLoc(e.target.value);

        setPageisDone(!!e.target.value.length);
    }

    useEffect(() => {
        let locationField = document.getElementById("location-field");
        let locForm = document.getElementById("loc-form");

        setPageisDone(true); // default location of SF is fine
        locForm.style.display = 'none';
        locationField.style.display = 'block';

    }, []);

    const toggleLocForm = (e) => {
        let locationField = document.getElementById("location-field");
        let locForm = document.getElementById("loc-form");

        locForm.style.display = locForm.style.display === 'block' ? 'none' : 'block';
        locationField.style.display = locationField.style.display === 'block' ? 'none' : 'block';
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
            <div id="location-field">{grpLoc} <a id="loc-change" className="green-link" onClick={toggleLocForm}>Change location</a></div>
            <form id="loc-form" onSubmit={handleSubmit}>
                <input type="text" value={grpLoc} onChange={handleLocChange} />
            </form>

    </div>
  )
}

export default GroupLocationForm