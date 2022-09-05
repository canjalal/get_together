import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Redirect, useNavigate } from 'react-router-dom';
import sessionReducer, { login } from '../../store/session';
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

    useEffect(()=> {
        if(sessionUser) {
            console.log("hi");
            navigate("/");
        }

    }, [sessionUser]);

  return (
    <div className="modal-container">
        <div className="modal">
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
            <input type="submit" value="Log in" />
        </form>
        </div>
    </div>
  )
}

export default LogInForm