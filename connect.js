// import mysql from "mysql";
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "property",
// });
// import { createPool } from "mysql";

// export const db = createPool({
//   host: "191.101.230.154",
//   user: "u747016719_property",
//   password: "~rXHj4h0=R",
//   database: "u747016719_propertyease",
//   connectionLimit: 10000,
// });


import { createPool } from "mysql";

export const db = createPool({
  host: "194.59.164.60",
  user: "u414768521_landmark_pro",
  password: "Gw[3H&SEBfT",
  database: "u414768521_landmark_pro",
  waitForConnections: true,
  connectionLimit: 10000,
});

