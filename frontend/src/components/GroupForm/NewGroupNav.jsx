import React from 'react'
import { Link } from 'react-router-dom'

const NewGroupNav = (props) => {
  return (
    <div className="new-group-nav">
        <div className="left-menu">
            <div className="logo">
                <Link to="/">GetTogether</Link>
            </div>
        </div>
        <div className="right-menu">
            {/* Place holder for component */}
            Save &amp; Exit
        </div>
    </div>
  )
}

export default NewGroupNav