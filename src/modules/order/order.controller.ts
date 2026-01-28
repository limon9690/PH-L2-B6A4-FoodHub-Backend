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

const getAllOrders = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const role = req.user?.role;

        let result;

        if (role === "PROVIDER") {
            result = orderService.getAllProviderOrders(userId as string)
        } else if (role === "USER") {
            result = orderService.getAllUserOrders(userId as string);
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getOrderDetails = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const role = req.user?.role;
        const orderId = req.params.orderId;

        let result;

        if (role === "PROVIDER") {
            result = orderService.getProviderOrderDetails(userId as string, orderId as string);
        } else if (role === "USER") {
            result = orderService.getUserOrderDetails(userId as string, orderId as string);
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const orderId = req.params.orderId;

        const result = await orderService.updateOrderStatus(req.body, userId as string, orderId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export const orderController = {
    createOrder,
    getAllOrders,
    getOrderDetails,
    updateOrderStatus
}