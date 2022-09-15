import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import { getanEvent } from '../../store/events'
import EventNewForm from './EventNewForm'
import EventShow from './EventShow'

const EventHome = () => {

        const { eventId } = useParams();

        const location = useLocation();

        const event = useSelector(getanEvent(eventId));

  return (
    <>
    <Routes>
        <Route path="/" element={<EventShow event={event} />} />
        <Route path="/edit" element={<EventNewForm oldEvent={event} />} />
    </Routes>
    </>
  )
}

export default EventHome