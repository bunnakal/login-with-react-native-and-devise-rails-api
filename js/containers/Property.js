import React, { Component } from 'react';
import PropertyWidget from '../components/PropertyWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../actions/auth';
import { checkAuth } from '../actions/auth';

class Property extends Component {
  render() {
    console.log('Property');
    return (
      <PropertyWidget {...this.props}/>
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
    signOut: bindActionCreators(signOut, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Property)
