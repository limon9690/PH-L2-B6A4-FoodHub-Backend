import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/AppError";
import { createProviderRequest } from "./providerProfile.types";

const getAllProviders = async () => {
    const result = await prisma.providerProfile.findMany();
    return result;
}

const getSingleProvider = async (providerId : string) => {
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
    return prisma.$transaction(async (tx) => {
        const existingProvider = await tx.providerProfile.findUniqueOrThrow({
            where: { userId }
        });

        if (existingProvider) {
            throw new AppError(
                "You are already a provider",
                400,
                "BAD_REQUEST"
            );
        };

        await tx.user.update({
            where: {
                id: userId,
            },
            data: {
                role: "PROVIDER"
            }
        })

        const result = await tx.providerProfile.create({
            data: {
                ...data,
                userId
            }
        });

        return result;
    })  
}

export const providerProfileService = {
    getAllProviders,
    createProvider,
    getSingleProvider
}