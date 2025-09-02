import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/jwt-validation.js";

const router = express.Router();

router.get("/", verifyToken, getDashboard);


export default router;
