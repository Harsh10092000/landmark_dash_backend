import { db } from "../connect.js";
import { transporter } from "../nodemailer.js";
const val = 700;
export const autoRemovePropertyReminder = (req, res) => {
  let emailData = "";
  // const getMailData = `SELECT pro_id, pro_renew_date,
  //       DATEDIFF(pro_renew_date, DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))) AS days_until_renewal
  //       FROM property_module;`;
  const getMailData = `SELECT distinct login_email , DATEDIFF(pro_renew_date, DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))) AS days_until_renewal , pro_url, pro_renew_date
  FROM property_module left join login_module on login_module.login_id = property_module.pro_user_id 
  WHERE DATEDIFF(pro_renew_date, DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))) = 2;`;
  db.query(getMailData, (err, mailData) => {
    if (err) return res.status(500).json(err);
    console.log("mailData.length 22 : " , mailData.length);
    if (mailData.length > 0) {
      mailData.map((item) => {
        emailData = item.login_email;
        console.log("emailData 22 : ", emailData);
  
        let info = {
          from: '"Propertyease " <noreply@propertyease.in>',
          //to: "harshgupta.calinfo@gmail.com",
          //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com",
          to: req.body.pro_user_email,
          subject: `Action Required: Your Property Listing Expires in 2 Days!`,
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
                                          <p style="margin-bottom: 10px; font-size: 16px;">We wanted to remind you that your property listing is set to expire in just 2 days. To ensure your property remains active and visible to potential buyers or renters, we recommend renewing the listing before it expires.</b></p>
                                          <a href='https://www.propertyease.in/${
                                            item.pro_url
                                          }' style="margin-bottom: 10px; font-size: 16px;">${
            item.pro_url
          }</a>
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
  
        transporter.sendMail(info, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("mail sent");
        });
      });
    } else {
      return res.status(200).json("no user found");
    }
    
  });
  // const updateData =
  //   `update property_module set pro_listed = 0 where DATEDIFF(pro_creation_date,pro_renew_date) = -1 ;`;
  // db.query(updateData, (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   next();
  //if (data.length < 1) return false;
  // const q =
  //   "DELETE FROM agent_work_city__subdistrict WHERE agent_cnct_id = ?;";
  // db.query(q, id, (err, data) => {
  //   if (err) return res.status(500).json(err);
  // });
  // });
};

export const autoRemoveProperty = (req, res) => {
  let emailData = "";
  const getMailData = `SELECT distinct login_email , DATEDIFF(pro_renew_date, DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))) AS days_until_renewal ,pro_url
  FROM property_module left join login_module on login_module.login_id = property_module.pro_user_id 
  WHERE DATEDIFF(pro_renew_date, DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))) = 0;`;
  const updateData = `update property_module set pro_listed = 0 WHERE DATEDIFF(pro_renew_date, DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))) = 0 and pro_listed = 1;`;
  db.query(getMailData, (err, mailData) => {
    if (err) return res.status(500).json(err);

    db.query(updateData, (err, result) => {
      if (err) return res.status(500).json(err);
      console.log("mailData.length 11 : " , mailData.length);
      if (mailData.length > 0) {
      mailData.map((item) => {
        emailData = item.login_email;
        console.log("emailData 11 : ", emailData);

        let info = {
          from: '"Propertyease " <noreply@propertyease.in>',
          //to: "harshgupta.calinfo@gmail.com",
          //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com",
          to: req.body.pro_user_email,
          subject: `Your Property Listing Has Expired`,
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
                                       <p style="margin-bottom: 10px; font-size: 16px;">We regret to inform you that your property listing has expired and is no longer active on our platform. As a result, potential buyers or renters will no longer be able to view or inquire about your property.</b></p>
                                       <a href='https://www.propertyease.in/${
                                         item.pro_url
                                       }' style="margin-bottom: 10px; font-size: 16px;">${
            item.pro_url
          }</a>
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

        transporter.sendMail(info, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("mail sent");
        });
      });
    }
    });
  
  });
  // const updateData =
  //   `update property_module set pro_listed = 0 where DATEDIFF(pro_creation_date,pro_renew_date) = -1 ;`;
  // db.query(updateData, (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   next();
  //if (data.length < 1) return false;
  // const q =
  //   "DELETE FROM agent_work_city__subdistrict WHERE agent_cnct_id = ?;";
  // db.query(q, id, (err, data) => {
  //   if (err) return res.status(500).json(err);
  // });
  // });
};
