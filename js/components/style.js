'use strict';

import React from 'react';
import {
  StyleSheet,
  PixelRatio
} from 'react-native';

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  picker: {
    marginBottom: 10,
    color: 'grey'
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 5,
    fontFamily: 'serif',
    color: '#fff'
  },
  textinput: {
    height: 40, 
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#87331C',
    color: '#fff'
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 5,
    fontFamily: 'serif',
    color: '#000'
  },
  formInput: {
    height: 40, 
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#fff'
  },
  user_profile: {
    marginTop: 10, 
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'notoserif', 
    fontWeight: 'bold'
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 63,
    height: 81,
    margin: 5,    
  },
  listView: {
    paddingTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
  },
  wraper: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff'
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 120,
    width: 101,
  },
  formContainer:{
    flexDirection: 'column',
    margin: 10
  },
  form_container_child: {
    flexDirection: 'row'
  },
  button_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  containerButton: {
    flex:1,
    margin: 5,
    padding:5, 
    paddingTop: 10,
    height:45, 
    borderRadius:4, 
    backgroundColor: '#1E9BB7',
  },
  containerButtonSave: {
    flex:1,
    margin: 5,
    padding:5, 
    paddingTop: 10,
    height:45, 
    borderRadius:4, 
    backgroundColor: '#D05939'
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: 10,
    color: 'red',
    fontSize: 17
  },
  innerContainer: {
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#D05939'
  },
  modalText: {
    marginLeft: 15,
    fontFamily: 'serif',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    color: '#fff'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 80,
    width: 80,
    borderWidth: 1
  },
  imageContainer: {
    backgroundColor: 'transparent',
    borderColor: '#9B9B9B',
    margin: 5,
    flex: 1,
    flexDirection:'column',
  },
  containerImage: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  toolbar: {
    backgroundColor: '#D05939',
    height: 60,
  },
  profile_picture: {
    height: 160,
    borderRadius: 80,
    width: 160
  }
});