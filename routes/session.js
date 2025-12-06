import express from "express";
import { getSessionData, logoutUser } from "../controllers/session.js";

const router = express.Router();

router.get("/getSessionData", getSessionData);
router.post("/logout", logoutUser);

export default router;
