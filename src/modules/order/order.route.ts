import {Router} from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { orderController } from "./order.controller";

const router : Router = Router();

router.post('/', authMiddleware("USER"), orderController.createOrder);

export const orderRouter = router;