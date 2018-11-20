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
    this.setState({videoFile: e.currentTarget.files[0], disabled: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[video]', this.state.videoFile);
    this.props.postVideo(formData);
    this.setState({ disabled: true });
  }

  errors() {
    const errors = this.props.errors.map((error, idx) => {
      return (
        <li key={idx}>{error}</li>
      );
    });
    return errors;
  }

  render() {
    if (!this.state.videoFile) {
      return (
        <>
          <UploadArea />
          <input id="video-upload" className='hidden-upload' type="file" onChange={this.handleVideo}/>
        </>
      );
    }
    return (
      <>
        <form className="video-form" onSubmit={this.handleSubmit}>
          <input className='title-input' type="text" onChange={this.update('title')} value={this.state.title}/>
          <textarea className='description-input' onChange={this.update('description')} value={this.state.description}/>
          <input disabled={this.state.disabled} className='submit-video' type="submit" value="Post Video"/>
        </form>
        <ul>
          {this.errors()}
        </ul>
      </>
    );
  }
};

export default Upload;
