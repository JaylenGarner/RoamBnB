import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../../store/session';
import { useHistory } from "react-router-dom";
import '../DropDowns.css';


function ActiveUserDropDown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
      <div className="no-user-dropdown-container">
        <NavLink to="/trips" className='no-user-navbar-item dropdown-non-login' >Trips</NavLink>
        <NavLink to="/create" className='no-user-navbar-item dropdown-non-login' >Roambnb your home</NavLink>
        <NavLink to={`/${sessionUser.id}/spots`} className='no-user-navbar-item dropdown-non-login' >Manage Listings</NavLink>
        <span onClick={logout} className='no-user-navbar-item dropdown-non-login'>Log Out</span>
      </div>
  );
}

export default ActiveUserDropDown;
