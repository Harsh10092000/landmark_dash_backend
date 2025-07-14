import express from "express";
import { fetchUserData, delData } from "../controllers/account.js";

const router = express.Router();

router.get("/fetchUserData/:loginId", fetchUserData);
router.delete("/delData/:userEmail/:userId", delData);

export default router;
