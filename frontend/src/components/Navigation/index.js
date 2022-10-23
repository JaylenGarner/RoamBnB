import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SessionProfileButton from './SessionProfileButton';
import NoSessionProfileButton from './NoSessionProfileButton';
import logo from '../../assets/airbnb.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let profileButton;
  if (sessionUser) {
    profileButton = (
      <SessionProfileButton user={sessionUser}/>
    );
  } else {
    profileButton = (
      <NoSessionProfileButton />
    );
  }

  return (
    <div className='nav-bar'>
        <NavLink exact to="/" className={'home-button'}>
          <a href='' className='logo'>
            <img className='logo' src={logo} alt='airbnb logo'/>
          </a>
        </NavLink>
        {isLoaded && profileButton}
    </div>
  );
}

export default Navigation;
