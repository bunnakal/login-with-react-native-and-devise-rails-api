import * as types from '../constants/ActionTypes'
import * as C from '../env';
import { AsyncStorage } from 'react-native';
import { parseResponse } from "../utils/handle-fetch-response";

export createProperty(properties) {
  console.log('create properties :',properties)
  return {
    type: types.CREATE_PROPERTY,
    isFetching: true,
    properties
  }
}