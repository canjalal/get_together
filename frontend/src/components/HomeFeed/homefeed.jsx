import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGroups, getGroup } from '../../store/groups';
import { getCurrentUser, getGroupData } from '../../store/session';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';

const HomeFeed = () => {

    const currentUser = useSelector(getCurrentUser);

    const navigate = useNavigate();

    const dispatch = useDispatch();

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
        
        {joinedGroups.length > 0 && <>
            <h1>Groups you are a member of</h1>
            <div className="member-of-groups">
                
                { joinedGroups.map((gid) => <GroupLargeIcon group={groups[gid]} key={gid} /> )}
            </div>        
        </>}

        <h1>Other groups</h1>
        <div className="other-groups">
            
            { otherGroups.map((gid) => <GroupLargeIcon group={groups[gid]} key={gid} /> )}
        </div>
    </div>
    )
}

export default HomeFeed;