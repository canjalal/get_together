import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

export const GroupKeyword = ({kw, isChecked, toggleItem}) => {

    const [keywordClass, setKeywordClass] = useState("");

    useEffect(()=>{
        if(isChecked) {
            setKeywordClass("kw-checkbox kw-checked");
        } else {
            setKeywordClass("kw-checkbox kw-unchecked");
        }
    }, [isChecked]);
  return (
    <p id={`kw-${kw.id}`} className={keywordClass} onClick={toggleItem(kw.id)}> 
{kw.keyword}
    </p>
  )
}
