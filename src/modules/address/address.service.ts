import { prisma } from "../../lib/prisma";
import { CreateAddressRequest } from "./address.types";

const createAddress = async (data : CreateAddressRequest, userId : string) => {
    const result = await prisma.address.create({
        data : {
            ...data,
            userId
        }
    });

    return result;
}

const getUserAddress = async (userId : string) => {
    const result = await prisma.address.findUniqueOrThrow({
        where: {
            userId
        }
    });

    return result;
}

const updateAddress = async (data : Partial<CreateAddressRequest>, userId : string) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id : userId
        }
    });

    const result = await prisma.address.update({
        data : {
            ...data
        },
        where: {
            userId: userId
        }
    });

    return result;
}

export const addressService = {
    getUserAddress,
    createAddress,
    updateAddress
}