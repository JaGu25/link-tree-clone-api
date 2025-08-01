import jwt from "jsonwebtoken";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const validateJWTSecrets = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: "JWT_SECRET is not defined in environment variables",
    });
    }
    next();
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        error: ReasonPhrases.UNAUTHORIZED,
        message: "Token is required",
    });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).json({
        error: ReasonPhrases.FORBIDDEN,
        message: "Invalid Token",
    });
    }
};
