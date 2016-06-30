import React, { Component } from 'react';
import LoginWidget from '../../components/login/LoginWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../../actions/auth';
import { checkAuth } from '../../actions/auth';

class Login extends Component {
  render() {
    return (
      <LoginWidget {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: bindActionCreators(checkAuth, dispatch),
    signIn: bindActionCreators(signIn, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
