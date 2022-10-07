import React from 'react'
import { useEffect } from 'react';
import { GoLocation } from 'react-icons/go'
import { GrVideo } from 'react-icons/gr';

const EventPanel = ({ data }) => {
  return (
    <div className="event-panel">
        <p className="date-label">{new Date(data.dateTime).toDateString()} {new Date(data.dateTime).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})}</p>
        <h2 className="event-panel-title">{data.title}</h2>
        {!!data.groupName && <div className="event-group">{data.groupName}</div> } 
        <div>{data.online === "yes" ? <><GrVideo />{"  Online event" }</> : data.venue ? <><GoLocation />  {data.venue} </> : ""}</div>
        <div className="event-panel-description">{data.description}</div>
        <div className="attendee-count">{data.count} attendee{data.count > 1 ? "s" : ""}</div>
    </div>
  )
}

export default EventPanel;