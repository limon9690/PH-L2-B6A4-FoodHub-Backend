import { toNodeHandler } from "better-auth/node";
import express, { Application, Request, Response } from "express";
import { auth } from "./lib/auth";
import { authRouter } from "./modules/auth/auth.router";
import { mealRouter } from "./modules/meal/meal.route";
import { categoryRouter } from "./modules/category/category.route";
import { providerProfileRouter } from "./modules/providerProfile/providerProfile.route";
import { errorHandler } from "./middlewares/errorHandler";
import { addressRouter } from "./modules/address/address.route";
import { orderRouter } from "./modules/order/order.route";
import { providerRouter } from "./modules/provider/provider.route";
import { adminRouter } from "./modules/admin/admin.route";
import cors from "cors";

const app : Application = express();
//app.set("trust proxy", 1);
app.use(express.json());


// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowed = process.env.FRONT_END_URL?.replace(/\/$/, "");
//       if (!origin || origin.replace(/\/$/, "") === allowed) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   }),
// );

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.FRONT_END_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/foodhub.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

// Auth Routes
app.use('/api/auth', authRouter);

app.all('/api/auth/{*any}', toNodeHandler(auth));

// Provider-Profile Routes
app.use('/api/providers', providerProfileRouter)

// Meal Routes
app.use('/api/meals', mealRouter);

// Category Routes
app.use('/api/categories', categoryRouter)

// Address Routes
app.use('/api/addresses', addressRouter);

// Order Routes
app.use('/api/orders', orderRouter)

// Provider Routes
app.use('/api/provider', providerRouter)

// Admin Routes
app.use('/api/admin', adminRouter)

app.get("/", (req : Request, res : Response) => {
    res.status(200).send("Hello there!");
})

app.use(errorHandler);

export default app;