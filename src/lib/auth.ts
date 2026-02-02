import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    // trustedOrigins: ["https://foodhub-frontend-puce.vercel.app", "http://localhost:3000"],
    // advanced: {
    //     disableOriginCheck: true,
    //     useSecureCookies: true,
    //     defaultCookieAttributes: {
    //         sameSite: "none",
    //         secure: true,
    //     },
    // },
    trustedOrigins: async (request) => {
        const origin = request?.headers.get("origin");

        const allowedOrigins = [
            process.env.FRONT_END_URL,
            process.env.BETTER_AUTH_URL,
            "http://localhost:3000",
            "http://localhost:4000",
            "http://localhost:5000",
            "https://foodhub-frontend-puce.vercel.app",
            "https://prisma-blog-server-navy.vercel.app",
        ].filter(Boolean);

        // Check if origin matches allowed origins or Vercel pattern
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            /^https:\/\/.*\.vercel\.app$/.test(origin)
        ) {
            return [origin];
        }

        return [];
    },
    basePath: "/api/auth",
    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production",
        disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER"
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE"
            }
        }
    },
    emailAndPassword: {
        enabled: true
    }
});