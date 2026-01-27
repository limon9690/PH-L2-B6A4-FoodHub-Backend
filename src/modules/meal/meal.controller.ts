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

const createMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await mealService.createMeal(req.body, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;
        const result = await mealService.updateMeal(req.body, mealId as string, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const removeMeal = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;
        const result = await mealService.removeMeal(mealId as string, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const mealController = {
    getAllMeals,
    createMeal,
    getSingleMeal,
    updateMeal,
    removeMeal
}