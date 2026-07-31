import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const routes = express.Router();

routes.use('/v1/auth', authRoutes);
routes.use('/v1/user', userRoutes);

export default routes;
