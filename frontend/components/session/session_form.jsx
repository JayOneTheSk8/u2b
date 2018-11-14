import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { merge } from 'lodash';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordVerifyField = this.passwordVerifyField.bind(this);
  }

  update(field){
    return (e) => {
      this.setState({ [field]: e.target.value })
    };
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.formType === 'Sign Up' && this.state.password !== this.state.passVerify) {
      const username = this.state.username;
      this.setState({ username, password: '', passVerify: '', passwordError: "Passwords Do Not Match" });
    } else {
      const user = merge({}, { username: this.state.username, password: this.state.password });
      this.props.action(user);
      this.setState(this.props.defaultState);
    }
  }

  renderErrors() {
    if (this.props.errors.length === 0) { return; }
    const allErrors = this.props.errors.map((error, idx) => {
      return (<li key={idx}>{error}</li>);
    });
    return (
      <ul>
        {allErrors}
      </ul>
    );
  }

  passwordVerifyField() {
    if (this.props.formType === "Sign Up") {
      return (
        <label>
          Verify Password:
          <input type='password' onChange={this.update('passVerify')} value={this.state.passVerify}/>
        </label>
      );
    }
  }

  render(){
    if (this.props.loggedIn) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <>
        <h2>{this.props.formType}</h2>

        { this.renderErrors() }
        <p>{this.state.passwordError}</p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type='text' onChange={this.update('username')} value={this.state.username}/>
          </label>

          <label>
            Password:
            <input type='password' onChange={this.update('password')} value={this.state.password}/>
          </label>

          { this.passwordVerifyField() }

          <input type="submit" value={this.props.formType}/>

          <Link to={this.props.formType === 'Sign Up' ? '/login' : '/signup'}>
            {this.props.formType === 'Sign Up' ? "Log In" : "Sign Up"}
          </Link>
        </form>
      </>
    );
  }
}

export default SessionForm;
