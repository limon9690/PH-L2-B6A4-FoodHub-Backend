import {Router} from "express";
import { mealController } from "./meal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get('/', mealController.getAllMeals);
router.get('/:mealId', mealController.getSingleMeal)
router.post('/', authMiddleware("PROVIDER"), mealController.createMeal)
router.put('/:mealId', authMiddleware("PROVIDER"), mealController.updateMeal);
router.delete('/:mealId', authMiddleware("PROVIDER"), mealController.removeMeal);

export const mealRouter = router;