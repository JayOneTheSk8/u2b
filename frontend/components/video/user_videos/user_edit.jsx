import React from 'react';
import { merge } from 'lodash';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = merge({}, this.props.currentUser, { disableSumbit: false});
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restoreDefaults = this.restoreDefaults.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ disableSumbit: true });
    const user = {
      id: this.state.id,
      username: this.state.username,
      thumbnail_border: this.state.thumbnailBorder,
      thumbnail_background: this.state.thumbnailBackground,
      thumbnail_letter: this.state.thumbnailLetter,
    };
    this.props.updateUser(user).then(
      (action) => this.props.history.push('/'),
      (error) => this.setState({ disableSumbit: false })
    );
  }

  restoreDefaults(e) {
    e.preventDefault();
    this.props.updateUser(this.props.defaultSettings).then(
      (action) => this.props.history.push('/'),
      (error) => this.setState({ disableSumbit: false })
    );
  }

  update(field) {
    return (e) => {
      let changeSubmit;
      if (e.target.value) {
        changeSubmit = false;
      } else {
        changeSubmit = true;
      }
      this.setState({ [field]: e.target.value, disableSumbit: changeSubmit });
    };
  }

  letterDecal() {
    if (this.state.username) {
      return (
        <p className={`preview-first-letter-${this.state.thumbnailLetter}`}>{this.state.username[0].toUpperCase()}</p>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="user-edit-area">

        <figure className="preview-area">
          <p className="thumb-preview-sign">Preview:</p>
          <div className="thumbnail-preview">
            <div className={`preview-user-border-${this.state.thumbnailBorder}`}>
              <div className={`preview-user-circle-${this.state.thumbnailBackground}`}>
                { this.letterDecal() }
              </div>
            </div>
          </div>
        </figure>

        <section className="user-edit-form-area">
          <form className="user-edit-form" onSubmit={this.handleSubmit}>
            <article className="username-edit">
              <label htmlFor="username" className="username-edit-label">Username</label>
              <input id="username" className="username-edit-input" type="text" onChange={this.update('username')} value={this.state.username} />
            </article>

            <article className="thumbnail-edit">
              <label className="thumbnail-dropdown">
                Border
                <select value={this.state.thumbnailBorder} className="thumbnail-selection" onChange={this.update('thumbnailBorder')}>
                  <option className="thumbnail-option" value="red">Red</option>
                  <option className="thumbnail-option" value="orange">Orange</option>
                  <option className="thumbnail-option" value="yellow">Yellow</option>
                  <option className="thumbnail-option" value="green">Green</option>
                  <option className="thumbnail-option" value="blue">Blue</option>
                  <option className="thumbnail-option" value="purple">Purple</option>
                  <option className="thumbnail-option" value="black">Black</option>
                  <option className="thumbnail-option" value="pink">Pink</option>
                  <option className="thumbnail-option" value="brown">Brown</option>
                </select>
              </label>

              <label className="thumbnail-dropdown">
                Background
                <select value={this.state.thumbnailBackground} className="thumbnail-selection" onChange={this.update('thumbnailBackground')}>
                  <option className="thumbnail-option" value="red">Red</option>
                  <option className="thumbnail-option" value="orange">Orange</option>
                  <option className="thumbnail-option" value="yellow">Yellow</option>
                  <option className="thumbnail-option" value="green">Green</option>
                  <option className="thumbnail-option" value="blue">Blue</option>
                  <option className="thumbnail-option" value="purple">Purple</option>
                  <option className="thumbnail-option" value="black">Black</option>
                  <option className="thumbnail-option" value="white">White</option>
                  <option className="thumbnail-option" value="pink">Pink</option>
                  <option className="thumbnail-option" value="brown">Brown</option>
                </select>
              </label>

              <label className="thumbnail-dropdown">
                Letter
                <select value={this.state.thumbnailLetter} className="thumbnail-selection" onChange={this.update('thumbnailLetter')}>
                  <option className="thumbnail-option" value="red">Red</option>
                  <option className="thumbnail-option" value="orange">Orange</option>
                  <option className="thumbnail-option" value="yellow">Yellow</option>
                  <option className="thumbnail-option" value="green">Green</option>
                  <option className="thumbnail-option" value="blue">Blue</option>
                  <option className="thumbnail-option" value="purple">Purple</option>
                  <option className="thumbnail-option" value="black">Black</option>
                  <option className="thumbnail-option" value="white">White</option>
                  <option className="thumbnail-option" value="pink">Pink</option>
                  <option className="thumbnail-option" value="brown">Brown</option>
                </select>
              </label>
            </article>

            <input disabled={this.state.disableSumbit} type="submit" className="edit-user-submit" value="UPDATE INFO"/>
          </form>
          <button className="restore-defaults" onClick={this.restoreDefaults}>Restore Default Colors</button>
        </section>
      </div>
    );
  }
}

export default UserEditForm;
