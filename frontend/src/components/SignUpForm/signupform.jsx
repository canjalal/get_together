import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../store/session';
import { IoMdClose } from 'react-icons/io';
import './signupform.css'

const SignUpForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const [ageOk, setAgeOk] = useState(false);

    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);

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
        navigate("/home");
    }

}, [sessionUser]);

  return (
    <div className="modal-container">
    <div className="modal">
    <div className="close-icon"><IoMdClose /></div>
        <h1>Finish signing up</h1>
        {/* Temporary placeholder for errors that should render as tooltips upon submission
             or as modified captions upon loss of focus */}
        {errors && <ul className="error-console">
        {errors.map(error => <li key={error}>{error}</li>)}
        </ul>}
        <form onSubmit={handleSubmit}>
            <div>
            <label>Your name
                <input type="text" value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})} />
            </label>
            <p id="name-caption" className="capt">Your name will be public on your meetup profile</p>
            </div>
            <div>
            <label>
                Email address
                <input type="text" value={user.email} placeholder="example@email.com"
                onChange={(e) => setUser({...user, email: e.target.value})} />

            </label>
            <p id="email-caption" className="capt">We'll use your email address to send you updates</p>
            </div>

            <div>
            <label>
                Password
                <input type="password" value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})} />
            </label>
            </div>

            <div>
            <label>
                Location
                <input type="text" value={user.location} placeholder="City"
                onChange={(e) => setUser({...user, location: e.target.value})} />
            </label>
            <p id="location-caption" className="capt">We'll use your location to show Meetup events near you.</p>
            </div>
            <div>
                <label>Age
                <input type="checkbox" id="ageOk" value={ageOk} onChange={(e) => setAgeOk(e.target.value ? true : false)} />
                I am 18 years of age or older.
                </label>
            </div>
            <input type="submit" value="Sign up" />
        </form>
    </div>
    </div>
  )
}

export default SignUpForm;