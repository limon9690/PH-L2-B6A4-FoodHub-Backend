import { toNodeHandler } from "better-auth/node";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth";
import { authRouter } from "./modules/auth/auth.router";
import { mealRouter } from "./modules/meal/meal.router";
import { categoryRouter } from "./modules/category/category.route";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.route";

const app : Application = express();
app.use(express.json());

// Auth Routes
app.use('/api/auth/', authRouter);
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Provider-Profile Routes
app.use('/api/providers', providerProfileRouter)

// Meal Routes
app.use('/api/meals', mealRouter);

// Category Routes
app.use('/api/categories', categoryRouter)

app.get("/", (req : Request, res : Response) => {
    res.status(200).send("Hello there!");
})

export default app;