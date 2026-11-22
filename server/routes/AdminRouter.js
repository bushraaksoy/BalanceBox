import { Router } from 'express';
import { AdminController } from '../controllers/index.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const adminRouter = Router();

adminRouter.get('/overview', requireAdmin, AdminController.overview);
adminRouter.get('/users', requireAdmin, AdminController.users);

export default adminRouter;
