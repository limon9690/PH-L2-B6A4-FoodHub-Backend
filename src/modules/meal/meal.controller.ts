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

const getSingleMeal = async (req : Request, res : Response) => {
    try {
        const mealId = req.params.mealId;
        const result = await mealService.getSingleMeal(mealId as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            "error" : "error meal"
        })
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

const updateMeal = async (req : Request, res : Response) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;
        const result = await mealService.updateMeal(req.body, mealId as string, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            "error" : "error updating meal"
        })
    }
}

const removeMeal = async (req : Request, res : Response) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;
        const result = await mealService.removeMeal(mealId as string, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "error" : "error deleting meal"
        })
    }
}

export const mealController = {
    getAllMeals,
    createMeal,
    getSingleMeal,
    updateMeal,
    removeMeal
}