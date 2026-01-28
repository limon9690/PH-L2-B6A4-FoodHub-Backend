import {Router} from "express";
import { categoryController } from "./category.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get('/', categoryController.getAllCategories);
router.post('/', authMiddleware("ADMIN"), categoryController.createCategory);

export const categoryRouter = router;

