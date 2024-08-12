import express from 'express';
import RecruiterController from '../controller/recruiterController.js';
import Authentification from '../controller/authController.js';

const Recruiterroutes = express.Router();

Recruiterroutes.post('/recruiter/signup', RecruiterController.create);                 //! Sign Up 
Recruiterroutes.post('/recruiter/login', Authentification.loginRecruiter);          /* Sign in */
Recruiterroutes.post('/recruiter/logout', Authentification.logoutRecruiter);          //! Sign out

Recruiterroutes.get('/api/recruiter', RecruiterController.get);                     //TODO: Prevent Access if not loged in //TODO: Use Token Insted of ID

Recruiterroutes.delete('/api/recruiter', RecruiterController.del);                 //! Delete

Recruiterroutes.put('/api/recruiter', RecruiterController.update);                 //? Update

export default Recruiterroutes;
