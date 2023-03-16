// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import './Navigation.css';
import { IoIosMenu } from "react-icons/io";


function NoSessionProfileButton() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const profilePicCheck = () => {
    if (sessionUser) {
      // return <img>{sessionUser}</img>
    }
  }


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

  return (
    <div className="profile-button-container">
      <button onClick={openMenu} className='profile-button'>
        <div className="drop-down-button-container">
          <div className="drop-down-icon">
          <IoIosMenu />
            <img></img>
          </div>
        </div>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <NavLink to="/login" className={'nav-bar-links'} id='nav-bar-login'>Log In</NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={'nav-bar-links'} id='nav-bar-signup'>Sign Up</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NoSessionProfileButton;
