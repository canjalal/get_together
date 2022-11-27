import React, {memo} from 'react'
import { FaUserCircle } from 'react-icons/fa';
import './usericon.css';
const UserIcon = ({name}) => {

    name ||= "";
    
  return (
    <li className="user-icon-container">
        <div className="user-icon"><FaUserCircle /></div>
        <div className="user-icon-caption">{name}</div>
    </li>
  )
}

export default memo(UserIcon);