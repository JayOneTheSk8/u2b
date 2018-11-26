import React from 'react';
import { merge } from 'lodash';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, this.props.comment, { redden: "", bodyError: null, errorDisplay: 'show', disableSubmit: false });
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.clearEdits = this.clearEdits.bind(this);
  }

  bodyError() {
    return (
      <>
        <p className="comment-error">Body cannot be blank</p>
      </>
    );
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
        this.setState({ disableSubmit: true });
      }
    }
  }

  componentWillUnmount() {
    this.props.removeCommentErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.body) {
      this.setState({ bodyError: this.bodyError(), redden: '-red' });
      return;
    }
    const videoId = this.props.match.params.videoId;
    this.props.submitAction(videoId, { id: this.props.editableComment, body: this.state.body });
    this.props.clearEdits();
    this.setState({ body: "", bodyError: null, redden: '' })
  }

  checkLoggedIn(e) {
    if (!this.props.loggedIn) {
      this.props.history.push(`/login`);
    }
  }

  clearEdits(e) {
    e.preventDefault();
    this.props.clearEdits();
    this.setState({ bodyError: null, redden: "", body: "" })
  }

  render() {
    return (
      <>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <input onFocus={this.checkLoggedIn} className={`comment-input${this.state.redden}`} type='text' value={this.state.body} onChange={this.update} placeholder="Add a public comment..." />
          <div className="control-buttons">
            <input disabled={this.state.disableSubmit} className="submit-comment" type='submit' value={this.props.buttonText}/>
            { this.state.bodyError }
            <button className="cancel-comment" onClick={this.clearEdits}>CANCEL</button>
          </div>
        </form>
      </>
    );
  }
}

export default CommentForm;
