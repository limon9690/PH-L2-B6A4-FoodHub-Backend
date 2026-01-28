import { prisma } from "../../lib/prisma";

const getAllMeals = async () => {
    const meals = await prisma.meal.findMany();
    return meals;
}

const getSingleMeal = async (mealId : string) => {
    const result = await prisma.meal.findUniqueOrThrow({
        where: {
            id : mealId,
        }
    })

    return result;
}



export const mealService = {
    getAllMeals,
    getSingleMeal
}