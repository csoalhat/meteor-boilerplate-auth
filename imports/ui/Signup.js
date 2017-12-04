import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;

    if (password.length < 4) {
      return this.setState({error: 'Password must be more than 4 characters'})
    }

    this.props.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    })
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign up</h1>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : undefined }
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type='email' ref='email' name='email' placeholder='email'/>
              <input type='password' ref='password' name='password' placeholder='password'/>
              <button className="button">Sign Up</button>
            </form>
          </div>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default withTracker(() => {
  return {
    createUser: Accounts.createUser
  };
})(SignUp);
