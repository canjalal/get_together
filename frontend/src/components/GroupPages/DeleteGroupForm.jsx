import { useRef } from "react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeGroup } from "../../store/groups";
import { ErrorsList } from "../ErrorsList";
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
            {errors.length > 0 && <ErrorsList errors={errors} setErrors={setErrors} />}
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