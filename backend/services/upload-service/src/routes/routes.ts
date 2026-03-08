import express from "express"
import multer from "multer"
import { uploadFile } from "../controllers/upload.controller"
import { getDocumentStatus } from "../controllers/document.controller"

const router = express.Router()
const upload = multer()

router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/status/:documentId", getDocumentStatus);

export default router