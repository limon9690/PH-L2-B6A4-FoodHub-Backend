import { Request, Response } from "express";
import { providerProfileService } from "./providerProfile.service";

const getAllProviders = async (req : Request, res : Response) => {
    try {
        const result = await providerProfileService.getAllProviders();

        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            "error" : error
        })
    }
}

const createProvider = async (req : Request, res : Response) => {
    try {
        const userId = req.user?.id;
        const result = await providerProfileService.createProvider(req.body, userId as string);

        return res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            "error" : error
        })
    }
}


export const providerProfileController = {
    getAllProviders,
    createProvider
}