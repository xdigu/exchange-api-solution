import { Router } from "express";

import Controller from "../controller";

const controller = new Controller();

const router = Router();

router.get("/service-a/exchange", controller.serviceA);
router.get("/service-b/exchange", controller.serviceB);
router.post("/service-c/exchange", controller.serviceC);

export default router;
