import express from "express";
import multer from "multer";
import path from "path";
import {
    createProfileController,
    getProfileController,
    updateVisibilityController,
    getPublicProfileController,
    registerClickController,
    registerVisitController,
} from "../controllers/linktree.controller.js";
import { validateClick } from "../validations/click.validation.js";
import handleValidationErrors from "../middlewares/handle-validation-errors.js";
import { verifyToken } from "../middlewares/jwt-validation.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", verifyToken, upload.single("avatar"), createProfileController);
router.get("/", verifyToken, getProfileController);
router.patch("/", verifyToken, updateVisibilityController);
router.get("/public", getPublicProfileController);
router.post("/click", validateClick, handleValidationErrors, registerClickController);
router.post("/visit", registerVisitController);

export default router;
