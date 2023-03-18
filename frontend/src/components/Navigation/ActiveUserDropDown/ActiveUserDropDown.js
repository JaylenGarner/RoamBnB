// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../../store/session';
import './ActiveUserDropDown.css';

function ActiveUserDropDown({ user }) {
  const dispatch = useDispatch();


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <button onClick={logout}>Log Out</button>
  );
}

export default ActiveUserDropDown;
