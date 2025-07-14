// import mysql from "mysql";
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "property",
// });
import { createPool } from "mysql";

export const db = createPool({
  host: "191.101.230.154",
  user: "u747016719_property",
  password: "~rXHj4h0=R",
  database: "u747016719_propertyease",
  connectionLimit: 10000,
});
