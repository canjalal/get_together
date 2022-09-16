import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, patchEvent } from '../../store/events';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session'
import { getUser } from '../../store/users';
import './eventform.css';

const EventNewForm = ({oldEvent}) => {

    const formatDateString = (fecha) => {
        // let hours = (fecha.getHours() + fecha.getTimezoneOffset()/60 + 24) % 24
        let hours = fecha.getHours();
        return `${fecha.getFullYear()}-${fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1 }-${fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()}T${hours < 10 ? "0" + hours : hours}:${fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes()}`;
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

    console.log(oldEvent.dateTime);

    const sessionUser = useSelector(getCurrentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { groupId } = useParams();
    const group = useSelector(getGroup(groupId));
    const owner = useSelector(getUser(group ? group.ownerId : null));

    const [errors, setErrors] = useState([]);

    const isOwner = (sessionUser && owner) && sessionUser.id === owner.id

    const [title, setTitle] = useState(oldEvent.title);
    const [dateTime, setDateTime] = useState(formatDateString(new Date(oldEvent.dateTime)));
    // cutt of last 8 characters of date string

    const [duration, setDuration] = useState(oldEvent.duration);

    const [description, setDescription] = useState(oldEvent.description);

    const [isOnline, setIsOnline] = useState(oldEvent.online === "yes");

    const [venue, setVenue] = useState(oldEvent.venue);


    window.group = group;
    window.owner = owner;
    window.groupId = groupId;

    window.dateTime = dateTime;

    window.isOnline = isOnline;

    window.formatDateString = formatDateString;

    const submitEvent = async (e) => {
        e.preventDefault();

        setErrors([]);

        let saveDate = new Date(dateTime);
        // saveDate.setTime(saveDate.getTime() + saveDate.getTimezoneOffset()*60*1000);

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
                <label>
                    Date and time
                    <input type="datetime-local" className="high-inputs" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
                </label>
                <label>
                    Duration
                    <select value={duration} className="high-inputs" onChange={(e)=> setDuration(e.target.value)}>
                        <option value="30">0.5 hours</option>
                        <option value="60">1 hour</option>
                        <option value="90">1.5 hours</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                    </select>
                </label>
                <label>
                    Description
                    <p className="sub-labels">Let your attendees know what to expect, including the agenda, what they need to bring, and how to find the group.</p>
                    <textarea value={description} onChange={(e)=> setDescription(e.target.value)} />
                </label>
                <label>
                    Location
                    <br />
                    <input type="checkbox" id="is-online-checkbox" value={isOnline} onChange={(e) => setIsOnline(e.target.checked ? true : false)} /> Make this an online event

                </label>
                <label>
                    Add venue
                    <input type="text" className="high-inputs" placeholder="Add a location" value={venue} onChange={(e) => setVenue(e.target.value)} />
                </label>
            </div>
            <div id="event-submit-bar">
                <div>
                    <button className="back-button" onClick={() => navigate(`/groups/${groupId}`)}>Cancel</button>
                </div>
                <div>
                    <button className="standard-button" id="next-button" onClick={(e) => submitEvent(e).catch(
                    async (res) => { // not correctly catching error 422, re-renders a blank page (not what we want)
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
                )}>{oldEvent.method ? "Publish" : "Save Changes"}</button>
                {errors.length > 0 && <ul>
                <li>Errors:</li>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
                }
                </div>
            </div>
        </form>
    </div>
  )
}

export default EventNewForm