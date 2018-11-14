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
        <>
          <label htmlFor='verification' className="login-input-label"></label>
          <input id="verification" type='password' onChange={this.update('passVerify')} value={this.state.passVerify} placeholder="Verify Password"/>
        </>
      );
    }
  }

  passwordErrorRender(){
    if (this.state.passwordError !== "") {
      return (
        <p>{this.state.passwordError}</p>
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
      <div className='form-page'>
        <div className='form-box'>
          <h2>{this.props.formType}</h2>

          { this.renderErrors() }
          { this.passwordErrorRender() }
          <form onSubmit={this.handleSubmit} className="user-form">
            <section className='user-info'>

                <label htmlFor="username" className="login-input-label"></label>
                <input id="username" type='text' onChange={this.update('username')} value={this.state.username} placeholder="Username"/>

                <label htmlFor='password' className="login-input-label"></label>
                <input id="password" type='password' onChange={this.update('password')} value={this.state.password} placeholder="Password"/>

              { this.passwordVerifyField() }
            </section>

            <footer className="login-links">
              <Link to={this.props.formType === 'Sign Up' ? '/login' : '/signup'} className="switch-register">
                {this.props.formType === 'Sign Up' ? "Log In" : "Sign Up"}
              </Link>

              <input className="submit-button" type="submit" value={this.props.formType}/>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default SessionForm;
