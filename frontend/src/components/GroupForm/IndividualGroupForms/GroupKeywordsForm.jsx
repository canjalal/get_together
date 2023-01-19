import React, { createRef, useEffect, useState } from 'react'
import { useMemo } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getKeywords } from '../../../store/keywords';
import { GroupKeyword } from './GroupKeyword';

const GroupKeywordsForm = (props) => {

    const {formData, setFormData, setPageisDone } = props;

    const keywordList = useSelector(getKeywords);

    const [checkedKeywords, setCheckedKeywords] = useState(formData.keywordIds);

    const toggleItem = (id) => () => {
        const tempKeywordIds = {...checkedKeywords}
        if(tempKeywordIds[id]) {
            delete tempKeywordIds[id];
        } else {
            tempKeywordIds[id] = true;
        }
        setCheckedKeywords({...tempKeywordIds});
    }

    useEffect(() => {


        setFormData({
            ...formData, keywordIds: {...checkedKeywords}
        });

        setPageisDone(Object.keys(checkedKeywords).length !== 0);

    }, [checkedKeywords])

  return (
    <div className="group-form-body">
        <h1>Choose a few topics that describe your group's interests</h1>
        <p>Be specific! This will help us promote your group to the right people. You can choose up to 15 topics.</p>
            <form id="kw-form">
                { keywordList.map((kw) => <GroupKeyword key={kw.id} kw={kw} toggleItem={toggleItem} isChecked={!!checkedKeywords[kw.id]} />)}

            </form>

    </div>
  )
}

export default GroupKeywordsForm