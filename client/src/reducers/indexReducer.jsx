import { combineReducers } from 'redux';
import prReducer from './prReducer';

export default combineReducers({
  pr: prReducer,
});
