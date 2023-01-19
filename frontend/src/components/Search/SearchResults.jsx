import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSearchedEventData, getSearchedGroupData } from '../../store/session';
import EventPanel from '../EventPages/';
import GroupPanel from '../GroupPanel/'
import NoResults from './NoResults';

const SearchResults = () => {

    const dispatch = useDispatch();

    const searchedGroups = useSelector(getSearchedGroupData)

    const searchedEvents = useSelector(getSearchedEventData);

    const [displayGrps, setDisplayGrps] = useState(false);
    const [displayEvents, setDisplayEvents] = useState(true);

    const toggleHeader = (header) => {
        setDisplayEvents(header === "events")
        setDisplayGrps(header === "groups")
    }

    if(!searchedGroups || !searchedEvents) return null;

  return (
    <div className="search-results">
        <div id="search-heading">
            <span className={`search-header ${displayEvents ? 'selected-header' : 'unselected-header'}`} onClick={() => toggleHeader("events")}>
                Events
            </span>
            <span className={`search-header ${displayGrps ? 'selected-header' : 'unselected-header'}`} onClick={() => toggleHeader("groups")}>
                Groups
            </span>
        </div>

        {displayGrps && <div id="group-results">

            {searchedGroups.length > 0 ?
                searchedGroups.map((grp) => <GroupPanel group={grp} key={grp.id} /> ) :
                <NoResults type="group" />
            }
        </div>}

        {displayEvents && <div id="event-results">
            
            {searchedEvents.length > 0 ?
                searchedEvents.map((ev) => <Link to={`/events/${ev.id}`} key={ev.id}><EventPanel data={ev} /> </Link>) :
                <NoResults type="event" />
            }
        </div>}


    </div>
  )
}


export default SearchResults