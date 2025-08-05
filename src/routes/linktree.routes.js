import express from "express";
import {
    createProfileController,
    getProfileController,
    updateVisibilityController,
    getPublicProfileController,
} from "../controllers/linktree.controller.js";
import { registerClickController } from "../controllers/linktree.controller.js";
import { validateClick } from "../validations/click.validation.js";
import handleValidationErrors from "../middlewares/handle-validation-errors.js";
import { verifyToken } from "../middlewares/jwt-validation.js";

const router = express.Router();

router.post("/", verifyToken, createProfileController);
router.get("/", verifyToken, getProfileController);
router.patch("/", verifyToken, updateVisibilityController);
router.get("/public", getPublicProfileController);  
router.post("/click", validateClick, handleValidationErrors, registerClickController);


export default router;
