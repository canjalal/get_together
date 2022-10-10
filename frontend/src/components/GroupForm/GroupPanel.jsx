import React from 'react'
import { Link } from 'react-router-dom';
import './grouppanel.css';

const GroupPanel = ({group}) => {

    const bkgdImage = {
        backgroundImage: `url(${group.photoURL || 'https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/group_fallback_large.png'})`
                        }
  return (
    <Link to={`/groups/${group.id}`} >
    <div className="group-panel-container">
        <div className="group-icon" style={bkgdImage}>
        </div>
        <div className="group-panel">
            <h2 className="group-panel-name">{group.name}</h2>
            <div className="group-panel-location">{group.location}</div>
            <div className="event-panel-description">{group.description}</div>
        </div>
    </div>
    </Link>
  )
}

export default GroupPanel;