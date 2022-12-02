import React, { useContext, useEffect, useRef, useState } from 'react'
import { GroupFormContext } from './GroupFormContext';
import { renderDescriptionError } from './validations';

const GroupDescriptionForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);

    const [description, setDescription] = useState(formData.description || '');

    const groupDescriptionEle = useRef(null);

    const handleDescriptionChange = (e) => {

        const isErrors = !!renderDescriptionError(e.target.value);
        setFormData({
            ...formData, description: e.target.value
        });

        if(!isErrors) {
            groupDescriptionEle.current.classList.add('valid-border');
            groupDescriptionEle.current.classList.remove('invalid-border');
        }      
        setDescription(e.target.value);
        setPageisDone(!isErrors);
    }

    const handleBlur = (e) => {
        if(!pageisDone) {
            e.target.classList.add('invalid-border');
            e.target.classList.remove('valid-border');
        } else {
            e.target.classList.remove('invalid-border');
            e.target.classList.add('valid-border');
        }
    }

    useEffect(() => {


        setPageisDone(!renderDescriptionError(description)); 


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
                <textarea id="grp-description" value={description} ref={groupDescriptionEle} onChange={handleDescriptionChange} onBlur={handleBlur}/>
                <p id="description-caption" className="capt"></p>
            </form>

    </div>
  )
}

export default GroupDescriptionForm;