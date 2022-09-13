import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../../store/groups';
import { getCurrentUser } from '../../store/session';
import { GroupFormContext } from './GroupFormContext'

const BottomBar = (props) => {

    const { pageNum, setPageNum, pageisDone, formData, setPageisDone } = useContext(GroupFormContext);

    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUser);

    const submitGroup = async () => {


        dispatch(createGroup({...formData, ownerId: currentUser.id})).then(
            async (res) => {
                // instead of redirecting to show page, just go home. Feed will have the new group at the top
                navigate("/home");
            },
            async (res) => { // not correctly catching error 422, re-renders a blank page (not what we want)
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

              setPageisDone(false);
            }
          );

    }

    useEffect(() => {
        setErrors([]);
    }, [pageNum])

    useEffect(() => {

        document.querySelector("#next-button").disabled = !pageisDone;


    }, [pageisDone])
  return (
    <div id="bottom-bar">
        <div>{pageNum !== 1 && <button className="back-button" onClick={() => setPageNum((prev) => prev - 1)}>Back</button>}</div>
        {pageNum < 5 && <button className="standard-button" id="next-button" onClick={()=> setPageNum((prev)=> prev + 1)}>Next</button>}
        {pageNum === 5 && <button className="standard-button" id="next-button" onClick={submitGroup}>Agree & Continue</button>}
        {errors.length > 0 && <ul>
            <li>Errors:</li>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
            }
        </div>
  )
}

export default BottomBar