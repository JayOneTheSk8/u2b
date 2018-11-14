import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session/login_container'
import SigninFormContainer from './session/signup_container'
import VideoIndexContainer from './video/video_index_container';
// import NavbarContainer from './navbar/navbar_container';

const App = () => {
  return (
    <>

      {/*<NavbarContainer />*/}
      <Route exact path="/" component={VideoIndexContainer}/>
      <Route exact path="/signup" component={SigninFormContainer}/>
      <Route exact path="/login" component={LoginFormContainer}/>
    </>
  );
};

export default App;
