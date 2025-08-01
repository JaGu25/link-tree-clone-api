import { Router } from "express";
import { verifyToken } from "../middlewares/verify-token.js";
import { register, login, refreshToken } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import { validationResult } from "express-validator";

const router = Router();


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/refresh-token", refreshToken);

router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully", user: req.user });
});

export default router;
