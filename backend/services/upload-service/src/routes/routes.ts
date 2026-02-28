import express from "express"
import multer from "multer"
import { uploadFile } from "../controllers/upload.controller"

const router = express.Router()
const upload = multer()

router.post("/upload", upload.single("file"), uploadFile);

export default router