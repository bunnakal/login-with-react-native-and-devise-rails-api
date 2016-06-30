import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Navigator
} from 'react-native'

import SplashScreen from './SplashScreen';
import Login from './login/Login'

export default class App extends Component {
  renderScene(route, navigator) {
    let Component = route.component

    return (
      <Component navigator={navigator} {...route.passProps} />
    )
  }

  render () {
    let initialRoute = { name: 'Login', component: Login }

    return (
      <Navigator style={styles.navigator}
        initialRoute={initialRoute}
        renderScene= {this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});
