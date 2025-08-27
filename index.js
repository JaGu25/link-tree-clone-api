import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routes from "./src/routes/index.routes.js";

const app = express();  
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());  

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);  

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
