import { NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "toekn not provided" })
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded: any = jwt.verify(token, 'jwtsecret')

        req.user = decoded
        console.log(decoded);

        next()

    } catch (error: any) {
        res.status(403).json({ message: "forbidden" })
    }
}