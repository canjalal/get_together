import React from 'react'
import { useParams } from 'react-router-dom';
import './notfound.css';

const NotFoundPage = () => {

  const { groupId } = useParams();
  return !groupId && (
    <div className="not-found">
        <h1>Sorry, the group you're looking for doesn't exist.</h1>     
        <p>
            Try searching for a group or event
        </p>
    </div>
  )
}

export default NotFoundPage