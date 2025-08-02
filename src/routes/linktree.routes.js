import express from "express";
import {
    createProfileController,
    getProfileController,
    updateVisibilityController,
    getPublicProfileController,
} from "../controllers/linktree.controller.js";

import { verifyToken } from "../middlewares/jwt-validation.js";

const router = express.Router();

router.post("/", verifyToken, createProfileController);
router.get("/", verifyToken, getProfileController);
router.patch("/", verifyToken, updateVisibilityController);
router.get("/public", getPublicProfileController);

export default router;
