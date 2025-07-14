import express from "express";
import { getSessionData } from "../controllers/session.js";

const router = express.Router();

router.get("/getSessionData", getSessionData);

export default router;
