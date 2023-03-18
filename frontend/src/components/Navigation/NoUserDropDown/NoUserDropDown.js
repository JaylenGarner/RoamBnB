import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../DropDowns.css';


function NoUserDropDown() {

  return (
    <div className="no-user-dropdown-container">
      <NavLink to="/login" className='no-user-navbar-item dropdown-login' >Log In</NavLink>
      <NavLink to="/signup" className='no-user-navbar-item dropdown-non-login' >Sign Up</NavLink>
      <NavLink to="/create" className='no-user-navbar-item dropdown-non-login' >Roambnb your home</NavLink>
    </div>
  );
}

export default NoUserDropDown;
