import { db } from "../connect.js";

export const addAgentData = (req, res) => {
  console.log("req.body : ", req.body);
  if (req.body.user_type === "Broker") {
    const stateq =
      "INSERT INTO agent_work_state ( `work_state`, `agent_cnct_id`) Values ?";
    //const userWorkState = JSON.parse(req.body.user_work_state);
    const stateValues = req.body.user_work_state.map((values) => [
      values.name,
      req.body.agent_id,
    ]);
    console.log("stateValues : ", stateValues);

    db.query(stateq, [stateValues], (err, data) => {
      if (err) return res.status(500).json(err);

      const q1 =
        "INSERT INTO agent_work_state_city ( `work_state`, `work_city`, `agent_cnct_id`) Values ?";
      //const userWorkCity = JSON.parse(req.body.user_work_city);
      const values1 = req.body.user_work_city.map((values) => [
        values.state,
        values.district,
        req.body.agent_id,
      ]);
      console.log("values1 :", values1);

      if (values1.length > 0) {
        db.query(q1, [values1], (err, data) => {
          if (err) return res.status(500).json(err);

          const q2 =
            "INSERT INTO agent_work_city__subdistrict (  `work_city`, `work_sub_district`, `agent_cnct_id`) Values ?";
          // const userWorkSubDistrict = JSON.parse(
          //   req.body.user_work_sub_district
          // );
          const values2 = req.body.user_work_sub_district.map((values) => [
            values.district,
            values.sub_district,
            req.body.agent_id,
          ]);
          console.log("values2 :", values2);
          if (values2.length > 0) {
            db.query(q2, [values2], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("updated successfully");
            });
          } else {
            return res.status(200).json("updated successfully");
          }
        });
      } else {
        return res.status(200).json("updated successfully");
      }
    });
  } else {
    return res.status(200).json("no change");
  }
};
const delState = (id, res) => {
  const check = "select * from agent_work_state where agent_cnct_id = ?";
  db.query(check, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length < 1) return false;
    const q = "DELETE FROM agent_work_state WHERE agent_cnct_id = ?;";
    db.query(q, id, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
};

const delCity = (id, res) => {
  const check = "select * from agent_work_state_city where agent_cnct_id = ?";
  db.query(check, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length < 1) return false;
    const q = "DELETE FROM agent_work_state_city WHERE agent_cnct_id = ?;";
    db.query(q, id, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
};

const delSubDistrict = (id, res) => {
  const check =
    "select * from agent_work_city__subdistrict where agent_cnct_id = ?";
  db.query(check, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length < 1) return false;
    const q =
      "DELETE FROM agent_work_city__subdistrict WHERE agent_cnct_id = ?;";
    db.query(q, id, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
};

export const delData = (req, res) => {
  delState(req.params.agentId);
  delCity(req.params.agentId);
  delSubDistrict(req.params.agentId);
  return res.status(200).json("Deleted Successfully");
};

export const fetchAgentData = (req, res) => {
  console.log("req.params.agentId : ", req.params.agentId);
  const q = "SELECT * FROM agent_module where agent_id = ?;";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAgentWorkPlace = (req, res) => {
  const q =
    "SELECT agent_cnct_id, work_city,GROUP_CONCAT( work_sub_district ) as work_sub_district FROM agent_work_city__subdistrict where agent_cnct_id = ? group by work_city";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAgentWorkState = (req, res) => {
  const q = "SELECT * FROM agent_work_state where agent_cnct_id = ?;";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAgentData1 = (req, res) => {
  
  const q = "SELECT * FROM agent_module where user_cnct_id = ?;";
  db.query(q, [req.params.userId], (err, agentData) => {
    if (err) return res.status(500).json(err);
    const agentId = agentData[0]?.agent_id;
    const q =
      "SELECT agent_cnct_id, work_city,GROUP_CONCAT( work_sub_district ) as work_sub_district FROM agent_work_city__subdistrict where agent_cnct_id = ? group by work_city";
    db.query(q, [agentId], (err, agentWorkPlaceData) => {
      if (err) return res.status(500).json(err);
      const q = "SELECT * FROM agent_work_state where agent_cnct_id = ?;";
      db.query(q, [agentId], (err, agentWorkStateData) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({agentData,agentWorkPlaceData,agentWorkStateData});
      });
    });
    
  });
};

export const fetchpPropertiesByUser = (req, res) => {
  const q =
    "SELECT * FROM property_module where pro_user_id = ? ORDER BY pro_id DESC LIMIT 3;";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// export const fetchAgents = (req, res) => {
//   const q =
//     `SELECT * FROM agent_module where agent_type = "Agent" ORDER BY agent_id DESC;`;
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };

export const fetchAgents = (req, res) => {
  const q = `SELECT 
    agent_module.*,
    
    COALESCE(Sale_Count, 0) AS Sale_Count,
    COALESCE(Rent_Count, 0) AS Rent_Count,
    COALESCE(work_city, '') as work_city,
    COALESCE(work_state, '') as work_state
FROM 
    agent_module
LEFT JOIN (
    SELECT 
        pro_user_id,
        SUM(CASE WHEN pro_ad_type = 'Sale' THEN 1 ELSE 0 END) AS Sale_Count,
        SUM(CASE WHEN pro_ad_type = 'Rent' THEN 1 ELSE 0 END) AS Rent_Count
    FROM 
        property_module
    GROUP BY 
        pro_user_id
) AS property_counts ON agent_module.user_cnct_id = property_counts.pro_user_id 
LEFT JOIN (
    SELECT 
        agent_cnct_id,
        GROUP_CONCAT(DISTINCT work_city) AS work_city
    FROM 
        agent_work_city__subdistrict
    GROUP BY 
        agent_cnct_id
) AS workCity ON agent_module.agent_id = workCity.agent_cnct_id
LEFT JOIN (
    SELECT 
        agent_cnct_id,
        GROUP_CONCAT(DISTINCT work_state) AS work_state
    FROM 
        agent_work_state
    GROUP BY 
        agent_cnct_id
) AS workState ON agent_module.agent_id = workState.agent_cnct_id

WHERE 
    agent_type = 'Broker'
ORDER BY 
    agent_id DESC;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAgentDataByUserId = (req, res) => {
  const q = `SELECT 
  agent_module.*,
  COALESCE(Sale_Count, 0) AS Sale_Count,
  COALESCE(Rent_Count, 0) AS Rent_Count,
  COALESCE(work_city, '') as work_city,
  COALESCE(work_state, '') as work_state,
  COALESCE(work_sub_district, '') as work_sub_district
FROM 
  agent_module
LEFT JOIN (
  SELECT 
      pro_user_id,
      SUM(CASE WHEN pro_ad_type = 'Sale' THEN 1 ELSE 0 END) AS Sale_Count,
      SUM(CASE WHEN pro_ad_type = 'Rent' THEN 1 ELSE 0 END) AS Rent_Count
  FROM 
      property_module
  GROUP BY 
      pro_user_id
) AS property_counts ON agent_module.user_cnct_id = property_counts.pro_user_id 
LEFT JOIN (
  SELECT 
      agent_cnct_id,
      GROUP_CONCAT(DISTINCT work_city) AS work_city
  FROM 
      agent_work_city__subdistrict
  GROUP BY 
      agent_cnct_id
) AS workCity ON agent_module.agent_id = workCity.agent_cnct_id
LEFT JOIN (
  SELECT 
      agent_cnct_id,
      GROUP_CONCAT(DISTINCT work_state) AS work_state
  FROM 
      agent_work_state
  GROUP BY 
      agent_cnct_id
) AS workState ON agent_module.agent_id = workState.agent_cnct_id
LEFT JOIN (
  SELECT 
      agent_cnct_id,
      GROUP_CONCAT(DISTINCT work_sub_district) AS work_sub_district
  FROM 
      agent_work_city__subdistrict
  GROUP BY 
      agent_cnct_id
) AS workSubDistrict ON agent_module.agent_id = workSubDistrict.agent_cnct_id
WHERE 
   user_cnct_id = ?
ORDER BY 
  agent_id DESC;`;
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// SELECT agent_cnct_id,  GROUP_CONCAT( work_city ) as work_city FROM agent_work_city__subdistrict group by work_city;
// SELECT distinct GROUP_CONCAT( work_city ) as work_city , agent_cnct_id   FROM agent_work_city__subdistrict group by work_city;

// SELECT agent_cnct_id, work_city,GROUP_CONCAT( work_sub_district ) as work_sub_district FROM agent_work_city__subdistrict where agent_cnct_id = 7 group by work_city;

export const fetchPropertyDataByAgent = (req, res) => {
  const q =
    `SELECT DISTINCT property_module_images.* , property_module.*, agent_data.agent_type as user_type, agent_data.agent_name FROM property_module left join property_module_images on 
    property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name FROM agent_module) 
    as agent_data on property_module.pro_user_id = agent_data.user_cnct_id where pro_user_id = ? group by pro_id ORDER BY pro_id DESC`;
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyNo = (req, res) => {
  const q = `SELECT 
    SUM(CASE WHEN pro_ad_type = 'Sale' THEN 1 ELSE 0 END) AS Sale_Count,
    SUM(CASE WHEN pro_ad_type = 'Rent' THEN 1 ELSE 0 END) AS Rent_Count
FROM 
    property_module 
WHERE 
    pro_user_id = ?;
    `;
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAgentDataById = (req, res) => {
  const q = "SELECT * FROM agent_module where agent_id = ?";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchAgentNameById = (req, res) => {
  const q = "SELECT agent_name ,agent_sub_district, agent_city, agent_state FROM agent_module where user_cnct_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data);
  });
};

export const fetchAgentDataById1 = (req, res) => {
  const q = "SELECT * FROM agent_module where agent_id = ?";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    const getState =
      "SELECT work_id as id, work_state as name FROM agent_work_state where agent_cnct_id = ?";
    db.query(getState, [req.params.agentId], (err, stateData) => {
      if (err) return res.status(500).json(err);

      const getCity =
        "SELECT work_id as id, work_state as state , work_city as district FROM agent_work_state_city where agent_cnct_id = ?";
      db.query(getCity, [req.params.agentId], (err, cityData) => {
        if (err) return res.status(500).json(err);
        const getSubDistrict =
          "SELECT work_id as id, work_sub_district as sub_district , work_city as district FROM agent_work_city__subdistrict where agent_cnct_id = ?";
        db.query(
          getSubDistrict,
          [req.params.agentId],
          (err, subDistrictData) => {
            if (err) return res.status(500).json(err);
            return res
              .status(200)
              .json({ data, stateData, cityData, subDistrictData });
          }
        );
        //return res.status(200).json(data);
      });
      //return res.status(200).json(data);
    });
    //return res.status(200).json(data);
  });
};

export const fetchWorkStateById = (req, res) => {
  const q =
    "SELECT work_id as id, work_state as name FROM agent_work_state where agent_cnct_id = ?";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchWorkCityById = (req, res) => {
  const q =
    "SELECT work_id as id, work_state as state , work_city as district FROM agent_work_state_city where agent_cnct_id = ?";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchWorkSubDistrictById = (req, res) => {
  const q =
    "SELECT work_id as id, work_sub_district as sub_district , work_city as district FROM agent_work_city__subdistrict where agent_cnct_id = ?";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const checkUserType = (req, res) => {
  const q =
    "SELECT agent_type FROM agent_module where user_cnct_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

