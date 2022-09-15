import React from 'react'

const EventPanel = ({ data }) => {
  return (
    <div className="event-panel">
        <p className="sub-labels green-text">{new Date(data.dateTime).toLocaleString()}</p>
        <h2>{data.title}</h2>
        <div>{data.venue}</div>
        <div className="sub-labels">{data.description}</div>
    </div>
  )
}

export default EventPanel;