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
        <p className={`first-letter-${this.state.thumbnailLetter}`}>{this.state.username[0].toUpperCase()}</p>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="user-edit-area">

        <div className="thumbnail-preview">
          <div className={`user-border-${this.state.thumbnailBorder}`}>
            <div className={`user-circle-${this.state.thumbnailBackground}`}>
              { this.letterDecal() }
            </div>
          </div>
        </div>

        <form className="user-edit-form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.update('username')} value={this.state.username} />
          <select value={this.state.thumbnailBorder} className="border-selection" onChange={this.update('thumbnailBorder')}>
            <option disabled={this.props.borderColors.red} value="red">Red</option>
            <option disabled={this.props.borderColors.orange} value="orange">Orange</option>
            <option disabled={this.props.borderColors.yellow} value="yellow">Yellow</option>
            <option disabled={this.props.borderColors.green} value="green">Green</option>
            <option disabled={this.props.borderColors.blue} value="blue">Blue</option>
            <option disabled={this.props.borderColors.purple} value="purple">Purple</option>
            <option disabled={this.props.borderColors.black} value="black">Black</option>
            <option disabled={this.props.borderColors.pink} value="pink">Pink</option>
            <option disabled={this.props.borderColors.brown} value="brown">Brown</option>
          </select>
          <select value={this.state.thumbnailBackground} className="circle-selection" onChange={this.update('thumbnailBackground')}>
            <option disabled={this.props.circleColors.red} value="red">Red</option>
            <option disabled={this.props.circleColors.orange} value="orange">Orange</option>
            <option disabled={this.props.circleColors.yellow} value="yellow">Yellow</option>
            <option disabled={this.props.circleColors.green} value="green">Green</option>
            <option disabled={this.props.circleColors.blue} value="blue">Blue</option>
            <option disabled={this.props.circleColors.purple} value="purple">Purple</option>
            <option disabled={this.props.circleColors.black} value="black">Black</option>
            <option disabled={this.props.circleColors.white} value="white">White</option>
            <option disabled={this.props.circleColors.pink} value="pink">Pink</option>
            <option disabled={this.props.circleColors.brown} value="brown">Brown</option>
          </select>
          <select value={this.state.thumbnailLetter} className="letter-selection" onChange={this.update('thumbnailLetter')}>
            <option disabled={this.props.letterColors.red} value="red">Red</option>
            <option disabled={this.props.letterColors.orange} value="orange">Orange</option>
            <option disabled={this.props.letterColors.yellow} value="yellow">Yellow</option>
            <option disabled={this.props.letterColors.green} value="green">Green</option>
            <option disabled={this.props.letterColors.blue} value="blue">Blue</option>
            <option disabled={this.props.letterColors.purple} value="purple">Purple</option>
            <option disabled={this.props.letterColors.black} value="black">Black</option>
            <option disabled={this.props.letterColors.white} value="white">White</option>
            <option disabled={this.props.letterColors.pink} value="pink">Pink</option>
            <option disabled={this.props.letterColors.brown} value="brown">Brown</option>
          </select>
          <input disabled={this.state.disableSumbit} type="submit" className="edit-user-submit" value="CUSTOMIZE"/>
        </form>
        <button onClick={this.restoreDefaults}>Restore Default Colors</button>
      </div>
    );
  }
}

export default UserEditForm;
