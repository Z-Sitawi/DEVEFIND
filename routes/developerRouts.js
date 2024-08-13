import express from 'express';
import DeveloperController from '../controller/developerController.js';
import Authentification from '../controller/authController.js';

const DeveloperRoutes = express.Router();

DeveloperRoutes.post('/devloper/signup', DeveloperController.create);                 //! Sign Up 
DeveloperRoutes.post('/devloper/login', Authentification.loginDeveloper);          /* Sign in */
DeveloperRoutes.post('/devloper/logout', Authentification.logoutDeveloper);          //! Sign out

DeveloperRoutes.get('/api/devloper', DeveloperController.get);
DeveloperRoutes.get('/api/devloper/all', DeveloperController.getAll);

DeveloperRoutes.delete('/api/devloper', DeveloperController.del);                 //! Delete

// DeveloperRoutes.put('/api/devloper', DeveloperController.update);                 //? Update

export default DeveloperRoutes;
