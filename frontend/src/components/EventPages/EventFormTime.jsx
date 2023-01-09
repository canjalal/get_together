import React from 'react'

export const EventFormTime = ({dateTime, setDateTime, duration, setDuration}) => {
  return (
    <>
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
    </>
  )
}