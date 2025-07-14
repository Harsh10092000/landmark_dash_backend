import { db } from "../connect.js";
import { transporter } from "../nodemailer.js";

export const test = (req,res) => {
    console.log("hello")
}