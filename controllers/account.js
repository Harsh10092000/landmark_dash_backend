import { db } from "../connect.js";

export const fetchUserData = (req, res) => {
  const q = "SELECT * FROM login_module where login_id = ?";
  db.query(q, [req.params.loginId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const delReg = (email, res) => {
  const q = "delete from register_module where reg_email = ?";
  db.query(q, email, (err, data) => {
    if (err) return res.status(500).json(err);
  });
};

const delLogin = (id, res) => {
  const q = "delete from login_module where login_id = ?";
  db.query(q, id, (err, data) => {
    if (err) return res.status(500).json(err);
  });
};

const delShortlist = (id, res) => {
  const check = "select * from shortlist_module where shortlist_cnct_id = ?";
  db.query(check, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length < 1) return false;
    const q = "delete from shortlist_module where shortlist_cnct_id = ?";
    db.query(q, id, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
};

const delProperty = (id, res) => {
  const check = "select * from property_module where pro_user_id = ?";
  db.query(check, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length < 1) return false;
    const q = "delete from property_module where pro_user_id = ?";
    db.query(q, id, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
};

const delPropertyImages = (id, res) => {
  const check = "select * from property_module_images where img_user_id = ?";
  db.query(check, id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length < 1) return false;
    const q = "delete from property_module_images where img_user_id = ?";
    db.query(q, id, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
};

export const delData = (req, res) => {
  delReg(req.params.userEmail);
  delLogin(req.params.userId);
  delShortlist(req.params.userId);
  delProperty(req.params.userId);
  delPropertyImages(req.params.userId);
  return res.status(200).json("Deleted Successfully");
};
