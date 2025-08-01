import { StatusCodes } from "http-status-codes";

export const validateJWTSecrets = (req, res, next) => {
    const SECRET = process.env.JWT_SECRET;
    const REFRESH_SECRET = process.env.REFRESH_SECRET;

    if (!SECRET || !REFRESH_SECRET) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "JWT secrets are not configured",
    });
    }

    req.jwtSecrets = { SECRET, REFRESH_SECRET }; 
    next();
};
