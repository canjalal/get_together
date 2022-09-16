import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import { fetchEvent, getanEvent } from '../../store/events'
import EventNewForm from './EventNewForm'
import EventShow from './EventShow'

const EventHome = () => {

        const { eventId } = useParams();

        const location = useLocation();

        const event = useSelector(getanEvent(eventId));

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(fetchEvent(eventId));
    
        }, [])
    

  return (
    <>
    <Routes>
        <Route path="/" element={<EventShow event={event} />} />
        <Route path="/group/:groupId/edit" element={<EventNewForm oldEvent={event} />} />
    </Routes>
    </>
  )
}

export default EventHome