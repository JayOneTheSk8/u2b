import React from 'react';
import { merge } from 'lodash';
import UploadArea from './upload_area';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, this.props.video, { disabled: true });
    this.handleVideo = this.handleVideo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  componentDidUpdate() {
    if (this.state.videoFile && this.state.disabled === true) {
      this.setState({ disabled: false });
    } else if (!this.state.videoFile && this.state.disabled === false) {
      this.setState({ disabled: true });
    }
  }

  componentWillUnmount() {
    this.props.removeVideoErrors();
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleVideo(e) {
    const video = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({videoFile: video, videoUrl: fileReader.result, disabled: false});
    };
    if (video) {
      fileReader.readAsDataURL(video);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.disableButton(e);
    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[video]', this.state.videoFile);
    this.props.postVideo(formData);
  }

  errors() {
    const errors = this.props.errors.map((error, idx) => {
      return (
        <li key={idx}>{error}</li>
      );
    });
    return errors;
  }

  disableButton(e) {
    if (this.state.title && this.state.description && this.state.videoFile) {
      e.target.lastElementChild.disabled = true
    }
  }

  render() {
    console.log(this.state);
    if (!this.state.videoFile) {
      return (
        <>
          <UploadArea />
          <input id="video-upload" className='hidden-upload' type="file" onChange={this.handleVideo}/>
        </>
      );
    }
    // Ask how best to make the inputs no leave container when window shrinks
    // Also if offline, how to load the google font or make deterministic CSS for when offline
    return (
      <div className="full-video-form">
        <figure className="video-image">
          <video width="200">
            <source src={this.state.videoUrl} />
          </video>
        </figure>
        <form className="video-form" onSubmit={this.handleSubmit}>
            <ul className="upload-errors">
              {this.errors()}
            </ul>
            <input className='title-input' type="text" onChange={this.update('title')} value={this.state.title}/>
            <textarea className='description-input' onChange={this.update('description')} value={this.state.description}/>
            <input disabled={this.state.disabled} className='submit-video' type="submit" value="Post Video"/>
        </form>
      </div>
    );
  }
};

export default Upload;
