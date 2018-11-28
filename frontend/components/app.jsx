import React from 'react';
import { Route } from 'react-router-dom';
import LoginFormContainer from './session/login_container';
import SigninFormContainer from './session/signup_container';
import VideoIndexContainer from './video/video_index_container';
import VideoUploadContainer from './video/upload/upload_container';
import VideoShowContainer from './video/show/show_container';
import UserVideoIndexContainer from './video/user_videos/user_video_index_container';
import NavBar from './navbar/navbar_container';
import Modal from './modal/modal_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => {
  return (
    <>
      <NavBar />
      <div id="main-content">
        <Modal />
        <Route exact path="/" component={VideoIndexContainer} />
        <Route path='/videos/:videoId' component={VideoShowContainer}/>
        <Route path='/users/:userId/videos' component={UserVideoIndexContainer}/>
        <ProtectedRoute path="/upload" component={VideoUploadContainer} />
        <AuthRoute path="/signup" component={SigninFormContainer}/>
        <AuthRoute path="/login" component={LoginFormContainer}/>
      </div>
    </>
  );
};

// make modal a component here either it has a non display or it has a block display. COnditional logic
export default App;
