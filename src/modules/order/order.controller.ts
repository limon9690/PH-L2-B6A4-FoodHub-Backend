import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await orderService.createOrder(req.body, userId as string);
        
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const orderController = {
    createOrder,
}