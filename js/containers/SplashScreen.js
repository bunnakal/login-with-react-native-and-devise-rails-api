import React, { Component } from 'react';
import SplashScreenWidget from '../components/SplashScreenWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuth } from '../actions/auth';

class SplashScreen extends Component {
  render() {
    return (
      <SplashScreenWidget {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: bindActionCreators(checkAuth, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
