import express from "express";
import { addProPlan, updateProPlan, fetchProPlanData,fetchProPlanDataById, updateProPlanStatus, deleteProPlan, buyProPlan,fetchProPlanDataBId, fetchCurrentPlanDataById, fetchProPlanTran, fetchAccessLogs, maxfreelisting, updateMaxFreeListing } from "../controllers/proPlan.js";
import { verifyJwt } from "../controllers/verifyjwt.js";

const router = express.Router();

router.post("/addProPlan", addProPlan);
router.post("/buyProPlan", buyProPlan);
router.put("/updateProPlan", updateProPlan);
router.get("/fetchProPlanData", fetchProPlanData);
router.get("/fetchProPlanDataById/:planId", fetchProPlanDataById);
router.get("/fetchProPlanDataBId/:userId",verifyJwt , fetchProPlanDataBId);
router.get("/fetchCurrentPlanDataById/:userId",verifyJwt , fetchCurrentPlanDataById);

router.put("/updateProPlanStatus", updateProPlanStatus);
router.delete("/deleteProPlan/:planId", deleteProPlan);
router.get("/fetchProPlanTran", fetchProPlanTran);
router.get("/fetchAccessLogs", fetchAccessLogs);
router.get("/maxfreelisting", maxfreelisting);
router.put("/updateMaxFreeListing", updateMaxFreeListing);
export default router;
