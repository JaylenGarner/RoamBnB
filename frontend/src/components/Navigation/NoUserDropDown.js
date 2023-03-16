// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import './Navigation.css';
import { IoIosMenu } from "react-icons/io";


function NoUserDropDown() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
    <ul className="profile-dropdown">
    <li>
      <NavLink to="/login" className={'nav-bar-links'} id='nav-bar-login'>Log In</NavLink>
    </li>
    <li>
      <NavLink to="/signup" className={'nav-bar-links'} id='nav-bar-signup'>Sign Up</NavLink>
    </li>
  </ul>
  </div>
  );
}

export default NoUserDropDown;
