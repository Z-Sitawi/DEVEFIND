import Database from './utils/db.js';
import express from 'express';
import Recruiterroutes from './routes/recruiterRouts.js';
import dotenv from 'dotenv';
import redisClient from './utils/redis.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Recruiterroutes);
app.get('/stats', Database.stats);

function main () {
  //! Connect to the database
  Database.connect()
    .then(() => {
      //! Connect to Redis Server
      redisClient.client.connect();
    })
    .then(() => {
      //! Run Express Server
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}

main();
