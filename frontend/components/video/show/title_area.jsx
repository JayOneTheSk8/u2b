import React from 'react';
import LikeIcon from './icons/like';
import DislikeIcon from './icons/dislike';

class TitleArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="title-area">
        <div>
          <p className="title">{this.props.title}</p>
        </div>
        <div className="likes-and-views">
          <div className='like-area'>
            <figure className="add-like">
              <LikeIcon />
            </figure>
            <p className="like-count">{this.props.likes}</p>
          </div>
          <div className='dislike-area'>
            <figure className="add-dislike">
              <DislikeIcon />
            </figure>
            <p className="dislike-count">{this.props.dislikes}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TitleArea;
