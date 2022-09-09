import React, { useContext, useEffect } from 'react'
import { GroupFormContext } from './GroupFormContext'

const BottomBar = (props) => {

    const { pageNum, setPageNum, pageisDone } = useContext(GroupFormContext);

    useEffect(() => {

        document.querySelector("#next-button").disabled = !pageisDone;

    }, [pageisDone])
  return (
    <div id="bottom-bar">
        <div>{pageNum !== 1 && <button className="back-button" onClick={() => setPageNum((prev) => prev - 1)}>Back</button>}</div>
        <button className="standard-button" id="next-button" onClick={()=> setPageNum((prev)=> prev + 1)}>Next</button>
        </div>
  )
}

export default BottomBar