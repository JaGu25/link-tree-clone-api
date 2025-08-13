import express from "express";
import multer from "multer";
import path from "path";
import db from "../configs/db.js";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/",
    filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

router.post("/", upload.single("avatar"), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No se envió ningún archivo" });

  const filePath = `/uploads/${req.file.filename}`;
  const { user_id } = req.body;

  try {
    await db.query("UPDATE profile SET avatar_url = ? WHERE user_id = ?", [filePath, user_id]);
    res.json({ success: true, avatar_url: filePath });
  } catch {
    res.status(500).json({ success: false, message: "Error al subir avatar" });
  }
});

export default router;
