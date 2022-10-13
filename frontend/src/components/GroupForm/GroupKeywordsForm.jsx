import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GroupFormContext } from './GroupFormContext';

const GroupKeywordsForm = () => {

    const {formData, setFormData, setPageisDone, pageisDone } = useContext(GroupFormContext);

    const keywordList = useSelector((state) => state.keywords);

    const [checkedKeywords, setCheckedKeywords] = useState(formData.keywordIds || []); // list of selected keyword IDs

    useEffect(() => {

        for(let id of checkedKeywords) {
            let cb = document.getElementById(`kw-${id}`);
            cb.classList.add("kw-checked");
            cb.classList.remove("kw-unchecked");
        }
        // console.log(`KeywordList is ${keywordList}`)
    }, []);

    const toggleItem = (id) => (e) => {
        if (e.target.classList.contains("kw-unchecked")) {
            setCheckedKeywords([...checkedKeywords, Number(id)]);
            e.target.classList.add("kw-checked");
            e.target.classList.remove("kw-unchecked")
            // console.log("checked! " + e.target.value);
        } else {
            setCheckedKeywords(checkedKeywords.filter((x) => x !== Number(id)));
            e.target.classList.remove("kw-checked");
            e.target.classList.add("kw-unchecked");
            // console.log("unchecked! " + e.target.value)
        }        
    }

    useEffect(() => {


        setFormData({
            ...formData, keywordIds: checkedKeywords
        });

        setPageisDone(checkedKeywords.length !== 0);
        // console.log(formData);
    }, [checkedKeywords])

    // window.checkedKeywords = checkedKeywords;


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if(pageisDone) toggleLocForm(e);
    // }

  return (
    <div className="group-form-body">
        <h1>Choose a few topics that describe your group's interests</h1>
        <p>Be specific! This will help us promote your group to the right people. You can choose up to 15 topics.</p>
            <form id="kw-form">
                {Object.values(keywordList).map((kw) => <p key={kw.id} id={`kw-${kw.id}`} className="kw-checkbox kw-unchecked" onClick={toggleItem(kw.id)}>
{kw.keyword}
                </p>)}
            </form>

    </div>
  )
}

export default GroupKeywordsForm