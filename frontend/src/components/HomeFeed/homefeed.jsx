import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGroups, getGroup } from '../../store/groups';
import { getCurrentUser, getGroupData } from '../../store/session';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventCalendar from './EventCalendar';

const HomeFeed = () => {

    const currentUser = useSelector(getCurrentUser);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [fecha, setFecha] = useState(new Date());

    const groups = useSelector((state) => state.groups);

    const { joinedGroups, ownedGroups, otherGroups } = useSelector(getGroupData);

    window.groups = groups;
    window.joinedGroups = joinedGroups;
    window.ownedGroups = ownedGroups;
    window.otherGroups = otherGroups;


    useEffect(() => {
        if (!currentUser) navigate("/");

        const { data } = dispatch(fetchGroups());

    }, [])
  return (
    <div className="home-feed">
        <h1 className="big-title">{currentUser && currentUser.name}</h1>
        {ownedGroups.length > 0 && <>
            <h1>Groups you organize:</h1>
        {/* <div className="organizer-of-groups"> */}
            
            <div className="organized-groups">
                { ownedGroups.map((gid) => <GroupLargeIcon group={groups[gid]} key={gid} /> )}
            </div>

        {/* </div> */}
        
        </>}

        <div className="event-calendar">
            <Calendar onChange={setFecha} value={fecha} />
            <EventCalendar startDate={fecha} />
        </div>

        
        {joinedGroups.length > 0 && <>
            <h1>Groups you are a member of</h1>
            <div className="member-of-groups">
                
                { joinedGroups.map((gid) => <GroupLargeIcon group={groups[gid]} key={gid} /> )}
            </div>        
        </>}

        <h1>{(ownedGroups.length === 0 && joinedGroups.length === 0 ) ? "All" : "Other" } groups</h1>
        <div className="other-groups">
            
            { otherGroups.map((gid) => <GroupLargeIcon group={groups[gid]} key={gid} /> )}
        </div>
    </div>
    )
}

export default HomeFeed;