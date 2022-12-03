import React, { useEffect, useState } from 'react'
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

    const toggleHeader = (e) => {


        const searchHeaders = document.getElementsByClassName("search-header");

        const clickedHeader = e.target === searchHeaders[0] ? searchHeaders[0] : searchHeaders[1];


        const otherHeader = e.target === searchHeaders[0] ? searchHeaders[1] : searchHeaders[0];


        if(clickedHeader.classList.contains("unselected-header")) {
            clickedHeader.classList.remove("unselected-header");
            clickedHeader.classList.add("selected-header");
            otherHeader.classList.remove("selected-header");
            otherHeader.classList.add("unselected-header");

            setDisplayEvents(clickedHeader === searchHeaders[0]);
            setDisplayGrps(clickedHeader !== searchHeaders[0]);
        }

    }

    if(!searchedGroups || !searchedEvents) return null;

  return (
    <div className="search-results">
        <div id="search-heading">
            <span className="search-header selected-header" onClick={toggleHeader}>
                Events
            </span>
            <span className="search-header unselected-header" onClick={toggleHeader}>
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