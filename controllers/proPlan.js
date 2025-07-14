import { db } from "../connect.js";


export const addProPlan = (req, res) => {
  const q =
    "INSERT INTO list_property_plans ( pro_plan_name, pro_plan_amt , pro_plan_validity, pro_plan_property_slots) Values (?)";
  const values = [
    req.body.pro_plan_name,
    req.body.pro_plan_amt,
    req.body.pro_plan_validity,
    req.body.pro_plan_list_no,
    req.body.plan_status,
    req.body.order_id,
    req.body.payment_id,
  ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
};


export const updateProPlan = (req, res) => {
    const q =
      "UPDATE list_property_plans SET pro_plan_name = ?, pro_plan_amt = ?, pro_plan_validity = ?, pro_plan_property_slots = ? WHERE pro_plan_id = ?"
    const values = [
      req.body.pro_plan_name,
      req.body.pro_plan_amt,
      req.body.pro_plan_validity,
      req.body.pro_plan_list_no,
      req.body.pro_plan_id,
    ];
      db.query(q, values, (err, data) => {
        console.log(values);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Updated Successfully");
      });
  };


export const fetchProPlanData = (req, res) => {
  const q = "SELECT * FROM list_property_plans";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const maxfreelisting = (req, res) => {
  const q = "SELECT * FROM max_free_listing";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateMaxFreeListing = (req, res) => {
  const q = "UPDATE max_free_listing SET max_free_listing_val = ? WHERE id = 1";
  const values = [req.body.max_listing];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};


// export const fetchProPlanDataBId = (req, res) => {
//   const q = "SELECT * FROM list_plan_transactions where user_id = ?";
//   db.query(q, [req.params.userId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };

export const fetchProPlanDataBId = (req, res) => {
  const q = "SELECT * FROM user_plans where user_id = ? order by user_plan_id desc";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchCurrentPlanDataById = (req, res) => {
  const q = "SELECT login_module.plan_status as login_plan_status, login_module.free_listings_remaining, login_module.plan_validity_end, login_module.paid_listings_remaining, login_module.is_lifetime_free, user_plans.* FROM login_module left join user_plans on user_plans.user_id = login_id where login_id = ? order by user_plan_id desc limit 1;";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};






// export const fetchProPlanTran = (req, res) => {
//   const q = "SELECT * FROM list_plan_transactions";
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };


export const fetchProPlanTran = (req, res) => {
  const q = "SELECT * FROM user_plans order by user_plan_id desc";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAccessLogs = (req, res) => {
  const q = "SELECT * FROM lifetime_access_log order by log_id desc";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// export const buyProPlan = (req, res) => {
//   const q =
//     "INSERT INTO list_plan_transactions ( list_plan_id, plan_name, tran_amt, user_id, list_plan_valid_for_days, pro_plan_added_slots, plan_status, order_id, payment_id, payment_status, payment_discount, original_price) Values (?)";
//   const values = [
//     req.body.list_plan_id,
//     req.body.plan_name,
//     req.body.tran_amt,
//     req.body.user_id,
//     req.body.list_plan_valid_for_days,
//     req.body.pro_plan_added_slots,
//     req.body.plan_status,
//     req.body.order_id,
//     req.body.payment_id,
//     req.body.payment_status,
//     req.body.discount,
//     req.body.original_price,
//   ];
//     db.query(q, [values], (err, data) => {
//       console.log(values);
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Added Successfully");
//     });
// };


//  transaction_id
export const buyProPlan = (req, res) => {
  const q =
    "INSERT INTO user_plans (user_id, plan_id, plan_name, plan_amt, transaction_amt, order_id, payment_id, max_listing, plan_status, payment_status, plan_dis) Values (?)";
  const values = [
    req.body.user_id,
    req.body.list_plan_id,
    req.body.plan_name,
    req.body.original_price,
    "0",
    req.body.order_id,
    req.body.payment_id,
    req.body.list_plan_valid_for_days,
    req.body.plan_status,
    req.body.payment_status,
    "0",
  ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);

      // Generate random numbers for padding
const randomPadInsert = Math.floor(Math.random() * 10); // Random digit 0-9
const randomPadUser = Math.floor(Math.random() * 10);   // Random digit 0-9
const randomPadSlots = Math.floor(Math.random() * 10);  // Random digit 0-9

// Apply padding with random numbers
const paddedInsertId = String(insertId).padStart(3, randomPadInsert); // 3 digits
const paddedUserId = String(req.body.user_id).padStart(3, randomPadUser); // 3 digits
const paddedSlots = String(req.body.pro_plan_added_slots).padStart(2, randomPadSlots);

    //   const paddedInsertId = String(insertId).padStart(3, '5'); // 6 digits
    // const paddedUserId = String(req.body.user_id).padStart(3, '8'); // 6 digits
    // const paddedSlots = String(req.body.pro_plan_added_slots).padStart(2, '9'); // 3 digits
    const transactionId = `TXN-${paddedInsertId}${paddedUserId}${paddedSlots}`;

    const q2 =
          "UPDATE user_plans SET transaction_id = ? WHERE user_plan_id = ?";
          const values2 = [transactionId,insertId];
          db.query(q2, values2, (err, data) => {
            if (err) return res.status(500).json(err);

      return res.status(200).json("Added Successfully");
  });
});
};


export const fetchProPlanDataById = (req, res) => {
    const q = "SELECT * FROM list_property_plans WHERE pro_plan_id = ?";
    db.query(q, [req.params.planId] , (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const deleteProPlan = (req, res) => {
    const q =
      "DELETE list_property_plans from list_property_plans WHERE pro_plan_id = ?";
    db.query(q, [req.params.planId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("DELETED");
    });
  };
  
  
  export const updateProPlanStatus = (req, res) => {
    const q = "UPDATE list_property_plans SET pro_plan_listed = ? WHERE pro_plan_id = ?";
    const values = [req.body.pro_plan_listed, req.body.pro_plan_id];
    db.query(q, values, (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Updated Successfully");
    });
  };