import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeGroup } from "../../store/groups";

const DeleteGroupForm = ({setDeleteGroupModal, groupId}) => {


    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        // formData.append("id", groupId);

        dispatch(removeGroup(groupId)).then(
            async (res) => {

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

            }
          );




    }

    const cancelModal = (e) => {
        if(!document.getElementsByClassName('modal')[0]?.contains(e.target) || document.getElementsByClassName('close-icon')[0]?.contains(e.target)) {
            setDeleteGroupModal(false);
        }
      }

      useEffect(()=> {
        window.addEventListener('click', cancelModal);
        return () => {
            window.removeEventListener('click', cancelModal);
        }
      }, [])


  return (
    <div className="modal-container">
        <div className="modal" id="attach-new-photo">
            <div className="close-icon" id="attach-new-photo-close"><IoMdClose /></div>
            {/* Temporary placeholder for errors that should render as tooltips upon submission
                or as modified captions upon loss of focus */}
            {errors.length > 0 && <div className="error-console">
                                        
            <BiErrorCircle />
                    <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div className="close-modal" onClick={(e)=> {setErrors([]);
            e.stopPropagation();}}><IoMdClose /></div>
            </div>}
            <form onSubmit={handleSubmit}>
                <h1>Are you sure?</h1>
                <input type="submit" id="submit-group-photo-button" value="Delete my Group" />
                <div className="secondary-button" style={{display: "inline-block", width: "fit-content", margin: "20px"}} onClick={(e)=> setDeleteGroupModal(false)}>Take Me Back</div>

            </form>
        </div>
    </div>
  )
}

export default DeleteGroupForm;