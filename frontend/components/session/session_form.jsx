import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { merge } from 'lodash';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.localErrors = this.props.errors;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordVerifyField = this.passwordVerifyField.bind(this);
    // this.focus = this.focus.bind(this);
    // this.unFocus = this.unFocus.bind(this);
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  update(field){
    return (e) => {
      this.setState({ [field]: e.target.value })
    };
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.props.formType === 'Sign Up' && this.state.password !== this.state.passVerify) {
      this.props.passwordMatchError();
    } else {
      const user = merge({}, { username: this.state.username, password: this.state.password });
      this.props.action(user);
    }
  }

  renderErrors() {
    if (this.props.errors.length === 0) { return; }
    const allErrors = this.props.errors.map((error, idx) => {
      return (<li className="login-errors" key={idx}>{error}</li>);
    });
    return allErrors;
  }

  passwordVerifyField(errorSet) {
    if (this.props.formType === "Sign Up") {
      return (
        <>
          <label htmlFor='match' className="login-input-label"></label>
          <input id="match" type='password' onChange={this.update('passVerify')} value={this.state.passVerify} placeholder="Confirm Password" className={errorSet.classNames.match}/>
          <ul className="clear-ul">{errorSet.match}</ul>
        </>
      );
    }
  }

  setErrors() {
    const errors = this.renderErrors();
    debugger
    let errorSet = { username: [], password: [], match: [], classNames: { username: 'input-field', password: 'input-field', match: 'input-field' } };
    if (errors === undefined) { return errorSet; }
    for (let i = 0; i < errors.length; i++) {
      const error = errors[i].props.children
      if (error.toLowerCase().includes('username')) {
        errorSet.username.push(<li key={i} className="login-errors">{error}</li>);
        errorSet.classNames.username += ' make-red';
      } else if (error.toLowerCase().includes('password') && !error.toLowerCase().includes('username') && !error.toLowerCase().includes('match')) {
        errorSet.password.push(<li key={i} className="login-errors">{error}</li>);
        errorSet.classNames.password += ' make-red';
      } else if (error.toLowerCase().includes('match')) {
        errorSet.match.push(<li key={i} className="login-errors">{error}</li>);
        errorSet.classNames.match += ' make-red';
      }
    }
    errorSet = this.setCheck(errorSet);
    return errorSet;
  }

  setCheck(errorSet){
    const errorCheck = merge({}, errorSet);
    if (errorCheck.username.length === 0) {
      errorCheck.username = "";
    }
    if (errorCheck.password.length === 0) {
      errorCheck.password = "";
    }
    if (errorCheck.match.length === 0) {
      errorCheck.match = "";
    }
    return errorCheck;
  }

  render(){
    const errorSet = this.setErrors();
    if (this.props.loggedIn) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className='form-page'>
        <div className='form-box'>
          <h2 className='session-header'>{this.props.formType}</h2>
          <form onSubmit={this.handleSubmit} className="user-form">
            <section className='user-info'>

              <label htmlFor="username" className="login-input-label"></label>
              <input id="username" type='text' onChange={this.update('username')} value={this.state.username} placeholder="Username" className={errorSet.classNames.username}/>
              <ul className="clear-ul">{errorSet.username}</ul>

              <label htmlFor='password' className="login-input-label"></label>
              <input id="password" type='password' onChange={this.update('password')} value={this.state.password} placeholder="Password" className={errorSet.classNames.password}/>
              <ul className="clear-ul">{errorSet.password}</ul>

              { this.passwordVerifyField(errorSet) }
            </section>

            <footer className="login-links">
              <Link to={this.props.formType === 'Sign Up' ? '/login' : '/signup'} className="switch-register">
                {this.props.formType === 'Sign Up' ? "Log In" : "Sign Up"}
              </Link>

              <input className="submit-button" type="submit" value={this.props.formType}/>
            </footer>
          </form>
          <button onClick={this.props.demoLogin} className="demo-login">Demo User Login</button>
        </div>
      </div>
    );
  }
}

export default SessionForm;

// focus(e) {
//   this.unFocus(e);
//   // if (e.currentTarget.value !== "") { return; }
//   e.currentTarget.previousSibling.className += " small-letters"
// }
//
// unFocus(e) {
  //   // debugger
  //   if (e.currentTarget.value !== "") { return; }
  //   const allSiblings = e.currentTarget.parentElement.children;
  //   for (let i = 0; i < allSiblings.length; i += 2) {
    //     if (allSiblings[i].className === "login-input-label small-letters") {
      //       allSiblings[i].className = "login-input-label"
      //     }
      //   }
      // }
