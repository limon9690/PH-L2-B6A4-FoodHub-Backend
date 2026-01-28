import {Router} from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { orderController } from "./order.controller";

const router : Router = Router();

router.post('/', authMiddleware("USER"), orderController.createOrder);

router.get('/', authMiddleware("USER", "PROVIDER"), orderController.getAllOrders);

router.get('/:orderId', authMiddleware("USER", "PROVIDER"), orderController.getOrderDetails);

router.put('/:orderId', authMiddleware("USER"), orderController.updateOrderStatus);

export const orderRouter = router;