import { Router } from 'express';

import Controller from '../controllers';

const controller = new Controller();

const router = Router();

router.get('/cotacoes/:currency', controller.exchange);
router.post('/callback', controller.callback);

export default router;
