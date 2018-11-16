import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session/login_container';
import SigninFormContainer from './session/signup_container';
import VideoIndexContainer from './video/video_index_container';
import NavBar from './navbar/navbar_container';
import { AuthRoute } from '../util/route_util';

const App = () => {
  return (
    <>
      <NavBar />
      <div id="content">
        <Route exact path="/" component={VideoIndexContainer} />
        <AuthRoute path="/signup" component={SigninFormContainer}/>
        <AuthRoute path="/login" component={LoginFormContainer}/>
      </div>
    </>
  );
};

export default App;
