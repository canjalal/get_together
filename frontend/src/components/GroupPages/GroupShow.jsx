import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getGroupKeywords } from '../../store/groupkeywords';
import { fetchGroup, getGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import { GoLocation } from 'react-icons/go';
import NotFoundPage from '../NotFoundPage/notfoundpage';
import { IoPeopleOutline } from 'react-icons/io5';
import './showpage.css';
import { BiUser } from 'react-icons/bi';
import { getUser } from '../../store/users';

const GroupShow = (props) => {

    const { groupId } = useParams();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const group = useSelector(getGroup(groupId));

    const groupKeywords = useSelector(getGroupKeywords(groupId));

    const sessionUser = useSelector(getCurrentUser);

    const owner = useSelector(getUser(group.ownerId));

    useEffect(() => {
        dispatch(fetchGroup(groupId)).catch(async (res) => {
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
    }, [groupId])

    window.group = group;
 
    if(!group || !groupKeywords) return <NotFoundPage />;

  return (
    <div className="show-page-flex">
        <div className="show-page-header">
            <div id="group-cover" style={{backgroundImage: `url(${group.photoURL})`}}>s</div>
            <div id="group-info">
                <h1>{group.name}</h1>
                <ul>
                    <li id="grp-location-bullet"><GoLocation />
                        {group.location}
                    </li>
                    <li>
                    <IoPeopleOutline /> Number of members placeholder
                    </li>
                    <li>
                        <BiUser /> Organized by {owner.name}
                    </li>
                </ul>
            </div>
        </div>

     </div>
  )
}

export default GroupShow