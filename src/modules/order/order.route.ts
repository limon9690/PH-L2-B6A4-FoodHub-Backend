import {Router} from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { orderController } from "./order.controller";

const router : Router = Router();

router.post('/', authMiddleware("USER"), orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderDetails)

export const orderRouter = router;