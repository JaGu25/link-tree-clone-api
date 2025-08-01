import express from "express";
import { register, login, refreshToken } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import { validateJWTSecrets, verifyToken } from "../middlewares/jwt-validation.js";
import handleValidationErrors from "../middlewares/handle-validation-errors.js";

const router = express.Router();

router.post("/register", registerValidation, handleValidationErrors, register);
router.post("/login", loginValidation, handleValidationErrors, validateJWTSecrets, login);
router.post("/refresh-token", validateJWTSecrets, refreshToken);

router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully", user: req.user });
});

export default router;
