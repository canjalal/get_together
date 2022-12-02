import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useOutsideClickDetected from '../UseOutsideClickDetected';


const EditEventDropDown = ({setShowMenu, groupId, setDeleteEventModal}) => {

    const organizerdd = useRef(null);

    const cancelModal = useOutsideClickDetected(organizerdd);

    const navigate = useNavigate();

    const deleteThisEvent = () => {
        setDeleteEventModal(true);
    }

    useEffect(() => {
        setShowMenu(!cancelModal);

    }, [cancelModal])

  return (
    <>
    <div className="organizer-dropdown" ref={organizerdd}> {/* Make this its own component, control its own state, useNavigate */}
        <div>
            <ul>
                <li id="edit-event-link" onClick={() => navigate(`group/${groupId}/edit`)}><AiOutlineEdit />  <span className="dropdown-text">Edit event</span></li>
                <li id="copy-event-link" onClick={() => navigate(`group/${groupId}/copy`)}><BiCopy />  <span className="dropdown-text">Copy event</span></li>
                <li id="delete-event-link" onClick={deleteThisEvent}><AiOutlineDelete />  <span className="dropdown-text">Delete event</span></li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default EditEventDropDown