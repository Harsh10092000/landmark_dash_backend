import express from "express";
import {
  fetchAll,
  fetchInterested,
  fetchShorlist,
  fetchUsers,
  fetchUsers1,
  grantAccessToListProperty,
  revokeAccessToListProperty,
  addProListingCoupon,
  fetchCouponData,
  fetchCouponDataById,
  updateCouponStatus,
  deleteCoupon,
  updateProListingCoupon,
  fetchCouponCode,
  fetchDefaultInactiveDuration
} from "../controllers/admin.js";
import { deleteProperty } from "../controllers/admin.js";
import { checkCouponStatus } from "../middleware/checkcouponvalidity.js";

const router = express.Router();


router.get("/fetchAll", fetchAll);
router.delete("/deletePro/:proId", deleteProperty);
router.get("/fetchInterested", fetchInterested);
router.get("/fetchUsers", fetchUsers);
router.get("/fetchShorlist", fetchShorlist);
router.get("/fetchUsers1", fetchUsers1);
router.post("/grantAccessToListProperty" , grantAccessToListProperty);
router.put("/revokeAccessToListProperty" , revokeAccessToListProperty);

router.post("/addProListingCoupon" , addProListingCoupon);
router.get("/fetchCouponData", checkCouponStatus, fetchCouponData);
router.get("/fetchCouponDataById/:couponId", fetchCouponDataById);
router.put("/updateCouponStatus", updateCouponStatus);
router.put("/updateProListingCoupon", updateProListingCoupon);
router.get("/fetchCouponCode/:couponCode", fetchCouponCode);
router.delete("/deleteCoupon/:couponId", deleteCoupon);
router.get("/fetchDefaultInactiveDuration", fetchDefaultInactiveDuration);



export default router;
