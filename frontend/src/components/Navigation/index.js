import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/airbnb.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className={'nav-bar-links'} id='nav-bar-login'>Log In</NavLink>
        <NavLink to="/signup" className={'nav-bar-links'} id='nav-bar-signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-bar'>
        <NavLink exact to="/" className={'home-button'}>
          <a href='' className='logo'>
            <img className='logo' src={logo} alt='airbnb logo'/>
          </a>
        </NavLink>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
