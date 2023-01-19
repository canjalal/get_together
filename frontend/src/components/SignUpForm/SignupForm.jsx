import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../store/session';
import { IoMdClose } from 'react-icons/io';
import { BiErrorCircle } from 'react-icons/bi';
import './signupform.css'
import * as FrontEndValidations from './validations';
import { useRef } from 'react';
import useOutsideClickDetected from '../UseOutsideClickDetected';
import { ErrorsList } from '../ErrorsList';
import { renderError } from '../../utils/renderError';

const SignUpForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    const cancelModal = useOutsideClickDetected(modalRef, closeBtnRef);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const [ageOk, setAgeOk] = useState(false);

    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);

    const [nameVisited, setNameVisited] = useState(false); // whether each form has been visited already by user
    const [nameError, setNameError] = useState('Your name will be public on your meetup profile');
    const [isValidName, setIsValidName] = useState(true);

    const [emailVisited, setEmailVisited] = useState(false); // whether each form has been visited already by user
    const [emailError, setEmailError] = useState("We'll use your email address to send you updates");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [passwordVisited, setPasswordVisited] = useState(false); // whether each form has been visited already by user
    const [passwordError, setPasswordError] = useState('');

    const handleNameValidation = (e) => {
        const name = e ? e.target.value : user.name

        setUser({...user, name: name})
        
        if(nameVisited) {
            setIsValidName(!renderError(name, FrontEndValidations.validateName, setNameError, 'Your name will be public on your meetup profile'));
        }

    }

    useEffect(()=> {
        if(emailVisited) {

            let field = document.getElementById("email");

            FrontEndValidations.renderEmailError(field.value);
            
            field.addEventListener('input', (e) => {
                FrontEndValidations.renderEmailError(e.target.value);
            });
            // if(FrontEndvalidateName(e.target.value) || "We'll use your email address to send you updates")});

        }

    }, [emailVisited]);

    useEffect(handleNameValidation, [nameVisited]);

    useEffect(()=> {
        if(passwordVisited) {

            let field = document.getElementById("password");

            FrontEndValidations.renderPasswordError(field.value);
            
            field.addEventListener('input', (e) => {
                FrontEndValidations.renderPasswordError(e.target.value);
            });
            // if(FrontEndvalidateName(e.target.value) || "We'll use your email address to send you updates")});

        }

    }, [passwordVisited]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        // console.log( {"email": email, "password": password });
        if(ageOk) {
            return dispatch(signup(user))
      .catch(async (res) => {
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

        } else {
            setErrors(['You must be over 18 years of age to join!']);
        }
        
  }

  useEffect(() => {
    if(cancelModal) navigate("/");
  }, [cancelModal]);

  useEffect(()=> {
    if(sessionUser) {
        navigate("/home");
    }

}, [sessionUser]);

    // const makeE

  return !cancelModal && (
    <div className="modal-container">
        <div className="modal" ref={modalRef}>
            <div className="close-icon" ref={closeBtnRef}><IoMdClose /></div>
            <h1>Finish signing up</h1>
            {/* Temporary placeholder for errors that should render as tooltips upon submission
                or as modified captions upon loss of focus */}
            {errors.length > 0 && <ErrorsList errors={errors} setErrors={setErrors} />}
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor='name'>Your name
                </label>
                    <input type="text" id="name" value={user.name}
                    onChange={handleNameValidation}
                    onBlur={() => setNameVisited(true)}
                    onInput={handleNameValidation} />
                <p id="name-caption" className={`capt ${isValidName ? '' : 'invalid'}`}>{nameError}</p>
                </div>
                <div>
                <label htmlFor="email">
                    Email address
                </label>
                <input type="text" id="email" value={user.email} placeholder="example@email.com"
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    onBlur={()=> setEmailVisited(true)} />
                <p id="email-caption" className="capt">We'll use your email address to send you updates</p>
                </div>

                <div>
                <label htmlFor="password">
                    Password
                </label>
                    <input type="password" id="password" value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    onBlur={()=> setPasswordVisited(true)} />
                    <p id="password-caption" className="capt"></p>
                </div>

                <div>
                <label htmlFor="location">
                    Location
                </label>
                    <input type="text" id="location" value={user.location} placeholder="City"
                    onChange={(e) => setUser({...user, location: e.target.value})} />
                <p id="location-caption" className="capt">We'll use your location to show Meetup events near you.</p>
                </div>
                <div>
                    <label htmlFor="ageOK">Age
                    </label>
                    <input type="checkbox" id="ageOk" value={ageOk} onChange={(e) => setAgeOk(e.target.checked ? true : false)} />
                    I am 18 years of age or older.
                    <p id="age-caption" className="capt"></p>
                </div>
                <input type="submit" value="Sign up" className="font-title" />
            </form>
        </div>
    </div>
  )
}

export default SignUpForm;