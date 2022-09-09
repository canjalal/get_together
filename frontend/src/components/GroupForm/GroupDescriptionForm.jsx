import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import capitalize from '../../utils/capitalize';
import { GroupFormContext } from './GroupFormContext';
import { renderDescriptionError } from './validations';

const GroupDescriptionForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);

    const [description, setDescription] = useState('');

    const handleDescriptionChange = (e) => {

        let isErrors = !!renderDescriptionError(e.target.value);
        setFormData({
            ...formData, description: e.target.value
        });

        let desc = document.querySelector("#grp-description");
        console.log(desc);
        desc.style.outline = `2px solid ${isErrors ? "red" : "teal"}`;      
        setDescription(e.target.value);
        setPageisDone(!isErrors);
    }

    window.formData = formData;

    useEffect(() => {
        console.log(formData);  
        // let locationField = document.getElementById("location-field");
        // let locForm = document.getElementById("loc-form");

        setPageisDone(false); 
        // locForm.style.display = 'none';
        // locationField.style.display = 'block';

    }, []);

    // const toggleLocForm = (e) => {
    //     let locationField = document.getElementById("location-field");
    //     let locForm = document.getElementById("loc-form");

    //     locForm.style.display = locForm.style.display === 'block' ? 'none' : 'block';
    //     locationField.style.display = locationField.style.display === 'block' ? 'none' : 'block';
    // }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

  return (
    <div className="group-form-body">
        <h1>Now describe what {formData.name} will be about</h1>
        <p>People will see this when we promote your group, but you’ll be able to add to it later, too.
        </p>
        <ul>
            <li>
            What's the purpose of the group?
            </li>
            <li>
            Who should join?
            </li>
            <li>
            What will you do at your events?
            </li>
        </ul>

            <form id="description-form" onSubmit={handleSubmit}>
                <textarea id="grp-description" value={description} onChange={handleDescriptionChange} />
                <p id="description-caption" className="capt"></p>
            </form>

    </div>
  )
}

export default GroupDescriptionForm;