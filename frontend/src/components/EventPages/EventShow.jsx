import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { BiTimeFive } from 'react-icons/bi';
import { GrVideo } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEvent } from '../../store/events';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session'
import { getUser, getUsersfromEvent } from '../../store/users';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';
import UserIcon from '../GroupPages/UserIcon';
import DeleteEventForm from './DeleteEventForm';
import { changeRSVP, getRSVPStatus, joinEvent } from '../../store/signups';

const EventShow = ({event, groupId}) => {

    const sessionUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const [errors, setErrors] = useState([]);

    const [showMenu, setShowMenu] = useState(false);
    const [deleteEventModal, setDeleteEventModal] = useState(false);

    const navigate = useNavigate();

    // const event = useSelector(getanEvent(eventId))    

    const group = useSelector(getGroup(groupId));


    window.group = group
    
    const owner = useSelector(getUser(group ? group.ownerId : null));
    const isOwner = (sessionUser && owner) && (sessionUser.id === owner.id);

    window.isOwner = isOwner


    let isRSVPed = useSelector(getRSVPStatus(sessionUser ? sessionUser.id : null, eventId));

    function getDateAndTimeString(fecha) {
        return `${fecha.toDateString()} at ${fecha.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}`
    }

    const users = useSelector(getUsersfromEvent(eventId));

    window.users = users;
    // useEffect(() => {

    //     dispatch(fetchEvent(eventId));
    //     // dispatch(fetchGroup(event.groupId));

    // }, [])
    // console.log(event);

    const toggleRSVP = (e) => {
        e.preventDefault();

        dispatch(changeRSVP(eventId));
    }

    const deleteThisEvent = () => {
        setShowMenu(false);
        setDeleteEventModal(true);
    }


    useEffect(() => {


        const fetchGroupandEvent = async (gid, eid) => {
            await dispatch(fetchGroup(gid));

            let eventData = await dispatch(fetchEvent(eid));
        }
        // dispatch(fetchEvent(eventId));
        if(groupId) {
            fetchGroupandEvent(groupId, eventId)
        }

    }, [groupId])

    useEffect(()=> {
        if(group) {
         window.addEventListener('click', cancelModal);
        }
         return () => {
             if(group) window.removeEventListener('click', cancelModal);
         }
       }, [group])
 

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
                {owner.id === sessionUser?.id && <><div className="organizer-tools" onClick={(e)=> { setShowMenu((prev) => !prev);
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

                    <h1>Attendees ({users.length + 1})</h1>
                    <ul className="member-list">
                        <UserIcon name={owner.name} />
                        {users?.length > 0 && users.map((user) => <UserIcon key={user.id} name={user.name} />)}
                    </ul>
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
            { /* only show RSVP info if the event is in the future. If you havne't RSVP'd here's a signup button */ }
            { sessionUser && new Date(event.dateTime) > new Date() && <>{!isRSVPed && !isOwner ? <button className="standard-button" onClick={(e) => dispatch(joinEvent(eventId))}>Attend</button>
                            : <div className="rsvp-info">  {/* Otherwise here's some RSVP options */}
                                <div>You're { isRSVPed === "not" ? "not going" : "going"}! </div>
                                {!isOwner ? <div onClick={toggleRSVP} className="green-link">Change RSVP</div> : <div>You're the host</div>}
                                </div>}</> /* If you're the owner, you're forced to go and can't change your RSVP */
            }
            

        </div>
        {deleteEventModal && <DeleteEventForm setDeleteEventModal={setDeleteEventModal} groupId={event.groupId} eventId={event.id} />}
        {/* <p><Link to={`/groups/${group.id}`} className="green-link">{group.name}</Link></p> */}
    </div>
  )
}

export default EventShow