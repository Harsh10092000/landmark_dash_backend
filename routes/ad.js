import express from "express";
import { fetchAdData, deleteAd, fetchAllData, updateAdListingStatus, fetchAdData2, fetchAdData3,fetchAdDataById } from "../controllers/ad.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/adImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
});

router.post("/addAd", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  const q = "INSERT INTO ad_module (ad_type, ad_link, ad_days, ad_image ) Values (?)";
  const values = [
    req.body.ad_type,
    req.body.ad_link,
    req.body.ad_days,
    req.file ? req.file.filename : "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Inserted Successfully");
  });
});



router.put("/updateAd", upload.single("image"), (req, res) => {
    //console.log("req.body : ", req.body);
    //console.log("req.file : ", req.file);
    const q =
      "UPDATE ad_module SET ad_type = ?, ad_link = ?, ad_days = ?, ad_image  = ? WHERE ad_id = ?";
    const values = [
      req.body.ad_type,
      req.body.ad_link,
      req.body.ad_days,
      req.file ? req.file.filename : req.body.ad_image,
      req.body.ad_id,
    ];
    console.log("values : ", req.body);
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("updated successfully");
      //}
    });
  });


router.get("/fetchAdData", fetchAdData);
router.get("/fetchAdData2", fetchAdData2);
router.get("/fetchAdData3", fetchAdData3);
router.get("/fetchAllData", fetchAllData);
router.get("/fetchAdDataById/:adId", fetchAdDataById);
router.put("/updateAdListingStatus", updateAdListingStatus);
router.delete("/deleteAd/:adId", deleteAd);

export default router;
