import React, { useContext, useEffect } from 'react'
import { GroupFormContext } from './GroupFormContext';

const GroupGuidelinesForm = () => {

    const {formData, setPageisDone } = useContext(GroupFormContext);


    window.formData = formData;

    useEffect(() => {
        setPageisDone(true); 
    }, []);

  return (
    <div className="group-form-body">
        <h1>Almost done! Just take a minute to review our guidelines.</h1>
        <p>Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:</p>
        <ul>
            <li>
            Provide growth opportunities for members
            </li>
            <li>
            Encourage real human interactions in person or online
            </li>
            <li>
            Have a host present at all events
            </li>
            <li>
            Be transparent about the group's intentions
            </li>
            <li>
            You can read more about all of this in our community guidelines.
            </li>
        </ul>
        <p>
    Once you submit your group, a human at Meetup will review it based on these guidelines and make sure it gets promoted to the right people.
        </p>

    </div>
  )
}

export default GroupGuidelinesForm;