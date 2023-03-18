import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../../store/session';
import '../DropDowns.css';

function ActiveUserDropDown() {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
      <div className="no-user-dropdown-container">
        <NavLink to="/" className='no-user-navbar-item dropdown-non-login' >Trips</NavLink>
        <NavLink to="/create" className='no-user-navbar-item dropdown-non-login' >Roambnb your home</NavLink>
        <span onClick={logout} className='no-user-navbar-item dropdown-non-login'>Log Out</span>
      </div>
  );
}

export default ActiveUserDropDown;
