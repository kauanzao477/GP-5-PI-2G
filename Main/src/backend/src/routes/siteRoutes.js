import express from "express";
import { createSite } from "../controllers/siteController.js";

const router = express.Router();

router.post("/create", createSite);

export default router;