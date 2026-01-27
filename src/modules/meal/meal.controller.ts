import { Request, Response } from "express";
import { mealService } from "./meal.service";

const getAllMeals = async (req : Request, res : Response) => {
    try {
        const result = await mealService.getAllMeals();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

const createMeal = async (req : Request, res : Response) => {
    try {
        const userId = req.user?.id;
        const result = await mealService.createMeal(req.body, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
}

export const mealController = {
    getAllMeals,
    createMeal
}