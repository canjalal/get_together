import React, { useState } from 'react'
import { GrImage } from 'react-icons/gr';
import AttachNewPhoto from './AttachNewPhoto';

export const GroupCoverPhoto = ({group, isOwner, groupId}) => {

    const [displayPhotoModal, setDisplayPhotoModal] = useState(false);

  return (
    <div id="group-cover" style={{backgroundImage: `url(${group.photoURL || 'https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/group_fallback_large.png'})`}}>
                {isOwner && <div id="change-photo-button" onClick={(e) => setDisplayPhotoModal(true)}>
                {displayPhotoModal && <AttachNewPhoto setDisplayPhotoModal={setDisplayPhotoModal} groupId={groupId} />}
                <GrImage /> <span>Change photo</span>  
                            </div>}
    </div>
  )
}
