import React from 'react';
import { merge } from 'lodash';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, this.props.comment, { errorDisplay: 'show', disableSubmit: false });
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  update(e) {
    if (e.target.value === this.props.originalComment) {
      this.setState({ body: e.target.value, disableSubmit: true });
    } else {
      this.setState({ body: e.target.value, disableSubmit: false });
    }
  }

  componentDidMount() {
    if (this.state.body) {
      if (this.state.body === this.props.originalComment) {
        this.setState({ errorDisplay: "hide", disableSubmit: true });
      } else {
        this.setState({ errorDisplay: "hide" });
      }
    }
  }

  // passCommentFilter(commentBody) {
  //   const wordCheck = {};
  //   const words = commentBody.split(' ');
  //   const filterLetters = [
  // }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.body) {
      this.props.receiveCommentErrors([`Body can't be blank`]);
      return;
    }
    // else if (!this.passCommentFilter(this.state.body)) {
    //   this.props.removeCommentErrors([`Please refrain from using innapropriate language!`]);
    //   return;
    // }
    const videoId = this.props.match.params.videoId;
    this.props.submitAction(videoId, { id: this.props.editableComment, body: this.state.body });
    this.props.clearEdits();
    this.setState({ body: "" })
  }

  checkLoggedIn(e) {
    if (!this.props.loggedIn) {
      this.props.history.push(`/login`);
    }
  }

  errorMessages() {
    const errorList = this.props.errors.map((error, idx) => {
      return (
        <li className="comment-error" key={idx}>{error}</li>
      );
    });
    return errorList;
  }

  render() {
    let redden = "-red";
    let displayErrors = this.errorMessages();
    if (this.props.errors.length === 0 || this.state.errorDisplay === 'hide') {
      redden = "";
      displayErrors = "";
    }
    return (
      <>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <input onFocus={this.checkLoggedIn} className={`comment-input${redden}`} type='text' value={this.state.body} onChange={this.update} placeholder="Add a public comment..." />
          <div className="control-buttons">
            <button className="cancel-comment" onClick={this.props.clearEdits}>CANCEL</button>
            <ul>
              { displayErrors }
            </ul>
            <input disabled={this.state.disableSubmit} className="submit-comment" type='submit' value={this.props.buttonText}/>
          </div>
        </form>
      </>
    );
  }
}

export default CommentForm;
