import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, patchEvent } from '../../store/events';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session'
import { getUser } from '../../store/users';
import './eventform.css';
import { EventFormLocale } from './EventFormLocale';
import { EventFormTime } from './EventFormTime';
import { EventSubmitBar } from './EventSubmitBar';

const EventNewForm = ({oldEvent}) => {

    const formatDateString = (dt) => {
        // let hours = (fecha.getHours() + fecha.getTimezoneOffset()/60 + 24) % 24
        let hours = dt.getHours();
        return `${
            dt.getFullYear()
            }-${
                dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1
            }-${
                dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()
            }T${
                hours < 10 ? "0" + hours : hours
            }:${
                dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()
            }`;
    }

    let defaultDate = new Date();

    defaultDate.setDate(defaultDate.getDate() + 5);

    oldEvent ||= {
        title: "",
        dateTime: formatDateString(defaultDate),
        duration: 60,
        description: "",
        online: "no",
        venue: "",
        method: 'POST'
    }

    const sessionUser = useSelector(getCurrentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { groupId } = useParams();
    const group = useSelector(getGroup(groupId));
    const owner = useSelector(getUser(group ? group.ownerId : null));

    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState(oldEvent.title);
    const [dateTime, setDateTime] = useState(formatDateString(new Date(oldEvent.dateTime)));
    
    const [duration, setDuration] = useState(oldEvent.duration);

    const [description, setDescription] = useState(oldEvent.description);

    const [isOnline, setIsOnline] = useState(oldEvent.online === "yes");

    const [venue, setVenue] = useState(oldEvent.venue);

    const submitEvent = async (e) => {
        e.preventDefault();

        setErrors([]);

        let saveDate = new Date(dateTime);
    
        const formData = {
            groupId: groupId,
            title: title,
            dateTime: saveDate,
            duration: duration,
            description: description,
            online: isOnline ? "yes" : "no",
            venue: venue
        }

        if(oldEvent.method) {
            const {response, data} = await dispatch(createEvent(formData));
            navigate(`/events/${data.event.id}`);
        } else {
            formData["id"] = oldEvent.id;
            const {response, data} = await dispatch(patchEvent(formData));
            navigate(`/events/${oldEvent.id}`)
        }
    }

    useEffect(() => {
        dispatch(fetchGroup(groupId)).then(()=> {
        }, async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          }
        );
    }, [groupId])

    useEffect(() => {
        if(group) {
            if(sessionUser.id !== group.ownerId) navigate(`/groups/${groupId}`);
        }

    }, [group])
    
    if(!group) return null;

  return (
    <div>
        <form className="event-form-body">
            <div className="group-form-body">
                <h1>{oldEvent.method ? "Create" : "Edit" } an event</h1>
                <p className="sub-labels">{group.name}</p>
                <label>
                    Title (required)
                    <input type="text" className="high-inputs" value={title} onChange={(e)=> setTitle(e.target.value)} />
                </label>
                <EventFormTime dateTime={dateTime} setDateTime={setDateTime} duration={duration} setDuration={setDuration} />
                <label>
                    Description
                    <p className="sub-labels">Let your attendees know what to expect, including the agenda, what they need to bring, and how to find the group.</p>
                    <textarea value={description} onChange={(e)=> setDescription(e.target.value)} />
                </label>
                <EventFormLocale isOnline={isOnline} setIsOnline={setIsOnline} venue={venue} setVenue={setVenue} />
            </div>
            <EventSubmitBar submitEvent={submitEvent} groupId={groupId} oldEvent={oldEvent} />
        </form>
    </div>
  )
}

export default EventNewForm