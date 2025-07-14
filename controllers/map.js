import { db } from "../connect.js";


export const fetchMapDataById = (req, res) => {
  const q = "SELECT * FROM city_map_module where map_id = ?";
  db.query(q, [req.params.mapId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchMapData = (req, res) => {
  //updateAdListing();
  //const q = "SELECT * FROM city_map_module";
  const q = "SELECT *  FROM city_map_module;"
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchMapData1 = (req, res) => {
    //updateAdListing();
    //const q = "SELECT * FROM city_map_module";
    const q = "SELECT *  FROM city_map_module where map_city = ?;"
    db.query(q, [req.params.city],(err, data1) => {
      if (err) return res.status(500).json(err);
      const q = "SELECT distinct map_category FROM city_map_module where map_city = ?"
    db.query(q, [req.params.city], (err, data2) => {
      if (err) return res.status(500).json(err);
      const q = "SELECT distinct map_city FROM city_map_module"
    db.query(q, (err, data3) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({data1, data2, data3});
    });
});
    });
  };


export const fetchMapCategory= (req, res) => {
    const q = "SELECT distinct map_category FROM city_map_module;"
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

export const deleteMap = (req, res) => {
  const q =
    "DELETE city_map_module from city_map_module WHERE map_id = ?";
  db.query(q, [req.params.mapId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};


export const checkSubCategory= (req, res) => {
    const q = "SELECT * FROM city_map_module where map_city = ? and map_category = ?  and map_sub_category = ?"
    db.query(q, [req.params.city, req.params.category, req.params.subcategory], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };


