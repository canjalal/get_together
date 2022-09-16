import React from 'react'
import { GoLocation } from 'react-icons/go'

const EventPanel = ({ data }) => {
  return (
    <div className="event-panel">
        <p className="date-label">{new Date(data.dateTime).toDateString()} {new Date(data.dateTime).toLocaleTimeString()}</p>
        <h2 className="event-panel-title">{data.title}</h2>
        <div>{data.venue ? <><GoLocation />  {data.venue} </> : ""}</div>
        <div className="event-panel-description">{data.description}</div>
    </div>
  )
}

export default EventPanel;