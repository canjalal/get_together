import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import  { getCurrentUser, login } from '../../store/session';
import { ErrorsList } from '../ErrorsList';
import MiniLogo from '../Logo';
import useOutsideClickDetected from '../UseOutsideClickDetected';
import './loginform.css';
import * as FrontEndValidations from './validations'

const LogInForm = () => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(getCurrentUser)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [keepSignedIn, setKeepSignedIn] = useState(false);

    const [errors, setErrors] = useState([]);

    const [emailVisited, setEmailVisited] = useState(false); // whether each form has been visited already by user
    const [passwordVisited, setPasswordVisited] = useState(false);

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    const cancelModal = useOutsideClickDetected(modalRef, closeBtnRef);

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
    
        return dispatch(login({ email, password }))
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
  }

    useEffect(() => {

        if(cancelModal) navigate("/"); // the re-navigation closes the modal and React thinks it's now outside the modal and re-directs back to "/"

    }, [cancelModal]);

    useEffect(()=> {
        if(sessionUser) {
            // console.log("hi now logged in. Message from loginform.jsx");
            navigate("/home");
        }

    }, [sessionUser]);

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

  return !cancelModal && (
    <div className="modal-container">
        <div className="modal" ref={modalRef}>
            <div className="close-icon" ref={closeBtnRef}><IoMdClose /></div>

            <MiniLogo />

            {errors.length > 0 && <ErrorsList errors={errors} setErrors={setErrors} />}
            <h1>Log in</h1>
            <p>Not a member yet? <Link to="/signup" className="green-link">Sign up</Link></p>
            <form onSubmit={handleSubmit}>
                <label>Email
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={()=> setEmailVisited(true)} />
                    <p id="email-caption" className="capt"></p>
                </label>
                <label>Password
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={()=> setPasswordVisited(true)} />
                    <p id="password-caption" className="capt"></p>
                </label>
                
                    {/* <input type="checkbox" id="keepSignedIn" value={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.value ? true : false)} />
                    <span>Keep me signed in</span> */}

                <input type="submit" className="font-title" value="Log in" id="login-button" />
            </form>

            <button className="standard-button demo-user" onClick={(e)=> {
                setEmail('seth@yorku.ca');
                setPassword('password');
            }}>Demo User</button>

        </div>
    </div>
  )
}

export default LogInForm