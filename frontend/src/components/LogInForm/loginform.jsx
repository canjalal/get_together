import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Redirect, useNavigate } from 'react-router-dom';
import sessionReducer, { login } from '../../store/session';
import MiniLogo from '../logo';
import './loginform.css';

const LogInForm = () => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    const [errors, setErrors] = useState([]);

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

  return (
    <div className="modal-container">
        <div className="modal">
        <div className="close-icon"><IoMdClose /></div>

        <MiniLogo />

        {errors && <ul className="error-console">
        {errors.map(error => <li key={error}>{error}</li>)}
        </ul>}
        <h1>Log in</h1>
        <p>Not a member yet? Sign up</p>
        <form onSubmit={handleSubmit}>
            <label>Email
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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