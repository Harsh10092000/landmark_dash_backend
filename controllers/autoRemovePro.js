import { db } from "../connect.js";

export const fetchData = (req, res) => {
    const q = "SELECT * FROM auroRemoveProperty";
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const updateAutoRemovalProperty = (req, res) => {
    const q = "UPDATE auroRemoveProperty SET no_days = ? WHERE id = 1";
    const values = [req.body.no_of_days];
    db.query(q, values, (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Updated Successfully");
    });
  };