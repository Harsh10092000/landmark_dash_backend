import express from "express";
import { fetchMapData, deleteMap, fetchMapDataById, fetchMapCategory, checkSubCategory, fetchMapData1 } from "../controllers/map.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/mapImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      //file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      Date.now() + "-" + file.originalname 
    );
  },
});
const upload = multer({
  storage,
});



router.post("/addMap", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  const q = "INSERT INTO city_map_module (map_city, map_state, map_category, map_sub_category, map_image ) Values (?)";
  const values = [
    req.body.map_city,
    req.body.map_state,
    req.body.map_category,
    req.body.map_sub_category,
    req.file ? req.file.filename : "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Inserted Successfully");
  });
});



router.put("/updateMap", upload.single("image"), (req, res) => {
    //console.log("req.body : ", req.body);
    //console.log("req.file : ", req.file);
    const q =
      "UPDATE city_map_module SET map_city = ?, map_state = ?, map_category = ?, map_sub_category = ?, map_image  = ? WHERE map_id = ?";
    const values = [
        req.body.map_city,
        req.body.map_state,
        req.body.map_category,
        req.body.map_sub_category,
      req.file ? req.file.filename : req.body.map_image,
      req.body.map_id,
    ];
    console.log("values : ", req.body);
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("updated successfully");
      //}
    });
  });



router.get("/fetchMapData", fetchMapData);
router.get("/fetchMapDataById/:mapId", fetchMapDataById);
router.get("/fetchMapCategory", fetchMapCategory);
router.get("/checkSubCategory/:city/:category/:subcategory", checkSubCategory);
router.get("/fetchMapData1/:city", fetchMapData1);

router.delete("/deleteMap/:mapId", deleteMap);

export default router;
