import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GroupFormContext } from './GroupFormContext'

const NewGroupNav = (props) => {

    const { pageNum } = useContext(GroupFormContext);
  return (
    <div className="new-group-nav">
        <div className="left-menu">
            <div className="logo">
                <Link to="/">GetTogether</Link>
            </div>
        </div>
        <div className="right-menu">
            {/* Place holder for component */}
        Exit
        </div>
    </div>
  )
}

export default NewGroupNav