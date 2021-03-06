import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_container';
import SigninFormContainer from './session/signup_container';
import VideoIndexContainer from './video/video_index_container';
import VideoUploadContainer from './video/upload/upload_container';
import EditVideoContainer from './video/upload/edit_video';
import VideoShowContainer from './video/show/show_container';
import UserVideoIndexContainer from './video/user_videos/user_video_index_container';
import UserEditFormContainer from './video/user_videos/user_edit_container';
import SubscriptionsPageContainer from './video/subscriptions/subscriptions_page_container';
import LikedVideosContainer from './video/playlists/liked_videos_container';
import SearchPage from './navbar/search/search_page';
import NavBar from './navbar/navbar_container';
import Modal from './modal/modal_container';
import { AuthRoute, ProtectedRoute, SecuredRoute } from '../util/route_util';

const App = () => {
  return (
    <>
      <NavBar />
      <div id="main-content">
        <Modal />
        <Switch>
          <Route exact path="/" component={VideoIndexContainer} />
          <Route exact path="/videos/:videoId" component={VideoShowContainer} />
          <Route path="/users/:userId/videos" component={UserVideoIndexContainer} />
          <Route path="/users/:userId/likes" component={LikedVideosContainer} />
          <SecuredRoute path="/users/:userId/subscriptions" component={SubscriptionsPageContainer} />
          <SecuredRoute path="/users/:userId/edit" component={UserEditFormContainer} />
          <Route path="/results" component={SearchPage} />
          <ProtectedRoute path="/upload" component={VideoUploadContainer} />
          <ProtectedRoute
            path="/videos/:videoId/edit"
            component={EditVideoContainer}
          />
          <AuthRoute path="/signup" component={SigninFormContainer} />
          <AuthRoute path="/login" component={LoginFormContainer} />
        </Switch>
      </div>
    </>
  );
};

export default App;
