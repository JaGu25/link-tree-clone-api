import db from "../configs/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ROLE_USER = 2;

export const registerUser = async ({ name, email, password, role_id }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
    "INSERT INTO user (name, email, password, role_id) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role_id || ROLE_USER]
    );
};

export const authenticateUser = async ({ email, password, jwtSecret, refreshSecret }) => {
  const [users] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    const user = users[0];
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role_id },
    jwtSecret,
    { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "7d",
    });

    const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    };

    return { accessToken, refreshToken, user: userInfo };
};

export const generateNewAccessToken = (refreshToken, jwtSecret, refreshSecret) => {
    return new Promise(async (resolve, reject) => {
    jwt.verify(refreshToken, refreshSecret, async (err, payload) => {
        if (err) return reject(err);

        try {
        const [users] = await db.query("SELECT id, name, email, role_id FROM user WHERE id = ?", [payload.id]);
        const user = users[0];
        if (!user) return reject(new Error("Usuario no encontrado"));

        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role_id },
            jwtSecret,
            { expiresIn: "15m" }
        );

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        resolve({ accessToken: newAccessToken, user: userInfo });
        } catch (dbError) {
        reject(dbError);
        }
    });
    });
};
