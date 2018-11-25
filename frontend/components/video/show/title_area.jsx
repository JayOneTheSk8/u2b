import React from 'react';
import LikeIcon from './icons/like';
import DislikeIcon from './icons/dislike';
import { intersection } from 'underscore';

class TitleArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeStatus: "grey",
      currentLike: this.props.currentLike
    }
    this.rate = this.rate.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.currentUser && this.state.likeStatus === 'blue') {
      this.setState({ likeStatus: "grey" })
    }
  }

  componentDidMount() {
    if (!this.props.currentUser) { return null; }
    const that = this;
    this.props.fetchLikes(this.props.videoId).then(
      (action) => {
        if (action.likes[that.props.currentUser.id]) {
          that.setState({ currentLike: action.likes[that.props.currentUser.id], likeStatus: "blue" })
        }
      }
    );
  }

  rate(e) {
    e.preventDefault();
    if (!this.props.loggedIn) {
      this.props.history.push(`/login`);
      return;
    }
    const videoId = this.props.videoId;
    if (this.state.likeStatus === "blue") {
      this.props.removeLike(videoId, this.state.currentLike);
      this.setState({ currentLike: null, likeStatus: "grey"});
    } else {
      this.props.addLike(videoId).then(
        (action) => {
          this.setState({ currentLike: action.like, likeStatus: "blue" });
        }
      );
    }
  }

  render() {
    return (
      <div className="title-area">
        <div>
          <p className="title">{this.props.title}</p>
        </div>
        <div className="likes-and-views">
          <div className='like-area'>
            <figure className="add-like" onClick={this.rate}>
              <LikeIcon color={this.state.likeStatus}/>
            </figure>
            <p className="like-count">{this.props.likeCount}</p>
          </div>
          <div className='dislike-area'>
            <figure className="add-dislike">
              <DislikeIcon color="grey"/>
            </figure>
            <p className="dislike-count">{this.props.dislikeCount}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TitleArea;
