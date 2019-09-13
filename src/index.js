import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  CronJob,
} from 'cron';
import {
  postPullRequestData,
} from './toolboxes/pullrequest.toolboxes';
import pullRequests from './routers/pullrequest.router';

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
  });

const app = express();

app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());


// Cron Jobs
new CronJob('1 */3 * * *', () => {
  postPullRequestData();
}, null, true, 'Asia/Kolkata');

// Routes
app.use('/api/pullrequests/', pullRequests);
const port = process.env.PORT||4000;
// Start the server
app.listen(port, () => {
  console.log(`App Listening at port ${port}`);
});
