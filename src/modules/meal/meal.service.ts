import { prisma } from "../../lib/prisma"
import { CreateMealRequest } from "./meal.type";

const getAllMeals = async () => {
    const meals = await prisma.meal.findMany();
    return meals;
}

const createMeal = async (data : CreateMealRequest, userId : string) => {
    const providerProfile = await prisma.providerProfile.findFirst({
        where: {
            userId
        }
    });

    const providerProfileId = providerProfile?.id;
    const providerId = providerProfileId as string;
    
    const result = await prisma.meal.create({
        data : {
            ...data,
            providerId 
        }
    })

    return result;
}

export const mealService = {
    getAllMeals,
    createMeal,
}