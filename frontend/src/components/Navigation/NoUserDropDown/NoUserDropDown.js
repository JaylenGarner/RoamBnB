// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { NavLink } from "react-router-dom";
import './NoUserDropDown.css';
import { IoIosMenu } from "react-icons/io";


function NoUserDropDown() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="no-user-dropdown-container">
      <NavLink to="/login" className='no-user-navbar-item dropdown-login' >Log In</NavLink>
      <NavLink to="/signup" className='no-user-navbar-item dropdown-non-login' >Sign Up</NavLink>
      <NavLink to="/create" className='no-user-navbar-item dropdown-non-login' >Roambnb your home</NavLink>
    </div>
  );
}

export default NoUserDropDown;
