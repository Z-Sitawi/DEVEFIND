import express from 'express';
import RecruiterController from '../controller/recruiterController.js';
import Authentification from '../controller/authController.js';

const RecruiterRoutes = express.Router();

RecruiterRoutes.post('/recruiter/signup', RecruiterController.create);                 //! Sign Up 
RecruiterRoutes.post('/recruiter/login', Authentification.loginRecruiter);          /* Sign in */
RecruiterRoutes.post('/recruiter/logout', Authentification.logoutRecruiter);          //! Sign out

RecruiterRoutes.get('/api/recruiter', RecruiterController.get);

RecruiterRoutes.delete('/api/recruiter', RecruiterController.del);                 //! Delete

RecruiterRoutes.put('/api/recruiter', RecruiterController.update);                 //? Update

export default RecruiterRoutes;
