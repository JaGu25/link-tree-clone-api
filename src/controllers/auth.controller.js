import { StatusCodes } from "http-status-codes";
import { registerUser,authenticateUser,generateNewAccessToken,} from "../services/auth.service.js";

export const register = async (req, res) => {
    const { name, email, password, role_id } = req.body;

    try {
    await registerUser({ name, email, password, role_id });
    res.status(StatusCodes.CREATED).json({ message: "User registered successfully" });
    } catch (error) {
    console.error("Registration error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Registration failed" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
    const { accessToken, refreshToken, user } = await authenticateUser({
        email,
        password,
        jwtSecret: process.env.JWT_SECRET,
        refreshSecret: process.env.REFRESH_SECRET,
    });

    res.json({ accessToken, refreshToken, user });
    } catch (error) {
    console.error("Login error:", error);
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
};

export const refreshToken = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    try {
    const { accessToken, user } = await generateNewAccessToken(
        token,
        process.env.JWT_SECRET,
        process.env.REFRESH_SECRET
    );

    res.json({ accessToken, user });
    } catch (error) {
    res.sendStatus(StatusCodes.FORBIDDEN);
    }
};
