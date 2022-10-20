import React, { useState } from 'react'
import './searchbar.css';
import { IoMdSearch } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { clearGroups, searchGroups } from '../../store/groups';
import { useNavigate } from 'react-router-dom';
import { searchEvents } from '../../store/events';

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const changeQuery = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data } = await dispatch(searchGroups({
            query: searchQuery
        }));

        await dispatch(searchEvents({
            query: searchQuery
        }));
        navigate("/searchresults");

    }
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
        <input type="text" className="search-field" value={searchQuery} placeholder="Search for groups and events" onChange={changeQuery} />
        <div className="search-button" onClick={handleSubmit}><IoMdSearch color="#fff" /></div>
    </form>
  )
}

export default SearchBar