import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getGroupKeywords } from '../../store/groupkeywords';
import { fetchGroup, getGroup, getGroupOwner } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import { GoLocation } from 'react-icons/go';
import NotFoundPage from '../NotFoundPage/notfoundpage';
import { IoPeopleOutline } from 'react-icons/io5';
import './showpage.css';
import { BiUser } from 'react-icons/bi';
import { getUser, getUsers, getUsersfromGrp, sustainCurrentUser } from '../../store/users';
import { RiEdit2Fill } from 'react-icons/ri';
import { GrImage } from 'react-icons/gr';
import AttachNewPhoto from './AttachNewPhoto';
import { getMemberStatus, joinGroup, leaveGroup } from '../../store/memberships';
import { getEventsfromGrp } from '../../store/events';
import EventPanel from '../EventPages/eventpanel';
import UserIcon from './UserIcon';

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

    window.group = group;
    window.users = users
    window.sessionUser = sessionUser;
    window.events = events;
    window.owner = owner;

    const [displayPhotoModal, setDisplayPhotoModal] = useState(false);

    let isMember = useSelector(getMemberStatus(sessionUser ? sessionUser.id : null, groupId));


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
 
    if(!group || !groupKeywords || !owner) return <NotFoundPage />;

  return (
    <div className="show-page-flex">
        <div className="show-page-header">
            <div id="group-cover" style={{backgroundImage: `url(${group.photoURL || 'https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/group_fallback_large.png'})`}}>
                {isOwner && <div id="change-photo-button" onClick={(e) => setDisplayPhotoModal(true)}>
                {displayPhotoModal && <AttachNewPhoto setDisplayPhotoModal={setDisplayPhotoModal} groupId={groupId} />}
                <GrImage /> <span>Change photo</span>  
                            </div>}
            </div>
            <div id="group-info">
                <h1>{group.name}</h1>
                <ul>
                    <li id="grp-location-bullet"><GoLocation />
                        {group.location}
                    </li>
                    <li>
                    <IoPeopleOutline /> {users.length + 1} {group.memberLabel || "members"}
                    </li>
                    <li>
                        <BiUser /> Organized by {!!group && owner.name}
                    </li>
                </ul>
                {isOwner && <div id="edit-page">
                <Link to="edit" className="green-link"><RiEdit2Fill /> Edit Group info</Link>
                    </div>}
            </div>
        </div>
        <div className="main-content">
            <div className="left-content">
                <div className="group-menu">
                    <span>About</span>
                    <span>Events</span>
                    <span>Members</span>
                </div>
                <div className="left-main-content">
                    <div className="group-description">
                        <h1>What we're about</h1>
                        {!!group && group.description}
                    </div>
                    <div className="group-keywords">
                        <h1>Related keywords</h1>
                        <ul>
                            {Object.keys(keywordList).length > 0 && Object.values(groupKeywords).map(gk => <li key={gk.id}>{keywordList[gk.keywordId].keyword}</li>)}
                        </ul>
                    </div>
                    <div className="group-events">
                        {events["upcoming"].length > 0 && <>
                        <h1>Upcoming Events</h1>
                        <ul>
                            {events["upcoming"].length > 0 && events["upcoming"].map(ev => <li key={ev.id}><Link to={`../events/${ev.id}`}><EventPanel data={ev} /></Link></li>)}
                        </ul>
                        </>}

                        {events["past"].length > 0 && <>
                            <h1>Past Events</h1>
                            <ul>
                                {events["past"].length > 0 && events["past"].map(ev => <li key={ev.id}><Link to={`../events/${ev.id}`}><EventPanel data={ev} /></Link></li>)}
                            </ul>
                        </>}
                    </div>
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
                        <button className="small-button">Donate</button>
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