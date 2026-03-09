import { Request, RequestHandler, Response } from "express";
import * as UserDao from "./users.dao";
import { hashPassword, verifyPassword } from "../../utilities/auth";
import { encryptToken } from "../../utilities/jwt";

export const register: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const passwordHash = await hashPassword(password);
        await UserDao.createUser(email, passwordHash);

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("[users.controller][register][Error]", error);
        res.status(500).json({ message: "There was an error when creating the user" });
    }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const users = await UserDao.readUserCredentialsByEmail(email);

        if (!users.length) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const user = users[0];
        const isValid = await verifyPassword(password, user.passwordHash);

        if (!isValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = await encryptToken({ id: user.id, email: user.email });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: parseInt(process.env.COOKIE_MAX_AGE!)
        });
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("[users.controller][login][Error]", error);
        res.status(500).json({ message: "There was an error when logging in" });
    }
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", { 
            httpOnly: true, 
            secure: false, 
            sameSite: "strict",
            maxAge: 0
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("[users.controller][logout][Error]", error);
        res.status(500).json({ message: "There was an error when logging out" });
    }
};