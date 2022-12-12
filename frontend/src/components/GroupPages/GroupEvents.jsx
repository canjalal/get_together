import React from 'react'
import { Link } from 'react-router-dom'
import EventPanel from '../EventPages'

export const GroupEvents = ({events}) => {
  return (
    <div className="group-events">
        {events["upcoming"].length > 0 && <>
        <h1>Upcoming Events</h1>
        <ul>
            {events["upcoming"].length > 0 && events["upcoming"].map(ev => <li key={ev.id}><Link to={`../events/${ev.id}`}><EventPanel data={ev} /></Link></li>)}
        </ul>
        </>}

        {events["past"].length > 0 && <>
            <h1>Past Events</h1>
            <ul>
                {events["past"].length > 0 && events["past"].map(ev => <li key={ev.id}><Link to={`../events/${ev.id}`}><EventPanel data={ev} /></Link></li>)}
            </ul>
        </>}
    </div>
  )
}
