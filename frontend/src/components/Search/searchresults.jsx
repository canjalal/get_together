import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroups } from '../../store/groups';
import { getSearchedEventData, getSearchedGroupData } from '../../store/session';
import EventPanel from '../EventPages/eventpanel';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';

const SearchResults = () => {

    const dispatch = useDispatch();

    const searchedGroups = useSelector(getSearchedGroupData)

    const searchedEvents = useSelector(getSearchedEventData);

    window.searchedGroups = searchedGroups;
    window.searchedEvents = searchedEvents;



    // useEffect(() => {
    //     console.log(searchedGroups);
    // }, [])

    if(!searchedGroups || !searchedEvents) return null;

  return (
    <div>
        <h1>Search Results</h1>
        <div className="group-results">
        <h1>Groups</h1>

            {searchedGroups.length > 0 ?
                searchedGroups.map((grp) => <GroupLargeIcon group={grp} key={grp.id} /> ) :
                <h1>No groups found</h1>
            }
        </div>

        <div className="event-results">
            <h1>Events</h1>
            
            {searchedEvents.length > 0 ?
                searchedEvents.map((ev) => <Link to={`/events/${ev.id}`}><EventPanel data={ev} key={ev.id} /> </Link>) :
                <h1>No events found</h1>
            }
        </div>


    </div>
  )
}

export default SearchResults