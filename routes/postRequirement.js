import express from "express";
import { postRequirement, fetchReqData } from "../controllers/postRequirement.js";

const router = express.Router();

router.post("/postRequirement", postRequirement);
router.get("/fetchReqData", fetchReqData);
export default router;
