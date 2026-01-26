import { Request, Response } from "express";

const getUser = (req : Request, res : Response) => {
    const user = req.user;
    console.log(user);
    res.send(user);
}

export const authService = {
    getUser,
}