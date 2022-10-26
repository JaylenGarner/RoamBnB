// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import CreateSpotForm from "../CreateSpotForm";
import './Navigation.css';

function SessionProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // const spotForm = (e) => {
  //   e.preventDefault();
  //   <Redirect to='/create'></Redirect>
  // }

  return (
    <div className="profile-button-container">
      <button onClick={openMenu} className='profile-button'>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <h3>{user.email}</h3>
            <NavLink to='/create'>Create a Spot</NavLink>
            <button onClick={logout}>Log Out</button>
         </ul>
      )}
    </div>
  );
}

export default SessionProfileButton;
