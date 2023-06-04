import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import capitalize from '../../../utils/capitalize.ts';
import { renderError } from '../../../utils/renderError.ts';
import { validateGrpName } from '../validations';

const GroupNameForm = (props) => {

    const {formData, setFormData, setPageisDone } = props;

    const keywordList = useSelector(state => state.keywords);

    const [grpName, setGrpName] = useState(formData.name ||
        `${formData.location.match(/^(.*),/) ? formData.location.match(/^(.*),/)[1] : formData.location } ${capitalize(keywordList[Object.keys(formData.keywordIds)[0]].keyword)} Group`);

    const [charsLeft, setCharsLeft] = useState(60 - grpName.length);

    const [nameError, setNameError] = useState("");

    const [grpNameStyle, setgrpNameStyle] = useState({});

    const handleNameChange = (e) => {
        setFormData({
            ...formData, name: e.target.value
        });

        const isErrors = renderError(e.target.value, validateGrpName, setNameError);

        setGrpName(e.target.value);
        setCharsLeft(60 - e.target.value.length);
        setPageisDone(!isErrors);
        
        setgrpNameStyle({outline: `1px solid ${isErrors ? "red" : "teal"}`});
    }


    useEffect(() => {

        setFormData({
            ...formData, name: grpName
        });

        setPageisDone(true); // default location of SF is fine

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

    }

  return (
    <div className="group-form-body">
        <h1>What will your group's name be?</h1>
        <p>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
            <form id="name-form" onSubmit={handleSubmit}>
                <div className="charsLeft-container">
                <input type="text" id="grpName" style={grpNameStyle} value={grpName} onChange={handleNameChange} />
                <p className="charsLeft">{charsLeft}</p>
                {!!nameError && <p id="grpName-caption" className={`capt invalid`}>{nameError}</p>}
                </div>
            </form>

    </div>
  )
}

export default GroupNameForm;
