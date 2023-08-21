import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import reqForAuth from './reqForAuthReducer';
import reqMade from './reqMadeReducer';
import request from './requestReducer';
import selects from './selectsReducer';
import requestsType from './requestsTypeReducer';
import recursoReducer from './recursoReducer'
import solicitudReducer from './solicitudReducer';
import zonasUbicacionReducer from './zonasUbicacionReducer';

export default combineReducers({
  auth,
  alert,
  reqForAuth,
  reqMade,
  request,
  selects,
  requestsType,
  recursoReducer,
  solicitudReducer,
  zonasUbicacionReducer
});
