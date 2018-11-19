import React from 'react';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.video;
    this.handleVideo = this.handleVideo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleVideo(e) {
    this.setState({videoFile: e.currentTarget.files[0]});
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video[title]', this.state.title);
    formData.append('video[description]', this.state.description);
    formData.append('video[video]', this.state.videoFile);
    this.props.postVideo(formData);
  }

  render() {
    console.log(this.state); //TEST
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>UPLOAD HERE</h1>
          <input type="text" onChange={this.update('title')} value={this.state.title}/>
          <textarea onChange={this.update('description')} value={this.state.description}/>
          <input type="file" onChange={this.handleVideo}/>
          <input type="submit" value="Post Video"></input>
        </form>
      </>
    );
  }
};

export default Upload;
