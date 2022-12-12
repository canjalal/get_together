import React from 'react'

export const EventErrors = ({errors}) => {
  return (
    <ul>
        <li>Errors:</li>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
    </ul>
  )
}
