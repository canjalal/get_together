import React, { useEffect, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const AttachNewPhoto = ({setDisplayPhotoModal}) => {

    const reader = new FileReader();

    const [photoCaption, setPhotoCaption] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
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

  return (
    <div className="modal-container">
        <div className="modal">
            <div className="close-icon"><IoMdClose /></div>
            <h1>Crop your photo</h1>
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
                <div>
                <label htmlFor='attach-photo'>Add a photo
                </label>
                    <input type="file" id="attach-photo" />
                <p id="attach-photo-caption" className="capt">Drag and drop photo or click the button below to select a photo you'd like to upload.</p>
                </div>
                <div>
                    <textarea value={photoCaption} placeholder="Add a caption" onChange={(e) => setPhotoCaption(e.target.value)} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default AttachNewPhoto