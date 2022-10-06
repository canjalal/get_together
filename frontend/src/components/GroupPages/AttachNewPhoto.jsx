import React, { useEffect, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { BsCloudUpload } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { patchGroupPhoto } from '../../store/groups';

const AttachNewPhoto = ({setDisplayPhotoModal, groupId, eventId}) => {

    const reader = new FileReader();

    const [selectedCoverPhoto, setSelectedCoverPhoto] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    window.selectedCoverPhoto = selectedCoverPhoto;
    window.reader = reader;

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

    const cancelModal = (e) => {
        if(!document.getElementsByClassName('modal')[0]?.contains(e.target) || document.getElementsByClassName('close-icon')[0]?.contains(e.target)) {
            setDisplayPhotoModal(false);
        }
      }

      useEffect(()=> {
        window.addEventListener('click', cancelModal);
        return () => {
            window.removeEventListener('click', cancelModal);
        }
      }, [])

      useEffect(()=> {

        if(selectedCoverPhoto) {
            document.getElementById("add-photo-box").style.backgroundImage = `url(${URL.createObjectURL(selectedCoverPhoto)})`;
 
         } 
      }, [selectedCoverPhoto]);

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
                <label htmlFor="attach-photo">
                    <div id="add-photo-box">
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