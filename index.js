import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  CronJob,
} from 'cron';
import path from 'path';
import {
  postPullRequestData,
} from './src/toolboxes/pullrequest.toolboxes';
import pullRequests from './src/routers/pullrequest.router';

dotenv.config();
mongoose
  .connect(process.env.MLAB_CONNECTION, {
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
// eslint-disable-next-line no-new
new CronJob('1 12 */3 * * *', () => {
  console.log('Cron job running!');
  postPullRequestData();
}, null, true, 'Asia/Kolkata');

// Routes
app.use('/api/pullrequests/', pullRequests);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App Listening at port ${port}`);
});
