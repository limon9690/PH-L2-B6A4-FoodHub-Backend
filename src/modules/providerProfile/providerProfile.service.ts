import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/AppError";
import { createProviderRequest } from "./providerProfile.types";

const getAllProviders = async () => {
    const result = await prisma.providerProfile.findMany();
    return result;
}

const getSingleProvider = async (providerId: string) => {
    const result = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            id: providerId
        },
        include: {
            meals: true
        }
    });

    return result;
}

const createProvider = async (data: createProviderRequest, userId: string) => {
    const result = await prisma.providerProfile.create({
        data: {
            ...data,
            userId
        }
    });

    return result;

}

export const providerProfileService = {
    getAllProviders,
    createProvider,
    getSingleProvider
}