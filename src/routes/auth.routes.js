import express from "express";
import { register, login, refreshToken } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import { validateJWTSecrets } from "../middlewares/validate-secrets.js";
import handleValidationErrors from "../middlewares/handle-validation-errors.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = express.Router();

router.post("/register", registerValidation, handleValidationErrors, register);
router.post("/login", loginValidation, handleValidationErrors, validateJWTSecrets, login);
router.post("/refresh-token", validateJWTSecrets, refreshToken);

router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully", user: req.user });
});

export default router;
