import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./src/routes/index.routes.js";
import uploadRoutes from "./src/routes/uplodad.routes.js";

const app = express();  
const PORT = 3001;

app.use(cors());
app.use(express.json());  

app.use(express.static("public"));
app.use("/api/upload-avatar", uploadRoutes);


app.use("/api", routes);  

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

