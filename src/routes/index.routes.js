import express from "express";
import authRoutes from "./auth.routes.js"; 
import linktreeRoutes from "./linktree.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/linktree", linktreeRoutes);

export default router;
