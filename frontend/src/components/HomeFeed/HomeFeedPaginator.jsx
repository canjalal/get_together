import { IoChevronDown } from 'react-icons/io5';
import { useState } from 'react';
import GroupPanel from '../GroupPanel/';

const DEFAULT_GROUP_LENGTH = 4;

export const HomeFeedPaginator = ({groupData, selectedGroups}) => {

    const [listLength, setListLength] = useState(DEFAULT_GROUP_LENGTH);

    const handleShowMore = (e) => {
        setListLength(listLength + DEFAULT_GROUP_LENGTH);
    }

   return (<div>
   { selectedGroups.slice(0, listLength).map((gid) => <GroupPanel group={groupData[gid]} key={gid} /> )}
   {listLength < selectedGroups.length && <div onClick={handleShowMore}className="organizer-tools">More Groups
                                                     <IoChevronDown />
                                                     </div>}
   </div>)
}
