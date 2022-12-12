import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getGroupKeywords } from '../../store/groupkeywords';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import './showpage.css';
import { getUser, getUsersfromGrp, sustainCurrentUser } from '../../store/users';
import { getMemberStatus, joinGroup, leaveGroup } from '../../store/memberships';
import { getEventsfromGrp } from '../../store/events';
import UserIcon from './UserIcon';
import { GroupInfoPanel } from './GroupInfoPanel';
import { GroupCoverPhoto } from './GroupCoverPhoto';
import { GroupDescriptionandKeywords } from './GroupDescriptionandKeywords';
import { GroupEvents } from './GroupEvents';

const GroupShow = (props) => {

    const { groupId } = useParams();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const group = useSelector(getGroup(groupId));

    const groupKeywords = useSelector(getGroupKeywords(groupId));

    const sessionUser = useSelector(getCurrentUser);

    const keywordList = useSelector(state => state.keywords);

    const users = useSelector(getUsersfromGrp(groupId));
    
    const events = useSelector(getEventsfromGrp(groupId));

    const owner = useSelector(getUser(group ? group.ownerId : null))

    const isOwner = (sessionUser && owner) && sessionUser.id === owner.id;

    const isMember = useSelector(getMemberStatus(sessionUser ? sessionUser.id : null, groupId));


    useEffect(() => {
        dispatch(fetchGroup(groupId)).then(()=> {}, async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          }
        );
        if(sessionUser) dispatch(sustainCurrentUser(sessionUser));
    }, [groupId])

    const toggleMembership = (e) => {
        e.preventDefault();

        if(isMember) {
            dispatch(leaveGroup(groupId));
            // setIsMember(false);
        } else {
            dispatch(joinGroup(groupId));
            // setIsMember(true);
        }
    }
 
    if(!group || !groupKeywords || !owner) return null;

  return (
    <div className="show-page-flex">
        <div className="show-page-header">
            {/* GroupCoverPhoto = ({group, isOwner, groupId}) => { */}
            <GroupCoverPhoto group={group} isOwner={isOwner} groupId={groupId} />
            <GroupInfoPanel group={group} users={users} owner={owner} isOwner={isOwner} />
        </div>
        <div className="main-content">
            <div className="left-content">
                <div className="group-menu">
                    {/* <span>About</span>
                    <span>Events</span>
                    <span>Members</span> */}
                    <span></span>
                </div>
                <div className="left-main-content">
                    <GroupDescriptionandKeywords group={group} keywordList={keywordList} groupKeywords={groupKeywords} />
                    <GroupEvents events={events} />
                </div>
               
            </div>
            <div className="right-content">
                <div className="group-menu gmr">

                    {sessionUser && sessionUser.id === owner.id && 
                    <>
                    <Link to="events/new" className="small-button" id="create-event">Create Event</Link>
                    <span id="owner-logo">You're the owner</span>
                    </>} {/* If you're the owner, this appears as
                                        "Manage Group" with different options instead */}
                    {sessionUser && sessionUser.id !== owner.id && <>
                        <button className="small-button" style={{visibility: "hidden"}}>Donate</button>
                        <button className="secondary-button" onClick={toggleMembership}>{isMember ? "Leave" : "Join"} Group</button>
                    </>}
                </div>
                <div className="group-members">
                    <h1>Members</h1>
                    <ul className="member-list">
                        <UserIcon name={owner.name} />
                        {users.length > 0 && users.map(user => <UserIcon key={user.id} name={user.name} />)}
                    </ul>
                </div>
                
            </div>
        </div>
     </div>
  )
}

export default GroupShow