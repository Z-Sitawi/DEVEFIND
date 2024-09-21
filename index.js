import express from 'express';
import Database from './utils/db.js';
import redisClient from './utils/redis.js';
import transporter from './utils/emailValidation.js';
import RecruiterRoutes from './routes/recruiterRouts.js';
import DeveloperRoutes from './routes/developerRouts.js';
import Authentification from './controller/authController.js';
import FilterController from './controller/filtersController.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*'
}));

app.use(express.static(path.join(__dirname, 'devefind_frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'devefind_frontend', 'index.html'));
});

/* Routes */
app.use('/', RecruiterRoutes);
app.use('/', DeveloperRoutes);
app.get('/stats', Database.stats);
app.get('/api/filters', FilterController.get);
app.get('/api/validate/token', Authentification.isLoged);
app.get('/email/validation', Authentification.validateEmail);

function main () {
  //! Connect to the database
  Database.connect()
    .then(async () => {
      //! Connect to Redis Server
      await redisClient.client.connect();
      
      //! check if filters Exist
      await FilterController.setUpFilters();
      
      //! check if Email Transporter
      await transporter.verify();
      
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
