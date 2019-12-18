import { postPullRequestData } from '../toolboxes/pullrequest.toolboxes';

import {
  getData,
  searchData,
} from '../db/services/pullrequest.service';

export const postPullRequests = async (req, res) => {
  await postPullRequestData('open');
  res.json('successfully done!');
};

export const getPullRequests = async (req, res) => {
  const status = req.query;
  const data = await getData(status).then((result) => result);
  return res.json(data);
};

export const searchPullRequests = async (req, res) => {
  const { q } = req.query;
  const data = await searchData(q).then((result) => result);
  return res.json(data);
};
