import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session/login_container';
import SigninFormContainer from './session/signup_container';
import VideoIndexContainer from './video/video_index_container';
import VideoUploadContainer from './video/upload/upload_container';
import VideoShowContainer from './video/show/show_container';
import NavBar from './navbar/navbar_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
  return (
    <>
      <NavBar />
      <div id="main-content">
        <Route exact path="/" component={VideoIndexContainer} />
        <Route path='/videos/:videoId' component={VideoShowContainer}/>
        <ProtectedRoute path="/upload" component={VideoUploadContainer} />
        <AuthRoute path="/signup" component={SigninFormContainer}/>
        <AuthRoute path="/login" component={LoginFormContainer}/>
      </div>
    </>
  );
};

export default App;
