import express from "express";
import { addSubscriberData, deleteSub } from "../controllers/maildigest.js";


const router = express.Router();

router.post("/addSubscriberData", addSubscriberData);
router.delete("/deleteSub/:subId" , deleteSub);
export default router;