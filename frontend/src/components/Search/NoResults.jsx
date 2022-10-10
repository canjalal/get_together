import React from 'react'
import "./nullresults.scss";

const NoResults = ({type}) => {


  return (
    <div className="null-results-container">
        <div className="null-image">

        </div>

        <div className="null-description">
        Sorry, there are no {type} results
        </div>
        
    </div>
  )
}

export default NoResults