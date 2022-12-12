import React from 'react'
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

export const ErrorsList = ({errors, setErrors}) => {

  const handleClick = (e) => {
    setErrors([]);
    e.stopPropagation();
  }
  return (
    <div className="error-console">
                                  
      <BiErrorCircle />
      <ul>
        {errors.map(error => <li className="error-bullets" key={error}>{error}</li>)}
      </ul>
      <div className="close-modal" onClick={handleClick}>
          <IoMdClose />
      </div>
    </div>
  )
}
