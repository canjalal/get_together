import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import capitalize from '../../utils/capitalize';
import { GroupFormContext } from './GroupFormContext';
import { renderGrpNameError } from './validations';

const GroupNameForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);

    const keywordList = useSelector(state => state.keywords);

    const [grpName, setGrpName] = useState(`${formData.location.match(/^(.*),/)[1]} ${capitalize(keywordList[formData.keywords[0]].keyword)} Group`);

    const [charsLeft, setCharsLeft] = useState(60 - grpName.length);

    const handleNameChange = (e) => {
        setFormData({
            ...formData, name: e.target.value
        });

        setGrpName(e.target.value);
        setCharsLeft(60 - e.target.value.length);
        setPageisDone(!renderGrpNameError(e.target.value));
    }

    window.formData = formData;
    window.keywordList = keywordList;

    useEffect(() => {
        console.log(formData);  
        // let locationField = document.getElementById("location-field");
        // let locForm = document.getElementById("loc-form");
        setFormData({
            ...formData, name: grpName
        });

        setPageisDone(true); // default location of SF is fine
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
        <h1>What will your group's name be?</h1>
        <p>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
            <form id="name-form" onSubmit={handleSubmit}>
                <div className="charsLeft-container">
                <input type="text" id="grpName" value={grpName} onChange={handleNameChange} />
                <p className="charsLeft">{charsLeft}</p>
                <p id="grpName-caption" className="capt"></p>
                </div>
            </form>

    </div>
  )
}

export default GroupNameForm;