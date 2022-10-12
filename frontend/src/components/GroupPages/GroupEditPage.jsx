import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getGroupKeywords } from '../../store/groupkeywords';
import { fetchGroup, getGroup, patchGroup } from '../../store/groups';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import './showpage.css';
import { getCurrentUser } from '../../store/session';
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import DeleteGroupForm from './DeleteGroupForm';

const GroupEditPage = () => {
    
    const { groupId } = useParams();

    const group = useSelector(getGroup(groupId));

    const groupKeywords = useSelector(getGroupKeywords(groupId));

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const keywordList = useSelector((state) => state.keywords);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [memberLabel, setMemberLabel] = useState('');
    const [location, setLocation] = useState('');
    const [checkedKeywords, setCheckedKeywords] = useState([]);
    const [deleteGroupModal, setDeleteGroupModal] = useState(false);
    const navigate = useNavigate();

    const sessionUser = useSelector(getCurrentUser);

    // const [gkeywords, setGKeywords] = useState([]);

    window.group = group;

    window.groupId = groupId;
    window.checkedKeywords = checkedKeywords;
    window.memberLabel = memberLabel;



    useEffect(() => {
        dispatch(fetchGroup(groupId)).then(()=> {
        }, async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          }
        );
    }, [groupId])

    useEffect(()=> {
        if(group && groupKeywords) {

            if(sessionUser.id !== group.ownerId) navigate(`../groups/${groupId}`);
            setName(group.name);
            setDescription(group.description);
            setMemberLabel(group.memberLabel || "");
            setLocation(group.location);

            let tempKeywordIds = Object.values(groupKeywords).map(gk => gk.keywordId);
            setCheckedKeywords(tempKeywordIds);

            for(let id of tempKeywordIds) {
                let cb = document.getElementById(`kw-${id}`);
                if(cb) {
                    cb.classList.add("kw-checked");
                    cb.classList.remove("kw-unchecked");
                }
            
            }

        }
    }, [group]);

    const toggleItem = (id) => (e) => {
        let keywordErrorCapt = document.querySelector("#keyword-error");
        if (e.target.classList.contains("kw-unchecked")) {
            setCheckedKeywords([...checkedKeywords, Number(id)]);
            e.target.classList.add("kw-checked");
            e.target.classList.remove("kw-unchecked")
            document.querySelector("#save-group-info-button").disabled = false;
            keywordErrorCapt.style.display = "none";
            // console.log("checked! " + e.target.value);
        } else {
            if(checkedKeywords.length === 1) {
                keywordErrorCapt.style.display = "block";
                document.querySelector("#save-group-info-button").disabled = true;
            }
            
            setCheckedKeywords(checkedKeywords.filter((x) => x !== Number(id)));
            e.target.classList.remove("kw-checked");
            e.target.classList.add("kw-unchecked");
            // console.log("unchecked! " + e.target.value)
        }        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            description: description,
            memberLabel: memberLabel,
            location: location,
            ownerId: group.ownerId,
            keywordIds: checkedKeywords
        };

        // formData.append('name', name);
        // formData.append('description', description);
        // formData.append('memberLabel', memberLabel);
        // formData.append('location', location);
        // formData.append('ownerId', group.ownerId);
        // formData.append('keywordIds', checkedKeywords);
        // console.log
        dispatch(patchGroup(formData, groupId)).then(() => {
            navigate(`../groups/${groupId}`);
        }, async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });

    }

    if(!group || !groupKeywords) return null;

  return (
    <div>
        <div id="group-edit-header">
            <div id="mini-grp-image" style={{backgroundImage: `url(${group.photoURL || 'https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/group_fallback_large.png'})`}}>
            </div>
            <div>
                <Link to={`../groups/${groupId}`} className="green-link">
                <AiOutlineArrowLeft /> Back to group page</Link>
            <h1 className="mid-title">{group.name}</h1>
            </div>
        </div>
        <div>
            <form className="edit-form-body" onSubmit={handleSubmit}>
                <div className="group-form-body">
                    <h1>Basic information</h1>
                    <label>Name
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>Description
                        <p className="sub-labels">What is the purpose of this group? Who should join? Why?</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Custom member label
                        <p className="sub-labels">What do you call the members of this group? This is used in certain emails and areas of Meetup. (Examples: Runners, New Moms, Bookworms)</p>
                        <input type="text" value={memberLabel} style={{width: '256px'}} onChange={(e) => setMemberLabel(e.target.value)} />
                    </label>
                </div>
                <div className="group-form-body">
                    <h2>Where</h2>
                    <label>
                    Location
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>                        
                    </label>
                </div>
                <div className="group-form-body" style={{gap: "0px"}}>
                    <h2>Topics</h2>
                    <label>
                Why are topics important?
                    <p className="sub-labels">Topics describe what your Meetup group is about in a word or two. Pick up to 15 topics for your Meetup group. Well-picked topics help the right members find your Meetup group.</p>
                    {Object.values(keywordList).map((kw) => <p key={kw.id} id={`kw-${kw.id}`} className="kw-checkbox kw-unchecked" onClick={toggleItem(kw.id)}>
{kw.keyword}
                </p>)}
                </label>
                <p id="keyword-error" className="capt invalid">You must select at least one keyword for your group!</p>
                </div>
                <div className="submit-edit-group">
                {errors.length > 0 && <div className="error-console">
                                        
                                        <BiErrorCircle />
                                                <ul>
                                        {errors.map(error => <li key={error}>{error}</li>)}
                                        </ul>
                                        <div className="close-modal" onClick={(e)=> {setErrors([]);
                                        e.stopPropagation();}}><IoMdClose /></div>
                                        </div>}
                    <input type="submit" value="Save" id="save-group-info-button" />
                    <button className="secondary-button" style={{width: "fit-content"}} onClick={(e) => {
                        e.preventDefault();
                        setDeleteGroupModal(true);
                    }}>Delete Group</button>
                
                </div>
            </form>
        </div>
        {deleteGroupModal && <DeleteGroupForm setDeleteGroupModal={setDeleteGroupModal} groupId={groupId} />}
    </div>
  )
}

export default GroupEditPage;