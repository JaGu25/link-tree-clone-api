import express from "express";
import noteRoutes from "./notes.routes.js";

const app = express();

app.use(express.json());

app.use("/notes", noteRoutes);

export default app;
