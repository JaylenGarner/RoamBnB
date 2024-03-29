import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from './components/HomePage'
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotDetails from "./components/SpotDetails/index.js";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotReviews from "./components/SpotReviews";
import UserBookings from "./components/Bookings/UserBookings";
import BookingPage from "./components/BookingPage";


// import TestComponent from "./components/TestComponent/index.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/trips">
            <UserBookings />
          </Route>
          <Route exact path="/trips/:bookingId">
            <BookingPage />
          </Route>
          <Route path="/:userId/spots">
            <HomePage />
          </Route>
          <Route exact path='/create'>
            <CreateSpotForm />
          </Route>
          <Route exact path='/:spotId'>
            <SpotDetails />
          </Route>
          <Route path='/:spotId/edit'>
            <EditSpotForm />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
