import React, { useContext, useEffect, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
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


        const { response, data } = await dispatch(createGroup({...formData, ownerId: currentUser.id}))

        navigate(`/groups/${data.group.id}`);

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
        {pageNum === 5 && <button className="standard-button" id="next-button" onClick={(e) => submitGroup(e).catch(
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
          )}>Agree & Continue</button>}

{errors.length > 0 && <div className="error-console">
            
            <BiErrorCircle />
                    <ul>
            {errors.map(error => <li key={error} className="error-bullets">{error}</li>)}
            </ul>
            <div className="close-modal" onClick={(e)=> {setErrors([]);
            e.stopPropagation();}}><IoMdClose /></div>
            </div>}
            
        {/* {errors.length > 0 && <ul>
            <li>Errors:</li>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
            } */}
        </div>
  )
}

export default BottomBar