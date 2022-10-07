import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../store/groups';
import { getSearchedGroupData } from '../../store/session';
import GroupLargeIcon from '../GroupPages/GroupLargeIcon';

const SearchResults = () => {

    const dispatch = useDispatch();

    const searchedGroups = useSelector(getSearchedGroupData)

    window.searchedGroups = searchedGroups;



    useEffect(() => {
        console.log(searchedGroups);
    }, [])

    if(!searchedGroups) return null;

  return (
    <div>
        <h1>Search Results</h1>
        <div className="other-groups">
            
            {searchedGroups.length > 0 ?
                searchedGroups.map((grp) => <GroupLargeIcon group={grp} key={grp.id} /> ) :
                <h1>No groups found</h1>
            }
        </div>


    </div>
  )
}

export default SearchResults