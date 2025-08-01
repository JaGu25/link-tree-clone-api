import db from "../configs/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
    const { name, email, password, role_id } = req.body;

    try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO user (name, email, password, role_id) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role_id || 2]
    );

    res.status(StatusCodes.CREATED).json({ message: "User registered successfully" });
    } catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Registration failed" });
    }
};

export const login = async (req, res) => {
    const SECRET = process.env.JWT_SECRET;
    const REFRESH_SECRET = process.env.REFRESH_SECRET;

    if (!SECRET || !REFRESH_SECRET) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "JWT secrets are not configured" });
    }

    const { email, password } = req.body;

    try {
    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    const user = users[0];

    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });

    const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role_id },
        SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
    } catch (error) {
    console.error("Error en login:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const refreshToken = (req, res) => {
    const SECRET = process.env.JWT_SECRET;
    const REFRESH_SECRET = process.env.REFRESH_SECRET;

    if (!SECRET || !REFRESH_SECRET) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "JWT secrets are not configured" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign(
        { id: user.id },
        SECRET,
        { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
    });
};
