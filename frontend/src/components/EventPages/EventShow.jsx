import React from 'react'
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
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

    // useEffect(() => {

    //     dispatch(fetchEvent(eventId));
    //     // dispatch(fetchGroup(event.groupId));

    // }, [])
    // console.log(event);

    useEffect(() => {

        // dispatch(fetchEvent(eventId));
        if(event) dispatch(fetchGroup(event.groupId));

    }, [event])

    if(!event || !owner) return null;

  return (
    <div>
        <div className="event-show-header">
            <p>{new Date(event.dateTime).toDateString()} {new Date(event.dateTime).toLocaleTimeString()}</p>
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
</div>

        </div>



        
        {/* <p><Link to={`/groups/${group.id}`} className="green-link">{group.name}</Link></p> */}
    </div>
  )
}

export default EventShow