import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Attributes from '../Attributes/Attributes.jsx';
import Layers from '../Layers/Layers.jsx';
import CheckInputs from '../CheckInputs/CheckInputs.jsx';
import NextSteps from '../NextSteps/NextSteps.jsx';
import Results from '../Results/Results.jsx';
import Projects from '../Projects/Projects.jsx';
import EditProject from '../EditProject/EditProject.jsx';
import EditLayer from '../EditLayer/EditLayer.jsx';
import EditAttribute from '../EditAttribute/EditAttribute.jsx';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div
      style={{
        backgroundColor: '#EEEEEE',
        fontFamily: 'Roboto'
      }}>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <Projects />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>
          <ProtectedRoute exact path="/projects">
            <Projects />
          </ProtectedRoute>
          <ProtectedRoute exact path="/layers/:id">
            <Layers />
          </ProtectedRoute>
          <ProtectedRoute exact path="/attributes/:id">
            <Attributes />
          </ProtectedRoute>
          <ProtectedRoute exact path="/checkinputs/:id">
            <CheckInputs />
          </ProtectedRoute>
          <ProtectedRoute exact path="/results/:id">
            <Results />
          </ProtectedRoute>
          <ProtectedRoute exact path="/nextsteps">
            <NextSteps />
          </ProtectedRoute>
          <ProtectedRoute exact path="/editproject/:id">
            <EditProject />
          </ProtectedRoute>
          <ProtectedRoute exact path="/editlayer/:id">
            <EditLayer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/editattribute/:id">
            <EditAttribute />
          </ProtectedRoute>
          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
