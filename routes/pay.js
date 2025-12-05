import express from "express";
import { db } from "../connect.js";
import Razorpay from "razorpay";
import "dotenv/config";
import crypto from "crypto";
import { transporter } from "../nodemailer.js";

const router = express.Router();

const razorpay1 = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});



router.post("/proListingPay", async (req, res) => {
  console.log(req.body.amount);
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_1",
    payment_capture: 1,
  };

  try {
    const order = await razorpay1.orders.create(options);
    console.log("orderdata : ", order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/paymentVerification", async (req, res) => {
  console.log("req.body 2222222222 : ", req.body);
  const {
    orderCreationId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    list_plan_id,
    plan_name,
    tran_amt,
    list_plan_valid_for_days,
    user_id,
    pro_plan_added_slots,
    plan_status,
    payment_status,
    discount,
    original_price,
    pro_added_recently,
    total_no_pro_user_can_add,
    login_email,
    login_number,

  } = req.body;

  const body = orderCreationId + "|" + razorpayPaymentId;
  console.log("body 22222222222 : ", body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (isAuthentic) {

   const currentDate = new Date(); 
    currentDate.setDate(currentDate.getDate() + parseInt(req.body.list_plan_valid_for_days));
        
    const formattedDate = currentDate.getFullYear() + '-' +
      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(currentDate.getDate()).padStart(2, '0') + ' ' +
      String(currentDate.getHours()).padStart(2, '0') + ':' +
      String(currentDate.getMinutes()).padStart(2, '0') + ':' +
      String(currentDate.getSeconds()).padStart(2, '0');
    
      const q =
      "INSERT INTO user_plans (user_id, plan_id, plan_name, plan_amt, transaction_amt, order_id, payment_id, expiry_date, max_listing, plan_status, payment_status, plan_dis) Values (?)";
    const values = [
      req.body.user_id,
      req.body.list_plan_id,
      req.body.plan_name,
      req.body.original_price,
      req.body.tran_amt,
      req.body.razorpayOrderId,
      req.body.razorpayPaymentId,
      formattedDate,
      req.body.list_plan_valid_for_days,
      req.body.plan_status,
      "completed",
      req.body.discount,
    ];


    db.query(q, [values], (err, data) => {
      const insertId = data.insertId;
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
      
   //    const paddedInsertId = String(insertId).padStart(3, '5'); // 6 digits
   //  const paddedUserId = String(req.body.user_id).padStart(3, '8'); // 6 digits
   //  const paddedSlots = String(req.body.pro_plan_added_slots).padStart(2, '9'); // 3 digits
    const transactionId = `TXN-${paddedInsertId}${paddedUserId}${paddedSlots}`;
   const plan_status = 1;
            const q1 =
          "UPDATE login_module SET active_plan_id = ?, plan_validity_end = ?, paid_listings_remaining = ?, plan_status = ? WHERE login_id = ?";
          const values1 = [transactionId, formattedDate, req.body.pro_plan_added_slots, plan_status, req.body.user_id] ;
          db.query(q1, values1, (err, data) => {
            if (err) return res.status(500).json(err);
            console.log("values1 : " , values1);
            const q2 =
          "UPDATE user_plans SET transaction_id = ? WHERE user_plan_id = ?";
          const values2 = [transactionId,insertId];
          db.query(q2, values2, (err, data) => {
            if (err) return res.status(500).json(err);
            
      //return res.status(200).json(1);
      let info = {
        from: '"Propertyease " <noreply@propertyease.in>', // sender address
        //to: data[0].login_email,
        to: "harshgupta.calinfo@gmail.com",
        //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
        //to: req.body.pro_user_email,
        subject: `Thank You for Subscribing!`, // Subject line
        html: `<div style="margin:0px;padding:0px;">
       <div style="margin:0px;padding:0px;  margin: 30px auto; width: 700px; padding: 10px 10px;  background-color: #f6f8fc; box-shadow:rgba(13, 109, 253, 0.25) 0px 25px 50px -10px !important; ">
          <table cellpadding="0" style="width:700px;margin:auto;display:block;font-family:\'trebuchet ms\',geneva,sans-serif;">
             <tbody>
                <tr>
                   <td style="width:700px;display:block;clear:both">
                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style=" margin-top:30px;background-clip:padding-box;border-collapse:collapse;border-radius:5px;">
    
                         <tr style="height:80px; text-align:center;">
                            <td style="padding-left:22px; padding-bottom: 10px"><img src="https://property-five.vercel.app/images/logo.png">
                            </td>
                         </tr>
                   </td>
                </tr>
                <tr>
                   <td>
                      <table style="width:500px;clear:both" border="0" align="center" cellpadding="0" cellspacing="0">
    
                         <tr>
                            <td>
                               <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 0px 0px 0px;">
    
                                  <tr>
                                     <td height="10px" style="font-size: 16px;line-height: 24px;letter-spacing:.3px;">
                                        <p style="color:#404040; margin-bottom: 10px;"> Dear User,</b>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">Thank you for choosing us. we're committed to providing you with the best services possible. </p>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">If you have any questions or feedback, please don't hesitate to reach out to us. We're here to help.</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support at <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
                                        </td>
                                  </tr>
                                  <tr>
                                     <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
                                        <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
                                           </b></p>
                                        <p style="margin-bottom:0px; font-size: 15px;">Admin Team</p>
                                        <p style="margin-bottom: 10px; font-size: 15px;">Propertyease.in</p>
    
                                     </td>
                                  </tr>
                               </table>
                            </td>
                         </tr>
    
                      </table>
                   </td>
                </tr>
                <tr>
                   <td style="font-size: 14px;text-align: center;line-height: 21px;letter-spacing: .3px; color: #155298; height: 68px;">
    
                      <p style="line-height:22px;margin-bottom:0px;padding: 10px;  color:#000;font-size: 12px;">
                         &copy; Copyright ${new Date().getFullYear()} All Rights Reserved.</p>
                   </td>
                </tr>
    
             </tbody>
          </table>
       </div>
    </div>`,
      };
      let info2 = {
        from: '"Propertyease " <noreply@propertyease.in>', // sender address
        //to: data[0].login_email,
        to: "harshgupta.calinfo@gmail.com",
        //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
        //to: req.body.pro_user_email,
        subject: `Subscription Sold`, // Subject line
        html: `<div style="margin:0px;padding:0px;">
       <div style="margin:0px;padding:0px;  margin: 30px auto; width: 700px; padding: 10px 10px;  background-color: #f6f8fc; box-shadow:rgba(13, 109, 253, 0.25) 0px 25px 50px -10px !important; ">
          <table cellpadding="0" style="width:700px;margin:auto;display:block;font-family:\'trebuchet ms\',geneva,sans-serif;">
             <tbody>
                <tr>
                   <td style="width:700px;display:block;clear:both">
                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style=" margin-top:30px;background-clip:padding-box;border-collapse:collapse;border-radius:5px;">
    
                         <tr style="height:80px; text-align:center;">
                            <td style="padding-left:22px; padding-bottom: 10px"><img src="https://property-five.vercel.app/images/logo.png">
                            </td>
                         </tr>
                   </td>
                </tr>
                <tr>
                   <td>
                      <table style="width:500px;clear:both" border="0" align="center" cellpadding="0" cellspacing="0">
    
                         <tr>
                            <td>
                               <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 0px 0px 0px;">
    
                                  <tr>
                                     <td height="10px" style="font-size: 16px;line-height: 24px;letter-spacing:.3px;">
                                        <p style="color:#404040; margin-bottom: 10px;"> Dear Admin,</b>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">${login_email} has purchased ${plan_name} plan.</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Transaction Id: ${9000 + parseInt(insertId)}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Subscriber Id: ${user_id}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Plan Name: ${plan_name}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Plan Amount: ${tran_amt}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Plan Valid For: ${list_plan_valid_for_days} Days</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">You can Contact him/her on <a href="https://wa.me/${"91"+login_number}">+91-${login_number}</a>.</p>
                                        </td>
                                  </tr>
                                  <tr>
                                     <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
                                        <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
                                           </b></p>
                                        <p style="margin-bottom:0px; font-size: 15px;">Admin Team</p>
                                        <p style="margin-bottom: 10px; font-size: 15px;">Propertyease.in</p>
    
                                     </td>
                                  </tr>
                               </table>
                            </td>
                         </tr>
    
                      </table>
                   </td>
                </tr>
                <tr>
                   <td style="font-size: 14px;text-align: center;line-height: 21px;letter-spacing: .3px; color: #155298; height: 68px;">
    
                      <p style="line-height:22px;margin-bottom:0px;padding: 10px;  color:#000;font-size: 12px;">
                         &copy; Copyright ${new Date().getFullYear()} All Rights Reserved.</p>
                   </td>
                </tr>
    
             </tbody>
          </table>
       </div>
    </div>`,
      };
      transporter.sendMail(info, (err, data) => {
        if (err) return res.status(500).json(err);
        transporter.sendMail(info2, (err, data) => {
          if (err) return res.status(500).json(err);
        
          return res.status(200).json(1);
        });
        //return res.status(200).json(insertId);
      });
   });
   });
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

export default router;
