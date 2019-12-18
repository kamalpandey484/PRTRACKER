import pr from '../models/pullrequest.model';

export const postData = async (mydata) => {
  const postPrData = await pr.updateOne({
    prLink: mydata.prLink,
  }, mydata, {
    upsert: true,
  })
    .then((res) => res)
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
  return postPrData;
};

export const getData = async (filters) => {
  // let defaultFilter = {};
  try {
    console.log(filters);
    const data = await pr.find({ $and: [{ raisedBy: { $ne: 'rhinogram-circleci' } }, filters] })
      .sort({ openDate: -1 });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.log(error);
  }
};

export const searchData = async (data) => {
  const myData = pr.find({
    jiraId: {
      $regex: new RegExp(data),
    },
  }, {
    _id: 0,
    _v: 0,
  }, (err, result) => result).limit(10);
  return myData;
};
