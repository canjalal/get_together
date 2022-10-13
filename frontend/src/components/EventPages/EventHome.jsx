import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import { fetchEvent, getanEvent } from '../../store/events'
import EventNewForm from './EventNewForm'
import EventShow from './EventShow'

const EventHome = () => {

        const { eventId } = useParams();

        const event = useSelector(getanEvent(eventId));

        const dispatch = useDispatch();

        const formatDateString = (fecha) => {
            // let hours = (fecha.getHours() + fecha.getTimezoneOffset()/60 + 24) % 24
            let hours = fecha.getHours();
            return `${fecha.getFullYear()}-${fecha.getMonth() + 1 < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1 }-${fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()}T${hours < 10 ? "0" + hours : hours}:${fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes()}`;
        }

        useEffect(() => {

            dispatch(fetchEvent(eventId));
    
        }, [])
    

  return (
    <>
    <Routes>
        <Route path="/" element={<EventShow event={event} groupId={event ? event.groupId : null} />} />
        <Route path="/group/:groupId/edit" element={<EventNewForm oldEvent={event} />} />
        <Route path="/group/:groupId/copy" element={<EventNewForm oldEvent={{...event, method: "POST", dateTime: formatDateString(new Date())}} />} />
    </Routes>
    </>
  )
}

export default EventHome