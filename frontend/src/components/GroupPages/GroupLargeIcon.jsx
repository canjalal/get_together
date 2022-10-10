import React from 'react'
import { Link } from 'react-router-dom';

import './groupicon.css';
const GroupLargeIcon = ({group}) => {
    
  return (
    <Link to={`/groups/${group.id}`}>
    <li className="group-icon-container">
        <div className="group-icon-cover" style={{backgroundImage: `url(${group.photoURL || 'https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/group_fallback_large.png'})`}}>            
        </div>
        <div className="group-icon-caption">{group.name}</div>
    </li>
    </Link>
  )
}

export default GroupLargeIcon;