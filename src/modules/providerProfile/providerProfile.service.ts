import { prisma } from "../../lib/prisma"
import { createProviderRequest } from "./providerProfile.types";

const getAllProviders = async () => {
    const result = await prisma.providerProfile.findMany();
    return result;
}

const getSingleProvider = async (providerId : string) => {
    const result = await prisma.providerProfile.findUnique({
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
        const existingProvider = await tx.providerProfile.findFirst({
            where: { userId }
        });

        if (existingProvider) {
            throw new Error("You are already a provider");
        }

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