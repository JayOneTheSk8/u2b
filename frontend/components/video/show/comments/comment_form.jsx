import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.comment;
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  update(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const videoId = this.props.match.params.videoId;
    this.props.submitAction(videoId, this.state);
    this.setState({ body: '' })
  }

  checkLoggedIn(e) {
    if (!this.props.loggedIn) {
      this.props.history.push(`/login`);
    }
  }

  render() {
    if (this.props.buttonText === "SAVE") {
      <input type='text' className="comment-input" value={this.state.body} onChange={this.update} placeholder="Add a public comment..." />
    }
    return (
      <>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <input onFocus={this.checkLoggedIn} className="comment-input" type='text' value={this.state.body} onChange={this.update} placeholder="Add a public comment..." />
          {/*put cancel button here*/}
          <input className="submit-comment" type='submit' value={this.props.buttonText}/>
        </form>
      </>
    );
  }
}

export default CommentForm;
