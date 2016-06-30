import React, { Component } from 'react';
import {
  View,
  Text,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Navigator,
  Modal,
  ScrollView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid,
} from 'react-native';

import Home from '../../containers/Property';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../../containers/login/Login';
import styles from '../style'; 
var Button = require('react-native-button');

const COLOR_POSITIVE = '#387ef5';
const WHITE_COLOR = '#fff';
export default class LoginWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    console.log('componentDidMount :', this.props.auth);
  }

  componentWillMount() {
    this.props.checkAuth();
    console.log('componentWillMount :',this.props.auth);
  }

  _loginHandler() {
    let user = this.state.user
    this.props.signIn(user)
  }

  componentWillReceiveProps(nextProps) {
    let { isAuthenticated } = nextProps.auth;
    let { navigator } = nextProps;

    if(isAuthenticated) {
      navigator.replace({ name: 'Home', component: Home });
    }
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.props.auth.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.props.auth.transparent
      ? {padding: 5}
      : null;
    return (
      <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',backgroundColor: '#D05939',}}>
        <Modal
          animated={this.props.auth.animated}
          transparent={this.props.auth.transparent}
          visible={this.props.auth.modalVisible}
          onRequestClose={() => {this._setLoadingVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle,{flexDirection: 'row'}]}>
              <ProgressBarAndroid
                  styleAttr="Large"
                />
              <Text style={styles.modalText}>Loading ...</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.messageBox}>
          <Text style={{fontFamily: 'serif',bottom: 60,fontSize: 60, color: '#FCFAFA', textAlign: 'center'}}>
            PE
          </Text>
          <View style={{marginLeft: 20, marginRight: 20}} >
            <Text style={styles.textTitle}> Email </Text>
            <TextInput
              style={styles.textinput}
              placeholder='Enter email address'
              onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor='#C8684F'
              keyboardType= {'email-address'}
              onChangeText={(email) => this.setState({user: {email: email, password: this.state.user.password}})}
              value={this.state.user.email} />
            <Text style={styles.textTitle}> Password </Text>
            <TextInput
              ref='password'
              style={styles.textinput}
              placeholder='Enter password'
              placeholderTextColor='#C8684F'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({user: {email: this.state.user.email, password: password}})}
              value={this.state.user.password} />
          </View>
          <View >
            <Button 
              onPress={this._loginHandler.bind(this)}
              containerStyle={{flex:1,marginTop: 20,marginLeft: 20,marginRight: 20,padding:5, paddingTop: 10,height:45, borderRadius:50, backgroundColor: '#E1DBCB'}}
              style={{fontFamily: 'serif',fontSize: 15, color: '#C8684F'}} >
              LOGIN
            </Button>
            <Text style={styles.errorMessage}>{ this.props.auth.errorMessage }</Text>
          </View>
          <TouchableOpacity onPress={this.onRegisterClick}>
            <Text style={{marginTop: 30,color: '#fff',textAlign: 'center',alignItems: 'center',justifyContent: 'center'}}>No account yet? Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}