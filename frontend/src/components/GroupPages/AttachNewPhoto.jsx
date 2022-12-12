import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { BsCloudUpload } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { patchGroupPhoto } from '../../store/groups';
import { useRef } from 'react';
import useOutsideClickDetected from '../UseOutsideClickDetected';
import { ErrorsList } from '../ErrorsList';

const AttachNewPhoto = ({setDisplayPhotoModal, groupId, eventId}) => {

    const reader = new FileReader();

    const [selectedCoverPhoto, setSelectedCoverPhoto] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    const cancelModal = useOutsideClickDetected(modalRef, closeBtnRef);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // formData.append("id", groupId);
        formData.append("coverPhoto", selectedCoverPhoto);
        
        dispatch(patchGroupPhoto(formData, groupId)).then(
            async (res) => {

                setSelectedCoverPhoto(null);
                setDisplayPhotoModal(false);

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
        setDisplayPhotoModal(!cancelModal);
        
    }, [cancelModal]);

    const selectedCoverPhotoURL = selectedCoverPhoto ? `url(${URL.createObjectURL(selectedCoverPhoto)})` : "";

  return (
    <div className="modal-container">
        <div className="modal" id="attach-new-photo" ref={modalRef}>
            <div className="close-icon" id="attach-new-photo-close" ref={closeBtnRef}><IoMdClose /></div>
            {/* Temporary placeholder for errors that should render as tooltips upon submission
                or as modified captions upon loss of focus */}
            {errors.length > 0 && <ErrorsList errors={errors} setErrors={setErrors} />}
            <form onSubmit={handleSubmit}>
                <label htmlFor="attach-photo">
                    <div id="add-photo-box" style={{backgroundImage : selectedCoverPhotoURL}}>
                        {!selectedCoverPhoto && <>
                            <div id="upload-icon-container"><BsCloudUpload /></div>
                        <div className="attach-new-photo-title">
                            Add a photo
                        </div>
                        <input type="file" accept="image/*" id="attach-photo" onChange={(e) => {
                            e.preventDefault();
                            setSelectedCoverPhoto(e.target.files[0]);
                            reader.readAsDataURL(e.target.files[0]);
                            }} />
                        <p id="attach-photo-caption">Drag and drop photo or click the button below to select a photo you'd like to upload.</p>
                        <div className="secondary-button" >Upload photo</div>
                        </>}
                        {selectedCoverPhoto && <>
                        <div id="uploaded-group-cover-image">

                        </div>
                        </>}

                    </div>
                    
                </label>
                {selectedCoverPhoto && <div id="submit-group-photo">
                <div className="secondary-button" onClick={(e)=> setSelectedCoverPhoto(null)}>Cancel</div>
                <input type="submit" id="submit-group-photo-button" value="Save photo" />
                </div>}
            </form>
        </div>
    </div>
  )
}

export default AttachNewPhoto