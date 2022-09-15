import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchEvent, getanEvent } from '../../store/events';
import { getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session'
import { getUser } from '../../store/users';

const EventShow = ({event}) => {

    const sessionUser = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const { eventId } = useParams();

    // const event = useSelector(getanEvent(eventId));

    const group = useSelector(getGroup(event ? event.groupId : null));

    const owner = useSelector(getUser(group ? group.ownerId : null));

    useEffect(() => {

        dispatch(fetchEvent(eventId));

    }, [])

    if(!event) return null;

  return (
    <div>EventShow
        <h1>{event.title}</h1>
        <p>{event.dateTime}</p>
        <p>{event.description}</p>
        <p><Link to={`group/${group.id}/edit`}>Edit Page</Link></p>
        <p><Link to={`/groups/${group.id}`} className="green-link">{group.name}</Link></p>
    </div>
  )
}

export default EventShow