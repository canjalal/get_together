import React, { useEffect, useRef, useState } from 'react'
import { renderError } from '../../../utils/renderError';
import { validateDescription } from '../validations';

const GroupDescriptionForm = (props) => {

    const {formData, setFormData, setPageisDone, pageisDone } = props;

    const [description, setDescription] = useState(formData.description || '');

    const [descriptionError, setDescriptionError] = useState("");
    const [descriptionStyle, setDescriptionStyle] = useState({});

    const handleDescriptionChange = (e) => {

        const isErrors = renderError(e.target.value, validateDescription, setDescriptionError);
        setFormData({
            ...formData, description: e.target.value
        });

        setDescriptionStyle(isErrors ? descriptionStyle : 'valid-border');

        setDescription(e.target.value);
        setPageisDone(!isErrors);
    }

    const handleBlur = (e) => {
        setDescriptionStyle(pageisDone ? 'valid-border' : 'invalid-border');
    }

    useEffect(() => {


        setPageisDone(!renderError(description, validateDescription, setDescriptionError)); 


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

    }

  return (
    <div className="group-form-body">
        <h1>Now describe what the {formData.name} will be about</h1>
        <p>People will see this when we promote your group, but you’ll be able to add to it later, too.
        </p>
        <ol>
            <li>
            What's the purpose of the group?
            </li>
            <li>
            Who should join?
            </li>
            <li>
            What will you do at your events?
            </li>
        </ol>

            <form id="description-form" onSubmit={handleSubmit}>
                <textarea id="grp-description" value={description} className={descriptionStyle}  onChange={handleDescriptionChange} onBlur={handleBlur}/>
                <p id="description-caption" className={`capt ${descriptionError ? 'invalid' : ''}`}>{descriptionError}</p>
            </form>

    </div>
  )
}

export default GroupDescriptionForm;