import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.service";

const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await mealService.getAllMeals();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getSingleMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mealId = req.params.mealId;
        const result = await mealService.getSingleMeal(mealId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export const mealController = {
    getAllMeals,
    getSingleMeal,
}