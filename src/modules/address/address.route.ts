import {Router} from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { addressController } from "./address.controller";

const router : Router = Router();

router.get('/', authMiddleware("USER", "PROVIDER"), addressController.getUserAddress);

router.post('/', authMiddleware("USER", "PROVIDER"), addressController.createAddress);

router.put('/', authMiddleware("USER", "PROVIDER"), addressController.updateAddress);

export const addressRouter = router;