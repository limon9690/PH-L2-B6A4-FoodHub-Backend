import {Router} from "express";
import { providerProfileController } from "./providerProfile.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get('/', providerProfileController.getAllProviders);
router.post('/', authMiddleware("USER"), providerProfileController.createProvider);

export const providerProfileRouter = router;