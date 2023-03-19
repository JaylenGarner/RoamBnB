import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ActiveUserDropDown from './ActiveUserDropDown/ActiveUserDropDown';
import NoUserDropDown from './NoUserDropDown/NoUserDropDown';
import logo from '../../assets/airbnb.png'
import { IoIosMenu } from "react-icons/io";
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
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

  const profilePicCheck = () => {
    if (sessionUser) {
      return <img src={sessionUser.image} className='drop-down-image'></img>
    } else {
      return <img src={'https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png'} className='drop-down-image'></img>
    }
  }

  return (
    <div className='nav-bar'>
        <NavLink exact to="/" className={'home-button'}>
            <img className='logo' src={logo} alt='airbnb logo'/>
        </NavLink>
        <NavLink exact to="/create" className='roambnb-your-home'>
        <div className='roambnb-your-home-container'>
          <span >Roambnb your home</span>
        </div>
        </NavLink>
        {isLoaded && (
            <div className="profile-button-container">
            <button onClick={openMenu} className='profile-button'>
              <div className="drop-down-button-container">
                <div className="drop-down-icons">
                <div className='drop-down-lines'><IoIosMenu /></div>
                {profilePicCheck()}
                </div>
              </div>
            </button>
            {showMenu && (
              <div className="drop-down-container">
                {sessionUser && <ActiveUserDropDown />}
                {!sessionUser && <NoUserDropDown />}
              </div>
            )}
            </div>
        )}
    </div>
  );
}

export default Navigation;
