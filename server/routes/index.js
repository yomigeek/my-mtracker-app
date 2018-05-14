import express from 'express';
import UserRequestController from '../controllers/userRequestController';
import Validation from '../validations/validator';

const appRoutes = express.Router();


// DEFAULT message
appRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the mTracker API',
}));

// User API Routes
appRoutes.get('/users/requests/:requestId', UserRequestController.getRequestByRequestId);

export default appRoutes;
