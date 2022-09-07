import React, { useEffect, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Redirect, useNavigate } from 'react-router-dom';
import sessionReducer, { login } from '../../store/session';
import MiniLogo from '../logo';
import './loginform.css';
import * as FrontEndValidations from './validations'

const LogInForm = () => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const [errors, setErrors] = useState([]);

    const [emailVisited, setEmailVisited] = useState(false); // whether each form has been visited already by user
    const [passwordVisited, setPasswordVisited] = useState(false);

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        // console.log( {"email": email, "password": password });
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

  const cancelModal = (e) => {
    if(!document.getElementsByClassName('modal')[0]?.contains(e.target) || document.getElementsByClassName('close-icon')[0]?.contains(e.target)) {

        navigate("/");
    }
  }

  useEffect(()=> {
    window.addEventListener('click', cancelModal);
    return () => {
        window.removeEventListener('click', cancelModal);
    }
  }, [])

    useEffect(()=> {
        if(sessionUser) {
            console.log("hi");
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

  return (
    <div className="modal-container">
        <div className="modal">
        <div className="close-icon"><IoMdClose /></div>

        <MiniLogo />

        {errors.length > 0 && <div className="error-console">
        
        <BiErrorCircle />
                <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <div className="close-modal" onClick={(e)=> {setErrors([]);
        e.stopPropagation();}}><IoMdClose /></div>
        </div>}
        <h1>Log in</h1>
        <p>Not a member yet? Sign up</p>
        <form onSubmit={handleSubmit}>
            <label>Email
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={()=> setEmailVisited(true)} />
                <p id="email-caption" className="capt"></p>
            </label>
            <label>Password
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={()=> setPasswordVisited(true)} />
                <p id="password-caption" className="capt"></p>
            </label>
            <label>
                <input type="checkbox" id="keepSignedIn" value={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.value ? true : false)} />
                Keep me signed in
            </label>
            <input type="submit" className="font-title" value="Log in" />
        </form>
        <button onClick={(e)=> {
            setEmail('seth@yorku.ca');
            setPassword('password');
        }}>Demo User</button>
        </div>
    </div>
  )
}

export default LogInForm