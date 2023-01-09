import React from 'react'

export const EventFormLocale = ({isOnline, setIsOnline, venue, setVenue}) => {
  return (
    <>
        <label>
        Location
        <br />
        <input type="checkbox" id="is-online-checkbox" value={isOnline} onChange={(e) => setIsOnline(e.target.checked ? true : false)} /> Make this an online event
    </label>
    <label>
        Add venue
        <input type="text" className="high-inputs" placeholder="Add a location" value={venue} onChange={(e) => setVenue(e.target.value)} />
    </label>
    </>
  )
}
