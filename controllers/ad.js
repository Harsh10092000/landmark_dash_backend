import { db } from "../connect.js";
import { transporter } from "../nodemailer.js";


const updateAdListing = (res) => {
  const updateData =
    "update ad_module set ad_listed = 0 where DATEDIFF(ad_created_at, CONVERT_TZ(NOW(), '+00:00', '+05:30')) < -ad_days ;";
  db.query(updateData, (err, data) => {
    if (err) return res.status(500).json(err);
    //if (data.length < 1) return false;
    // const q =
    //   "DELETE FROM agent_work_city__subdistrict WHERE agent_cnct_id = ?;";
    // db.query(q, id, (err, data) => {
    //   if (err) return res.status(500).json(err);
    // });
  });
};



export const fetchAdData = (req, res) => {
  updateAdListing();
  const q = "SELECT * FROM ad_module where ad_listed = 1 and ad_type = 'property_page_ad_1'";
  db.query(q, (err, propertyPageData1) => {
    if (err) return res.status(500).json(err);
    //return res.status(200).json(data);
    const q = "SELECT * FROM ad_module where ad_listed = 1 and ad_type = 'property_page_ad_2'";
  db.query(q, (err, propertyPageData2) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({propertyPageData1,propertyPageData2});
  });
  });
};

export const fetchAdData2 = (req, res) => {
  updateAdListing();
  const q = "SELECT * FROM ad_module where ad_listed = 1 and ad_type = 'all_properties_ad_1'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
    
  });
};

export const fetchAdData3 = (req, res) => {
  updateAdListing();
  const q = "SELECT * FROM ad_module where ad_listed = 1 and ad_type = 'all_properties_ad_2'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAdDataById = (req, res) => {
  const q = "SELECT * FROM ad_module where ad_id = ?";
  db.query(q, [req.params.adId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchAllData = (req, res) => {
updateAdListing();
  //const q = "SELECT * FROM ad_module";
  const q = "SELECT ad_module.*,  IF( DATEDIFF(ad_created_at, CONVERT_TZ(NOW(), '+00:00', '+05:30')) < -ad_days, '0', '1') as status  FROM ad_module;"
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteAd = (req, res) => {
  const q =
    "DELETE ad_module from ad_module WHERE ad_id = ?";
  db.query(q, [req.params.adId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};


export const updateAdListingStatus = (req, res) => {
  const q = "UPDATE ad_module SET ad_listed = ? WHERE ad_id = ?";
  const values = [req.body.ad_listed, req.body.ad_id];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};