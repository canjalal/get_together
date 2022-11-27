import React, { useContext, memo } from 'react'
import { Link } from 'react-router-dom'
import { GroupFormContext } from './GroupFormContext'

const NewGroupNav = (props) => {

    // const { pageNum } = useContext(GroupFormContext);
  return (
    <div className="nav-menu">
        <div className="left-menu">
            <div className="logo">
                <Link to="/">GetTogether</Link>
            </div>
        </div>
        <div className="right-menu">
            {/* Place holder for component */}
            <Link to="/">Exit</Link>
        </div>
    </div>
  )
}

export default memo(NewGroupNav)