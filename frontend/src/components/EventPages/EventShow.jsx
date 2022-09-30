import React from 'react'
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { BiTimeFive } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchEvent, getanEvent } from '../../store/events';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session'
import { getUser } from '../../store/users';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';
import UserIcon from '../GroupPages/UserIcon';

const EventShow = ({event}) => {

    const sessionUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const { eventId } = useParams();

    // const event = useSelector(getanEvent(eventId));

    const group = useSelector(getGroup(event ? event.groupId : null));

    const owner = useSelector(getUser(group ? group.ownerId : null));

    function getDateAndTimeString(fecha) {
        return `${fecha.toDateString()} at ${fecha.toLocaleTimeString()}`
    }

    let endDate;
    // useEffect(() => {

    //     dispatch(fetchEvent(eventId));
    //     // dispatch(fetchGroup(event.groupId));

    // }, [])
    // console.log(event);
    useEffect(() => {
        // dispatch(fetchEvent(eventId));
        if(event) {
            dispatch(fetchGroup(event.groupId));
        }

    }, [event])

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
            <div className="event-show-left">
                <h1>Details</h1>
                <p>{event.description}</p>

            </div>
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
                        <IoLocationOutline />
                        </div>
                        <div className="event-info">
                        {event.online === "no" ? event.venue : "ONLINE"}
                        </div>
                    </div>

                </div>
            </div>

        </div>
        {/* <p><Link to={`/groups/${group.id}`} className="green-link">{group.name}</Link></p> */}
    </div>
  )
}

export default EventShow