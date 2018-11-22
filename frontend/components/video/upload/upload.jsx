import React from 'react';
import { merge } from 'lodash';
import UploadArea from './upload_area';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, this.props.video, { disabled: true });
    this.handleVideo = this.handleVideo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (!video.type.toLowerCase().includes('video')) {
      this.props.receiveVideoErrors(['File must be a video']);
      return;
    }
    this.props.removeVideoErrors();
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({videoFile: video, videoUrl: fileReader.result, title: video.name, disabled: false});
    };
    if (video) {
      fileReader.readAsDataURL(video);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    this.setState({ disabled: true }); //Async so the rest will follow
    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[video]', this.state.videoFile);
    this.props.postVideo(formData).then(
      (action) => (that.props.history.push(`/videos/${action.video.id}`)),
      (error) => (that.setState({ disabled: false }))
    );
  }

  inputError(field) {
    return this.props.errors.filter(error => error.toLowerCase().includes(field))
  }

  render() {
    if (!this.state.videoFile) {
      return (
        <>
          <UploadArea />
          <input id="video-upload" className='hidden-upload' type="file" accept="video/*" onChange={this.handleVideo}/>
          <ul className="upload-error">{this.inputError('video')}</ul>
        </>
      );
    }
    return (
      <div className="full-video-form">
        <figure className="video-image">
          <video width="200">
            <source src={this.state.videoUrl} />
          </video>
        </figure>
        <form className="video-form" onSubmit={this.handleSubmit}>
          <div className="input-fields">
            <ul className='title-error'>{this.inputError('title')}</ul>
            <label htmlFor="title"></label>
            <input id="title" className='title-input' type="text" onChange={this.update('title')} placeholder="Title" value={this.state.title}/>

            <ul className='description-error'>{this.inputError('description')}</ul>
            <label htmlFor="description"></label>
            <textarea className='description-input' onChange={this.update('description')} placeholder="Description" value={this.state.description}/>
          </div>
            <input disabled={this.state.disabled} className='submit-video' type="submit" value="Post Video"/>
        </form>
      </div>
    );
  }
};

export default Upload;
