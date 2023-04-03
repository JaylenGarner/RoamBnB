import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='login-container'>
    <div className='login-panel'>
      <div className='login-form-label'>
        <h2>Login</h2>
      </div>
    <form onSubmit={handleSubmit} className='login-form'>
      <h3 className='welcome'>Welcome to RoamBnB</h3>
      {errors.length !== 0 &&
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
        }
        <input
          type="text"
          id='login-email'
          className='login-text-fields'
          placeholder='Email'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <input
          type="password"
          id='login-password'
          className='login-text-fields'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <button className='login-button'type="submit">Continue</button>
      <div className='login-form-sign-up-area'>
        <span className='dont-have-an-account'>Don't have an account? </span>
        <NavLink to={'/signup'} className='sign-up-link'>Sign up</NavLink>
      </div>
    </form>
    </div>
    </div>
  );
}

export default LoginFormPage;
