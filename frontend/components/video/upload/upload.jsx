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
      this.setState({videoFile: video, videoUrl: fileReader.result, title: video.name, disabled: false});
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

  inputError(field) {
    return this.props.errors.filter(error => error.toLowerCase().includes(field))
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
            <input id="title" className='title-input' type="text" onChange={this.update('title')} value={this.state.title}/>

            <ul className='description-error'>{this.inputError('description')}</ul>
            <label htmlFor="description"></label>
            <textarea className='description-input' onChange={this.update('description')} value={this.state.description}/>
          </div>
            {/*need to disable on click without disrupting original action*/}
            <input disabled={this.state.disabled} className='submit-video' type="submit" value="Post Video"/>
        </form>
      </div>
    );
  }
};

export default Upload;
