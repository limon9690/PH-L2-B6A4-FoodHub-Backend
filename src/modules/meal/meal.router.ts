import {Router} from "express";
import { mealController } from "./meal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get('/', mealController.getAllMeals);
router.post('/', authMiddleware("PROVIDER"), mealController.createMeal)

export const mealRouter = router;