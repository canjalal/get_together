import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import { GroupFormContext } from './GroupFormContext'

const BottomBar = (props) => {

    const { pageNum, setPageNum, pageisDone, formData } = useContext(GroupFormContext);

    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUser);

    useEffect(() => {

        document.querySelector("#next-button").disabled = !pageisDone;

    }, [pageisDone])
  return (
    <div id="bottom-bar">
        <div>{pageNum !== 1 && <button className="back-button" onClick={() => setPageNum((prev) => prev - 1)}>Back</button>}</div>
        {pageNum < 5 && <button className="standard-button" id="next-button" onClick={()=> setPageNum((prev)=> prev + 1)}>Next</button>}
        {pageNum === 5 && <button className="standard-button" id="submit-group" onClick={()=> dispatch(createGroup({...formData, ownerId: currentUser.id}))}>Agree & Continue</button>}
        </div>
  )
}

export default BottomBar