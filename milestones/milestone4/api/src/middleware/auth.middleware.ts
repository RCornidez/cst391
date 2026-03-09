import { Request, Response, NextFunction } from "express";
import { decryptToken, TokenPayload } from "../utilities/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const payload = await decryptToken(token);
        req.user = payload;
        next();
    } catch (error) {
        console.error("[auth.middleware][authenticate][Error]", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};