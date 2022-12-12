import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const GroupEditHeader = ({group, groupId}) => {
  return (
    <div id="group-edit-header">
        <div id="mini-grp-image" style={{backgroundImage: `url(${group.photoURL || 'https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/group_fallback_large.png'})`}}>
        </div>
        <div>
            <Link to={`../groups/${groupId}`} className="green-link">
            <AiOutlineArrowLeft /> Back to group page</Link>
        <h1 className="mid-title">{group.name}</h1>
        </div>
    </div>
  )
}
