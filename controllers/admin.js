import { db } from "../connect.js";


export const fetchAll = (req, res) => {
  const q =
    "SELECT property_module.*,login_module.* from property_module LEFT JOIN login_module ON login_module.login_id = property_module.pro_user_id ORDER BY pro_id DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteProperty = (req, res) => {
  const q =
    "DELETE property_module.*,property_module_images.* from property_module LEFT JOIN property_module_images ON property_module_images.img_cnct_id = property_module.pro_id WHERE pro_id = ?";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};
export const fetchInterested = (req, res) => {
  // const q =
  //   "SELECT  property_interest.*, property_module.*, login_module.* FROM property_interest LEFT JOIN login_module ON property_interest.interest_person_id = login_module.login_id left join property_module on property_interest.interest_property_id = property_module.pro_id ORDER BY pro_id DESC";
  const q = "SELECT  property_interest.*, property_module.*FROM property_interest left join property_module on property_interest.interest_property_id = property_module.pro_id ORDER BY pro_id DESC;"
 
    db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const fetchUsers = (req, res) => {
  const q = "SELECT * from login_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// export const fetchUsers1 = (req, res) => {
//   const q = "SELECT login_module.* , agent_module.agent_type from login_module left join agent_module on agent_module.user_cnct_id = login_module.login_id order by login_id desc";
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };


//list_plan_transactions ON list_plan_transactions.user_id = property_module.pro_user_id 
// export const fetchUsers1 = (req, res) => {
//   const q = `SELECT 
//   login.*, 
//   agent.agent_type, 
//   property_count.count_of_properties,
//   property_module.pro_user_id,
//   property_module.pro_auto_inactive,
//   pro_count.pro_count, 
//   pro_count.pro_creation_date, 
//   DATEDIFF(CONVERT_TZ(pro_count.pro_creation_date, '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30')) AS Days, 
//   COALESCE(list_plan_transactions.pro_plan_added_slots, 0) AS pro_plan_added_slots,
//   COALESCE(list_plan_transactions.plan_status, 0) AS plan_status,
//   COALESCE(list_plan_transactions.list_plan_starts_on, 0) AS list_plan_starts_on,
//   COALESCE(list_plan_transactions.tran_id, 0) AS tran_id
// FROM 
//   login_module AS login 
// LEFT JOIN 
//   agent_module AS agent ON agent.user_cnct_id = login.login_id 
// LEFT JOIN 
//   property_module ON login.login_id = property_module.pro_user_id
// LEFT JOIN 
//   (SELECT 
//      pro_user_id,
//      COUNT(pro_id) AS count_of_properties 
//    FROM 
//      property_module 
//    GROUP BY 
//      pro_user_id
//   ) AS property_count ON login.login_id = property_count.pro_user_id 
// LEFT JOIN 
//   (SELECT 
//      pro_user_id,
//      COUNT(pro_id) AS pro_count, 
//      pro_creation_date
//    FROM 
//      property_module 
//    WHERE 
//      DATEDIFF(pro_creation_date, CONVERT_TZ(NOW(), '+00:00', '+05:30')) > -30 
//    GROUP BY 
//      pro_user_id
//   ) AS pro_count ON login.login_id = pro_count.pro_user_id
// LEFT JOIN 
  
//   list_plan_transactions ON list_plan_transactions.user_id = login.login_id
//                          AND (list_plan_transactions.plan_status = 1 OR list_plan_transactions.plan_status = 2 ) group by login.login_id
// ORDER BY 
//   login.login_id DESC;`;
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };


export const fetchUsers1 = (req, res) => {
  const q = `SELECT 
  login.*, 
  agent.agent_type, 
  property_count.count_of_properties,
  property_module.pro_user_id,
  property_module.pro_auto_inactive,
  pro_count.pro_count, 
  pro_count.pro_creation_date, 
  DATEDIFF(CONVERT_TZ(pro_count.pro_creation_date, '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30')) AS Days
FROM 
  login_module AS login 
LEFT JOIN 
  agent_module AS agent ON agent.user_cnct_id = login.login_id 
LEFT JOIN 
  property_module ON login.login_id = property_module.pro_user_id
LEFT JOIN 
  (SELECT 
     pro_user_id,
     COUNT(pro_id) AS count_of_properties 
   FROM 
     property_module 
   GROUP BY 
     pro_user_id
  ) AS property_count ON login.login_id = property_count.pro_user_id 
LEFT JOIN 
  (SELECT 
     pro_user_id,
     COUNT(pro_id) AS pro_count, 
     pro_creation_date
   FROM 
     property_module 
   WHERE 
     DATEDIFF(pro_creation_date, CONVERT_TZ(NOW(), '+00:00', '+05:30')) > -30 
   GROUP BY 
     pro_user_id
  ) AS pro_count ON login.login_id = pro_count.pro_user_id group by login.login_id
ORDER BY 
  login.login_id DESC;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};




export const fetchShorlist = (req, res) => {
  const q =
    "SELECT  shortlist_module.*, property_module.*, login_module.* FROM shortlist_module LEFT JOIN login_module ON shortlist_module.shortlist_cnct_id = login_module.login_id left join property_module on shortlist_module.shortlist_pro_id = property_module.pro_id ORDER BY pro_id DESC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


// export const grantAccessToListProperty = (req, res) => {
//   console.log(req.body)
//   const q =
//     "INSERT INTO list_plan_transactions ( list_plan_id, plan_name, tran_amt, user_id, list_plan_valid_for_days, pro_plan_added_slots, plan_status, order_id, payment_id, payment_status, pro_added_recently, total_no_pro_user_can_add) Values (?)";
//   const values = [
//     "Access granted by Admin",
//     "Access granted by Admin",
//     "0",
//     req.body,
//     "5000",
//     "5000",
//     "2",
//     "0",
//     "0",
//     "Success",
//     "0",
//     "5000",
//   ];
//     db.query(q, [values], (err, data) => {
//       console.log(values);
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Added Successfully");
//     });
// };


export const grantAccessToListProperty = (req, res) => {
  console.log(req.body)
  const q =
    "UPDATE login_module SET is_lifetime_free = TRUE WHERE login_id = ?";
    const values = [req.body];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      const q1 =
      "INSERT INTO lifetime_access_log (user_id, payment_status) VALUES (?)";
      const values1 = [
        req.body,
        "granted"
      ]
      db.query(q1, [values1], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
    });
};


export const revokeAccessToListProperty = (req, res) => {
  console.log(req.body)
  const q =
    "UPDATE login_module SET is_lifetime_free = FALSE WHERE login_id = ?";
    const values = [req.body];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      const q1 =
      "INSERT INTO lifetime_access_log (user_id, payment_status) VALUES (?)";
      const values1 = [
        req.body,
        "revoked"
      ]
      db.query(q1, [values1], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Added Successfully");
      });
    });
};



// export const revokeAccessToListProperty = (req, res) => {
//   const q = "UPDATE list_plan_transactions SET plan_status = ? WHERE tran_id = ?";
//   const values = ["3", req.body];
//   db.query(q, values, (err, data) => {
//     console.log(values);
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("Updated Successfully");
//   });
// };


export const addProListingCoupon = (req, res) => {

  const q =
    "INSERT INTO pro_listing_coupon_module ( coupon_code, coupon_name, coupon_amt, coupon_valid_from, coupon_valid_till, coupon_status) Values (?)";
  const values = [
    req.body.pro_coupon_code,
    req.body.pro_coupon_name,
    req.body.pro_coupon_amt,
    req.body.pro_coupon_valid_form,
    req.body.pro_coupon_valid_till,
    "1",
    //req.body.pro_coupon_validity,
    //req.body.pro_coupon_list_no
  ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
};


export const updateProListingCoupon = (req, res) => {
  const q =
    "UPDATE pro_listing_coupon_module SET coupon_code = ?, coupon_name = ?, coupon_amt = ?, coupon_valid_from = ? , coupon_valid_till = ? WHERE coupon_id = ?"
  const values = [
    req.body.pro_coupon_code,
    req.body.pro_coupon_name,
    req.body.pro_coupon_amt,
    req.body.pro_coupon_valid_form,
    req.body.pro_coupon_valid_till,
    req.body.coupon_id,
  ];
    db.query(q, values, (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Updated Successfully");
    });
};

export const fetchCouponDataById = (req, res) => {
  const q = "SELECT * FROM pro_listing_coupon_module where coupon_id = ?";
  db.query(q, [req.params.couponId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchCouponData = (req, res) => {
  const q = "SELECT pro_listing_coupon_module.*,  IF( DATEDIFF(coupon_valid_till, CONVERT_TZ(NOW(), '+00:00', '+05:30')) = 0, '0', '1') as status FROM pro_listing_coupon_module;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const deleteCoupon = (req, res) => {
  const q =
    "DELETE pro_listing_coupon_module from pro_listing_coupon_module WHERE coupon_id = ?";
  db.query(q, [req.params.couponId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};


export const updateCouponStatus = (req, res) => {
  const q = "UPDATE pro_listing_coupon_module SET coupon_status = ? WHERE coupon_id = ?";
  const values = [req.body.coupon_status, req.body.coupon_id];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};


export const fetchCouponCode = (req, res) => {
  const q = "SELECT * FROM pro_listing_coupon_module where coupon_code = ? and coupon_status = 1 and DATEDIFF(coupon_valid_till, CONVERT_TZ(NOW(), '+00:00', '+05:30')) != 0";
  db.query(q, [req.params.couponCode], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};



export const fetchDefaultInactiveDuration = (req, res) => {
  const q = "SELECT * FROM u747016719_propertyease.default_pro_inactive;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};



