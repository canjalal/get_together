import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { BiTimeFive } from 'react-icons/bi';
import { GrVideo } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, fetchEvent, getanEvent, removeEvent } from '../../store/events';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session'
import { getUser } from '../../store/users';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';
import UserIcon from '../GroupPages/UserIcon';
import DeleteEventForm from './DeleteEventForm';

const EventShow = ({event}) => {

    const sessionUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const { eventId } = useParams();

    const [showMenu, setShowMenu] = useState(false);
    const [deleteEventModal, setDeleteEventModal] = useState(false);

    const navigate = useNavigate();

    // const event = useSelector(getanEvent(eventId));

    const group = useSelector(getGroup(event ? event.groupId : null));


    window.group = group
    
    const owner = useSelector(getUser(group ? group.ownerId : null));

    function getDateAndTimeString(fecha) {
        return `${fecha.toDateString()} at ${fecha.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }

    let endDate;
    // useEffect(() => {

    //     dispatch(fetchEvent(eventId));
    //     // dispatch(fetchGroup(event.groupId));

    // }, [])
    // console.log(event);

    const deleteThisEvent = () => {
        setShowMenu(false);
        setDeleteEventModal(true);
    }


    useEffect(() => {
        // dispatch(fetchEvent(eventId));
        if(event) {
            dispatch(fetchGroup(event.groupId));
        }

    }, [event])

    useEffect(()=> {
        let od = document.querySelector('.organizer-dropdown');
        if(showMenu) {
            od.style.display = "flex";
        } else {
            if(od) od.style.display = "none";
        }
    }, [showMenu]);

    const cancelModal = (e) => {
        if(!document.querySelector('.organizer-dropdown')?.contains(e.target)) {
            setShowMenu(false);
        } else {

            if(document.querySelector('#edit-event-link')?.contains(e.target)) navigate(`group/${group.id}/edit`);
            if(document.querySelector('#copy-event-link')?.contains(e.target)) navigate(`group/${group.id}/copy`);
            if(document.querySelector('#delete-event-link')?.contains(e.target)) deleteThisEvent();
        }
      }
    
      useEffect(()=> {
       if(group) {
        window.addEventListener('click', cancelModal);
       }
        return () => {
            if(group) window.removeEventListener('click', cancelModal);
        }
      }, [group])

    if(!event || !owner) return null;

  return (
    <div>
        <div className="event-show-header">
            <p>{getDateAndTimeString(new Date(event.dateTime))}</p>
            <h1>{event.title}</h1>
            <div className="organizer-tag">
                <div className="user-symbol">
                    <FaUserCircle />
                </div>

                <div className="host-caption-container">
                    <p>Hosted by</p>
                    <p className="host-caption">
                        {owner.name}
                    </p>
                </div>
                {owner.id === sessionUser.id && <p><Link to={`group/${group.id}/edit`} id="edit-event-button" className="small-button">Edit Page</Link></p>}
            </div>
        </div>
        <div className="event-show-body">
        <div className="event-show-right">
                <GroupLargeIcon group={group} />
                <div className="event-info-container">
                    <div className="event-info-section">
                        <div className="event-icons">
<BiTimeFive />
                        </div>
                        <div className="event-info">
                        {getDateAndTimeString(new Date(event.dateTime))} to 
                    {' ' + getDateAndTimeString(new Date(new Date(event.dateTime).getTime() + event.duration * 60 * 1000))}
                        </div>
                    </div>
                    <div className="event-info-section">
                        <div className="event-icons">
                        { event.online === "no" ? <IoLocationOutline /> : <GrVideo /> }
                        </div>
                        <div className="event-info">
                        {event.online === "no" ? event.venue : "Online event"}
                        </div>
                    </div>

                </div>
            </div>
            <div className="event-show-left">
                {owner.id === sessionUser.id && <><div className="organizer-tools" onClick={(e)=> { setShowMenu((prev) => !prev);
    e.stopPropagation();}}>Organizer tools { }
    { showMenu ? <IoChevronUp /> : <IoChevronDown />}
    </div>
        {/* placeholder for dropdown menu with logout */}
    <div className="organizer-dropdown">
        <div>
            <ul>
                <li id="edit-event-link"><AiOutlineEdit />  <span className="dropdown-text">Edit event</span></li>
                <li id="copy-event-link"><BiCopy />  <span className="dropdown-text">Copy event</span></li>
                <li id="delete-event-link"><AiOutlineDelete />  <span className="dropdown-text">Delete event</span></li>
            </ul>
        </div>
    </div></> }
                <h1>Details</h1>
                <p>{event.description}</p>

            </div>

        </div>
        <div className="bottom-event-bar">
            <div className="bottom-event-left">
                <div className="bottom-event-date">
                {getDateAndTimeString(new Date(event.dateTime))} 
                </div>
                <div className="bottom-event-title">
                  {event.title}  
                </div>
            </div>
            <div className="bottom-event-right">
            </div>

        </div>
        {deleteEventModal && <DeleteEventForm setDeleteEventModal={setDeleteEventModal} groupId={event.groupId} eventId={event.id} />}
        {/* <p><Link to={`/groups/${group.id}`} className="green-link">{group.name}</Link></p> */}
    </div>
  )
}

export default EventShow