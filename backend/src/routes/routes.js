import express from 'express';
import authRoutes from './auth.routes.js';

const routes = express.Router();

routes.use('/v1/auth', authRoutes);

export default routes;
