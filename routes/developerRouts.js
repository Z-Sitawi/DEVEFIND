import express from 'express';
import DeveloperController from '../controller/developerController.js';
import Authentification from '../controller/authController.js';

const DeveloperRoutes = express.Router();

DeveloperRoutes.post('/developer/signup', DeveloperController.create);                 //! Sign Up 
DeveloperRoutes.post('/developer/login', Authentification.loginDeveloper);          /* Sign in */
DeveloperRoutes.post('/developer/logout', Authentification.logoutDeveloper);          //! Sign out

DeveloperRoutes.get('/api/developer', DeveloperController.get);
DeveloperRoutes.get('/api/developer/all', DeveloperController.getAll);

DeveloperRoutes.delete('/api/developer', DeveloperController.del);                 //! Delete

DeveloperRoutes.put('/api/developer/', DeveloperController.update);                 //? Update

export default DeveloperRoutes;
