import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchWeeksEvents } from '../../store/events';
import { getSearchedEventData } from '../../store/session';
import EventPanel from '../EventPages/';

const EventCalendar = ({startDate}) => {

    const dispatch = useDispatch();

    const searchedEvents = useSelector(getSearchedEventData);

    useEffect(() => {
        if(startDate) dispatch(fetchWeeksEvents(startDate));

    }, [startDate])

    if(!startDate) return null;

  return (
    <ul className="event-results">
    
    {searchedEvents.length > 0 ?
        searchedEvents.map((ev) => <li key={ev.id}>
                                    <Link to={`/events/${ev.id}`} >
                                        <EventPanel data={ev} />
                                    </Link>
                                </li>) :
        <h2 className="font-title">No events found</h2>
    }
</ul>
  )
}

export default EventCalendar
