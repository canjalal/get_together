import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import capitalize from '../../../utils/capitalize';
import { GroupFormContext } from '../GroupFormContext';
import { renderGrpNameError } from '../validations';

const GroupNameForm = () => {

    const {formData, setFormData, setPageisDone } = useContext(GroupFormContext);

    const keywordList = useSelector(state => state.keywords);

    const [grpName, setGrpName] = useState(formData.name ||
        `${formData.location.match(/^(.*),/) ? formData.location.match(/^(.*),/)[1] : formData.location } ${capitalize(keywordList[formData.keywordIds[0]].keyword)} Group`);

    const [charsLeft, setCharsLeft] = useState(60 - grpName.length);

    const handleNameChange = (e) => {
        setFormData({
            ...formData, name: e.target.value
        });


        const isErrors = !!renderGrpNameError(e.target.value)

        setGrpName(e.target.value);
        setCharsLeft(60 - e.target.value.length);
        setPageisDone(!isErrors);
        let grpName = document.querySelector("#grpName");
        // console.log(desc);
        grpName.style.outline = `1px solid ${isErrors ? "red" : "teal"}`;   
    }


    useEffect(() => {

        setFormData({
            ...formData, name: grpName
        });

        setPageisDone(true); // default location of SF is fine

    }, []);


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