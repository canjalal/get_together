import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchWeeksEvents } from '../../store/events';
import { getSearchedEventData } from '../../store/session';
import EventPanel from '../EventPages/eventpanel';

const EventCalendar = ({startDate}) => {

    const dispatch = useDispatch();

    const searchedEvents = useSelector(getSearchedEventData);

    useEffect(() => {
        if(startDate) dispatch(fetchWeeksEvents(startDate));

    }, [startDate])

    window.searchedEvents = searchedEvents;

    if(!startDate) return null;

  return (
    <div className="event-results">
    <h1>Events</h1>
    
    {searchedEvents.length > 0 ?
        searchedEvents.map((ev) => <Link to={`/events/${ev.id}`} key={ev.id}><EventPanel data={ev} /> </Link>) :
        <h1>No events found</h1>
    }
</div>
  )
}

export default EventCalendar