import express from "express";
import {
  
  fetchAgentWorkPlace,
  fetchAgentData,
  fetchAgentWorkState,
  fetchpPropertiesByUser,
  fetchAgents,
  fetchPropertyDataByAgent,
  fetchPropertyNo,
  fetchAgentDataById,
  fetchAgentDataById1,
  fetchWorkStateById,
  fetchWorkCityById,
  fetchWorkSubDistrictById,
  addAgentData,
  delData,
  fetchAgentDataByUserId,
  fetchAgentData1,
  checkUserType,
  fetchAgentNameById
} from "../controllers/agent.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";
import { verifyJwt } from "../controllers/verifyjwt.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/userImages");
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



router.post("/addAgent", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  const q =
    "INSERT INTO agent_module (agent_type, agent_name, agent_email, agent_phone , agent_exp, agent_work_area ,agent_state, agent_city, agent_sub_district, agent_locality, agent_comapnay_name, agent_company_website, agent_desc, agent_image, user_cnct_id ) Values (?)";
  const values = [
    req.body.user_type,
    req.body.user_name,
    req.body.user_email,
    req.body.user_phone,
    req.body.user_exp,
    req.body.user_work_area,
    req.body.user_state,
    req.body.user_city,
    req.body.user_sub_district,
    req.body.user_locality,
    req.body.user_comapnay_name,
    req.body.user_company_website,
    
    req.body.user_desc,
    req.file ? req.file.filename : "",
    req.body.user_cnct_id,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    console.log(insertId);
    if (req.body.user_type === "Agent") {
      const stateq =
        "INSERT INTO agent_work_state ( `work_state`, `agent_cnct_id`) Values ?";
      const userWorkState = JSON.parse(req.body.user_work_state);
      const stateValues = userWorkState.map((values) => [
        values.name,
        insertId,
      ]);
      console.log("stateValues : ", stateValues);

      db.query(stateq, [stateValues], (err, data) => {
        if (err) return res.status(500).json(err);


        const q1 =
          "INSERT INTO agent_work_state_city ( `work_state`, `work_city`, `agent_cnct_id`) Values ?";
        const userWorkCity = JSON.parse(req.body.user_work_city);
        const values1 = userWorkCity.map((values) => [
          values.state,
          values.district,
          insertId,
        ]);
        console.log("values1 :", values1);

        if (values1.length > 0) {
        db.query(q1, [values1], (err, data) => {
          if (err) return res.status(500).json(err);
          
          const q2 =
            "INSERT INTO agent_work_city__subdistrict (  `work_city`, `work_sub_district`, `agent_cnct_id`) Values ?";
          const userWorkSubDistrict = JSON.parse(
            req.body.user_work_sub_district
          );
          const values2 = userWorkSubDistrict.map((values) => [
            values.district,
            values.sub_district,
            insertId,
          ]);
          console.log("values2 :", values2);
          if (values2.length > 0) {
            db.query(q2, [values2], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json(insertId);
            });
          } else {
            return res.status(200).json(insertId);
          }
          
        });
      } else {
        return res.status(200).json(insertId);
      }
      });
    } else {
      return res.status(200).json(insertId);
    }
  });
});


router.put("/updateAgent", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  const q =
    "UPDATE agent_module SET agent_type = ?, agent_name = ?, agent_email = ?, agent_phone  = ?, agent_exp = ?, agent_work_area = ?, agent_state = ?, agent_city = ?, agent_sub_district = ?, agent_locality = ?, agent_comapnay_name = ?, agent_company_website = ?, agent_desc = ?, agent_image = ?  WHERE agent_id = ?";
  const values = [
    req.body.user_type,
    req.body.user_name,
    req.body.user_email,
    req.body.user_phone,
    req.body.user_exp,
    req.body.user_work_area,
    req.body.user_state,
    req.body.user_city,
    req.body.user_sub_district,
    req.body.user_locality,
    req.body.user_comapnay_name,
    req.body.user_company_website,
    
    req.body.user_desc,
    req.file ? req.file.filename : req.body.ad_image,
    req.body.agent_id,
  ];
  console.log("values : ", req.body);
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    
    // if (req.body.user_type === "Agent") {
    //   const stateq =
    //     "INSERT INTO agent_work_state ( `work_state`, `agent_cnct_id`) Values ?";
    //   const userWorkState = JSON.parse(req.body.user_work_state);
    //   const stateValues = userWorkState.map((values) => [
    //     values.name,
    //     req.body.agent_id,
    //   ]);
    //   // const stateq =
    //   //   "UPDATE agent_work_state SET work_state = ? WHERE agent_cnct_id = ?";
    //   // const userWorkState = JSON.parse(req.body.user_work_state);
    //   // const stateValues = userWorkState.map((values) => [
    //   //   values.name,
    //   //   req.body.agent_id,
    //   // ]);
    //   console.log("stateValues : ", stateValues);

    //   db.query(stateq, stateValues, (err, data) => {
    //     if (err) return res.status(500).json(err);

    //     const q1 =
    //     "UPDATE agent_work_state_city SET work_state = ?, work_city = ? WHERE agent_cnct_id = ?";
    //     const userWorkCity = JSON.parse(req.body.user_work_city);
    //     const values1 = userWorkCity.map((values) => [
    //       values.state,
    //       values.district,
    //       req.body.agent_id,
    //     ]);
    //     console.log("values1 :", values1);

    //     if (values1.length > 0) {
    //     db.query(q1, values1, (err, data) => {
    //       if (err) return res.status(500).json(err);
          
    //       const q2 =
    //       "UPDATE agent_work_city__subdistrict SET work_city = ?, work_sub_district = ? WHERE agent_cnct_id = ?";
    //       const userWorkSubDistrict = JSON.parse(
    //         req.body.user_work_sub_district
    //       );
    //       const values2 = userWorkSubDistrict.map((values) => [
    //         values.district,
    //         values.sub_district,
    //         req.body.agent_id,
    //       ]);
    //       console.log("values2 :", values2);
    //       if (values2.length > 0) {
    //         db.query(q2, values2, (err, data) => {
    //           if (err) return res.status(500).json(err);
    //           return res.status(200).json("updated successfully");
    //         });
    //       } else {
    //         return res.status(200).json("updated successfully");
    //       }
          
    //     });
    //   } else {
    //     return res.status(200).json("updated successfully");
    //   }
    //   });
    // } else {
      return res.status(200).json("updated successfully");
    //}
  });
});



router.get("/fetchAgentData/:agentId", fetchAgentData);
router.get("/fetchAgentWorkPlace/:agentId", fetchAgentWorkPlace);
router.get("/fetchAgentWorkState/:agentId", fetchAgentWorkState);
router.get("/fetchpPropertiesByUser/:userId", fetchpPropertiesByUser);
router.get("/fetchAgents" , fetchAgents);
router.get("/fetchPropertyDataByAgent/:agentId", fetchPropertyDataByAgent);
router.get("/fetchPropertyNo/:userId", fetchPropertyNo);
router.get("/fetchAgentDataById/:agentId", fetchAgentDataById);
router.get("/fetchAgentDataById1/:agentId", fetchAgentDataById1);

router.get("/fetchWorkStateById/:agentId", fetchWorkStateById);
router.get("/fetchWorkCityById/:agentId", fetchWorkCityById);
router.get("/fetchWorkSubDistrictById/:agentId", fetchWorkSubDistrictById);

router.post("/addAgentData", addAgentData);
router.delete("/delData/:agentId", delData);
router.get("/fetchAgentDataByUserId/:userId", verifyJwt, fetchAgentDataByUserId);
router.get("/fetchAgentData1/:userId", fetchAgentData1);
router.get("/checkUserType/:userId", checkUserType);

router.get("/fetchAgentNameById/:userId", fetchAgentNameById);


export default router;

