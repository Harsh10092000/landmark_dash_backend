


import { createPool } from "mysql";

export const db = createPool({
  host: "194.59.164.60",
  user: "u414768521_landmark_pro",
  password: "Gw[3H&SEBfT",
  database: "u414768521_landmark_pro",
  waitForConnections: true,
  connectionLimit: 10000,
});

