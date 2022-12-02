import { useRef } from "react";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeGroup } from "../../store/groups";
import useOutsideClickDetected from "../UseOutsideClickDetected";

const DeleteGroupForm = ({setDeleteGroupModal, groupId}) => {


    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const modalRef = useRef(null);
    const btnCloseRef = useRef(null);

    const cancelModal = useOutsideClickDetected(modalRef, btnCloseRef);


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

    useEffect(() => {
      setDeleteGroupModal(!cancelModal);

    }, [cancelModal]);

  return (
    <div className="modal-container">
        <div className="modal" id="attach-new-photo" ref={modalRef}>
            <div className="close-icon" id="attach-new-photo-close" ref={btnCloseRef}><IoMdClose /></div>
            {/* Temporary placeholder for errors that should render as tooltips upon submission
                or as modified captions upon loss of focus */}
            {errors.length > 0 && <div className="error-console">
                                        
            <BiErrorCircle />
                    <ul>
            {errors.map(error => <li className="error-bullets" key={error}>{error}</li>)}
            </ul>
            <div className="close-modal" onClick={(e)=> {setErrors([]);
            e.stopPropagation();}}><IoMdClose /></div>
            </div>}
            <form onSubmit={handleSubmit} className="modal-confirmation">
                <h1>Are you sure?</h1>
                <p className="sub-labels">This action cannot be undone.</p>
                <div>
                    <input type="submit" id="submit-group-photo-button" value="Delete my Group" />
                    <div className="secondary-button" style={{display: "inline-block", width: "fit-content", margin: "10px"}} onClick={(e)=> setDeleteGroupModal(false)}>Take me Back</div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default DeleteGroupForm;