import { prisma } from "../../lib/prisma"
import { CreateCategoryRequest } from "./category.types"

const getAllCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
}

const createCategory = async (data : CreateCategoryRequest) => {
    const result = await prisma.category.create({
        data
    })

    return result;
}

export const categoryService = {
    createCategory,
    getAllCategories
}