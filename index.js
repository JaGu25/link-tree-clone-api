import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./src/routes/index.routes.js";
import linktreeRoutes from "./src/routes/linktree.routes.js";


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/linktree", linktreeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

