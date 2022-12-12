import React, { createRef, useContext, useEffect, useState } from 'react'
import { useMemo } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getKeywords } from '../../store/keywords';
import { GroupFormContext } from './GroupFormContext';
import { GroupKeyword } from './GroupKeyword';

const GroupKeywordsForm = () => {

    const {formData, setFormData, setPageisDone } = useContext(GroupFormContext);

    const keywordList = useSelector(getKeywords);

    const [checkedKeywords, setCheckedKeywords] = useState(formData.keywordIds || []); // list of selected keyword IDs

    window.checkedKeywords = checkedKeywords // may be better to just have a fixed length array of booleans of selected, to avoid having to search within array for keywords

    const toggleItem = (id) => (e) => {

        if (e.target.classList.contains("kw-unchecked")) {
            setCheckedKeywords([...checkedKeywords, Number(id)]);
        } else {
            setCheckedKeywords(checkedKeywords.filter((x) => x !== Number(id)));
        }        
    }

    useEffect(() => {


        setFormData({
            ...formData, keywordIds: checkedKeywords
        });

        setPageisDone(checkedKeywords.length !== 0);
        // console.log(formData);
    }, [checkedKeywords])

  return (
    <div className="group-form-body">
        <h1>Choose a few topics that describe your group's interests</h1>
        <p>Be specific! This will help us promote your group to the right people. You can choose up to 15 topics.</p>
            <form id="kw-form">
                {/* {keywordList.map((kw, i) => <p key={kw.id} id={`kw-${kw.id}`} className="kw-checkbox kw-unchecked" ref={keywordRefs[i]} onClick={toggleItem(kw.id)}> 
{kw.keyword}
                </p>)} */}
                { keywordList.map((kw) => <GroupKeyword key={kw.id} kw={kw} toggleItem={toggleItem} isChecked={checkedKeywords.indexOf(kw.id) !== -1} />)}
            </form>

    </div>
  )
}

export default GroupKeywordsForm