import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { signUp } from '../../redux/actions/authActions';

class SignUp extends Component {
  state = {
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    password: ''
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.signUp(this.state);
  };
  render() {
    if (this.props.auth.uid) return <Redirect to="/dashboard" />;
    return (
      <div className="container">
        <form className="white signUp-form" id="form" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3 center">Sign Up</h5>
          <div className="row input-container name">
            <i className="small material-icons accountIcon col 2">account_circle</i>
            <div className="input-field firstName col s6">
              <input
                id="first_name"
                type="text"
                className="validate"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field lastName col s6">
              <input
                id="last_name"
                type="text"
                className="validate"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
          <div className="row input-container gender">
            <i className="small material-icons accountIcon col 2">face</i>
            <div className="input-field col s12">
              <select
                className="browser-default gender"
                name="gender"
                id="gender"
                onChange={this.handleChange}
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row input-container email">
            <i className="small material-icons col 2">mail</i>
            <div className="input-field email col s11">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={this.handleChange}
                className="validate"
                required
              />
            </div>
          </div>
          <div className=" row input-container password">
            <i className="small material-icons col 2">fingerprint</i>
            <div className="input-field password col s11">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
                className="validate"
                required
              />
            </div>
          </div>
          <div className="red-text center">
            {this.props.authError ? <p>{this.props.authError}</p> : null}
          </div>
          <div
            className="input-field"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <button className="btn pink waves-effect waves-light lighten-1 z-depth-0">
              Create Account
            </button>
            <div
              style={{
                display: 'flex',
                width: '223px',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <p>Already have an Account? </p>
              <Link to="/">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  authError: PropTypes.string,
  auth: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
