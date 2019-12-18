/* eslint-disable arrow-body-style */
import { createAction } from 'redux-actions';
import axios from 'axios';
import {
  GET_PR_TRACKER,
  SET_PR_TRACKER_LOADING,
  SET_PR_TRACKER_REFRESH_LOADING,
  SET_FILTERS,
} from './types';

const getPrTrackerData = createAction(GET_PR_TRACKER);
const setPrTrackerRefreshLoader = createAction(SET_PR_TRACKER_REFRESH_LOADING);
const setPrTrackerLoader = createAction(SET_PR_TRACKER_LOADING);

export const setFilters = createAction(SET_FILTERS);

export const fetchPullRequests = (status, component, team) => {
  let url = '/api/pullrequests?';
  if (status) {
    url = `${url}status=${status}&`;
  }
  if (component) {
    url = `${url}component=${component}&`;
  }
  if (team) {
    url = `${url}team=${team}&`;
  }
  return (dispatch) => {
    dispatch(setPrTrackerLoader(true));
    axios.get(url)
      .then((res) => {
        dispatch(getPrTrackerData(res.data));
        dispatch(setPrTrackerLoader(false));
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
      });
  };
};

export const postPullRequests = () => {
  const url = '/api/pullrequests';
  return (dispatch) => {
    dispatch(setPrTrackerRefreshLoader(true));
    axios.post(url)
      .then((res) => {
        dispatch(setPrTrackerRefreshLoader(false));
        console.log(res);
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
      });
  };
};

export const searchPullRequests = (jiraId) => {
  return (dispatch) => {
    dispatch(setPrTrackerLoader(true));
    axios.get(`/api/pullrequests/search?q=RHIN-${jiraId}`)
      .then((res) => {
        dispatch(getPrTrackerData(res.data));
        dispatch(setPrTrackerLoader(false));
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
      });
  };
};
