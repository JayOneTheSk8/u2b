import React from 'react';
import MinimisedVideo from '../show/minimised_video';
import VideoGroup from '../video_group';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.fetchAction(this.props.match.params.userId);
  }


  render() {
    debugger
    const videos = this.props.videos.map(video => {
      return (
        <MinimisedVideo key={video.id} video={video} />
      );
    });
    if (videos.length === 0) {
      return (
        <div className="playlist">
          <VideoGroup
            message="Nothing Here :("
            title=""
            videos={videos}
          />
        </div>
      );
    }
    return (
      <div className='playlist'>
        <VideoGroup title={this.props.title} videos={videos}/>
      </div>
    );
  }
}

export default Playlist;
