import express from 'express';
import UserRequestController from '../controllers/UserRequestController';
import Validation from '../validations/validator';

const appRoutes = express.Router();


// DEFAULT message
appRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the mTracker API',
}));

// User API Routes
appRoutes.get('/users/requests', UserRequestController.getAllRequests);
appRoutes.get('/users/requests/:requestId', UserRequestController.getRequestByRequestId);
appRoutes.post('/users/requests', Validation.createRequest, UserRequestController.createRequest);
appRoutes.put('/users/requests/:requestId', Validation.editRequest, UserRequestController.editRequest);

export default appRoutes;
