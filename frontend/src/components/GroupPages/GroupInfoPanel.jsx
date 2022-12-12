import React from 'react'
import { BiUser } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { IoPeopleOutline } from 'react-icons/io5'
import { RiEdit2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const GroupInfoPanel = ({group, users, owner, isOwner}) => {
  return (
    <div id="group-info">
        <h1>{group.name}</h1>
        <ul id="group-info-grid">
            <li><GoLocation />
            </li>
            <li>
                {group.location}
            </li>
            <li>
            <IoPeopleOutline />
            </li>
            <li>
                {users.length + 1} {group.memberLabel || "members"}
            </li>
            <li>
                <BiUser />
            </li>
            <li> Organized by {!!group && owner.name}
            </li>
        </ul>
        {isOwner && <div id="edit-page">
                    <Link to="edit" className="green-link"><RiEdit2Fill /> Edit Group info</Link>
                    </div>}
    </div>
  )
}