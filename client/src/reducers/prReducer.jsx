import { handleActions } from 'redux-actions';
import {
  GET_PR_TRACKER,
  SET_PR_TRACKER_LOADING,
  SET_PR_TRACKER_REFRESH_LOADING,
  SET_FILTERS,
} from '../actions/types';

const initialState = {
  prData: [],
  loadPrRefreshResponce: false,
  loadPrResponce: false,
  status: 'open',
  component: '',
  team: '',
};

const prReducer = handleActions({
  [GET_PR_TRACKER]: (state, action) => ({
    ...state,
    prData: [
      ...action.payload.map((data) => {
        // eslint-disable-next-line no-param-reassign
        data.isChecked = false;
        return data;
      }),
    ],
  }),
  [SET_PR_TRACKER_LOADING]: (state, action) => ({
    ...state,
    loadPrResponce: action.payload,
  }),
  [SET_PR_TRACKER_REFRESH_LOADING]: (state, action) => ({
    ...state,
    loadPrRefreshResponce: action.payload,
  }),
  [SET_FILTERS]: (state, action) => ({
    ...state,
    status: action.payload.status,
    component: action.payload.component,
    team: action.payload.team,
  }),
},
{
  ...initialState,
});

export default prReducer;
