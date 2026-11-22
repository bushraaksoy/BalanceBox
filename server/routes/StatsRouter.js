import { Router } from 'express';
import { StatsController } from '../controllers/index.js';

const statsRouter = Router();

statsRouter.post('/event', StatsController.recordEvent);

export default statsRouter;
