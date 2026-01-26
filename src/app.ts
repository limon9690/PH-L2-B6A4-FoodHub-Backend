import { toNodeHandler } from "better-auth/node";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth";
import { authRouter } from "./modules/auth/auth.router";

const app : Application = express();
app.use(express.json());

app.use('/api/auth/', authRouter)
app.all('/api/auth/{*any}', toNodeHandler(auth));


app.get("/", (req : Request, res : Response) => {
    res.status(200).send("Hello there!");
})

export default app;