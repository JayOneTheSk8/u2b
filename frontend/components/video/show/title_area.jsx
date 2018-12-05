import React from 'react';
import LikeIcon from './icons/like';
import DislikeIcon from './icons/dislike';

class TitleArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeStatus: 'grey',
      dislikeStatus: 'grey',
      currentRating: null,
    };
  }

  componentDidUpdate() {
    if (!this.props.currentUser) {
      if (this.state.likeStatus === 'blue') {
        this.setState({ likeStatus: 'grey' });
      } else if (this.state.dislikeStatus === 'blue') {
        this.setState({ dislikeStatus: 'grey' });
      }
    }
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      return null;
    }
    const that = this;
    this.props.fetchRatings(this.props.videoId).then(action => {
      if (action.ratings[that.props.currentUser.id]) {
        const currentRating = action.ratings[that.props.currentUser.id];
        const name = currentRating.name;
        that.setState({ currentRating, [name + 'Status']: 'blue' });
      }
    });
  }

  rate(rating) {
    const that = this;
    return e => {
      if (!that.props.loggedIn) {
        that.props.history.push(`/login`);
        return;
      }
      const videoId = that.props.videoId;
      const otherRating = rating === 'like' ? 'dislike' : 'like';
      if (that.state.currentRating) {
        let currentRating = that.state.currentRating;
        if (currentRating.name === rating) {
          that.props.removeRating(videoId, currentRating);
          that.setState({
            currentRating: null,
            [rating + 'Status']: 'grey',
            [otherRating + 'Status']: 'grey',
          });
        } else {
          currentRating.name = rating;
          that.props.updateRating(videoId, currentRating);
          that.setState({
            currentRating,
            [rating + 'Status']: 'blue',
            [otherRating + 'Status']: 'grey',
          });
        }
      } else {
        that.props.addRating(videoId, { name: rating }).then(action => {
          that.setState({
            currentRating: action.rating,
            [action.rating.name + 'Status']: 'blue',
            [otherRating + 'Status']: 'grey',
          });
        });
      }
    };
  }

  render() {
    return (
      <div className="title-area">
        <div>
          <p className="title">{this.props.title}</p>
        </div>
        <div className="likes-and-views">
          <div className="views">
            {this.props.views === 1 ? `${this.props.views} view` : `${this.props.views} views`}
          </div>
          <div className="ratings">
            <div className="like-area">
              <figure className="add-like" onClick={this.rate('like')}>
                <LikeIcon color={this.state.likeStatus} />
              </figure>
              <p className="like-count">{this.props.likeCount}</p>
            </div>
            <div className="dislike-area">
              <figure className="add-dislike" onClick={this.rate('dislike')}>
                <DislikeIcon color={this.state.dislikeStatus} />
              </figure>
              <p className="dislike-count">{this.props.dislikeCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TitleArea;
