import express from "express";
import { fetchData, updateAutoRemovalProperty } from "../controllers/autoRemovePro.js";

const router = express.Router();
router.get("/fetchData", fetchData);
//router.get("/fetchAdDataById/:adId", fetchAdDataById);
router.put("/updateAutoRemovalProperty", updateAutoRemovalProperty);
//router.delete("/deleteAd/:adId", deleteAd);

export default router;