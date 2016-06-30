import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import Login from '../containers/login/Login'
import Home from '../containers/Home'

const CONTAINER_BG_COLOR = '#246dd5';
const WHITE_COLOR = '#fff';

class SplashScreenWidget extends Component {
  componentWillMount() {
    this.props.checkAuth()
  }

  componentDidMount() {
    this._checkAuth()
  }

  _checkAuth() {
    setTimeout(() => {
      let nextState = { name: 'Login', component: Login }
      const { navigator, auth } = this.props;
      if(!auth.isAuthenticated) {
        navigator.replace(nextState);
      }
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      const { navigator } = nextProps;
      navigator.replace({ name: 'Home', component: Home });
    }
  }

  render() {
    return (
      <View style={styles.conatiner}>
        <Text style={styles.text}>Welcome Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: CONTAINER_BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: WHITE_COLOR,
    fontSize: 32
  }
});

module.exports = SplashScreenWidget;
