import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroups } from '../../store/groups';
import { getSearchedEventData, getSearchedGroupData } from '../../store/session';
import EventPanel from '../EventPages/eventpanel';
import GroupPanel from '../GroupForm/GroupPanel'
import NoResults from './NoResults';

const SearchResults = () => {

    const dispatch = useDispatch();

    const searchedGroups = useSelector(getSearchedGroupData)

    const searchedEvents = useSelector(getSearchedEventData);

    window.searchedGroups = searchedGroups;
    window.searchedEvents = searchedEvents;


    const toggleHeader = (e) => {


        const searchHeaders = document.getElementsByClassName("search-header");

        const clickedHeader = e.target === searchHeaders[0] ? searchHeaders[0] : searchHeaders[1];


        const otherHeader = e.target === searchHeaders[0] ? searchHeaders[1] : searchHeaders[0];


        if(clickedHeader.classList.contains("unselected-header")) {
            clickedHeader.classList.remove("unselected-header");
            clickedHeader.classList.add("selected-header");
            otherHeader.classList.remove("selected-header");
            otherHeader.classList.add("unselected-header");
            
            if(clickedHeader === searchHeaders[0]) {
                document.querySelector("#event-results").style.display = "flex";
                document.querySelector("#group-results").style.display = "none";

            } else {
                document.querySelector("#event-results").style.display = "none";
                document.querySelector("#group-results").style.display = "flex";

            }
        }

    }

    // useEffect(() => {
    //     console.log(searchedGroups);
    // }, [])

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

        <div id="group-results">

            {searchedGroups.length > 0 ?
                searchedGroups.map((grp) => <GroupPanel group={grp} key={grp.id} /> ) :
                <NoResults type="group" />
            }
        </div>

        <div id="event-results">
            
            {searchedEvents.length > 0 ?
                searchedEvents.map((ev) => <Link to={`/events/${ev.id}`} key={ev.id}><EventPanel data={ev} /> </Link>) :
                <NoResults type="event" />
            }
        </div>


    </div>
  )
}


export default SearchResults