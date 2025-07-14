import { db } from "../connect.js";
import { transporter } from "../nodemailer.js";

export const postRequirement = (req, res) => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const q =
    "INSERT INTO post_requirement_module (data_name, data_phone, data_email , data_in_city, data_pro_type, data_pro_size, data_pro_size_unit, data_price_quo, data_desc) Values (?)";
  const values = [
    req.body.data_name,
    req.body.data_phone,
    req.body.data_email,
    req.body.data_in_city,
    req.body.data_pro_type,
    req.body.data_pro_size,
    req.body.data_pro_size_unit,
    req.body.data_price_quo,
    req.body.data_desc,
  ];
  if (
    req.body.data_name !== "" &&
    req.body.data_phone.length > 9 &&
    req.body.data_in_city !== "" &&
    req.body.data_pro_type !== "" &&
    req.body.data_pro_size !== "" &&
    req.body.data_pro_size_unit !== "" &&
    req.body.data_price_quo !== "" &&
    emailRegex.test(req.body.data_email) === true
  ) {
    db.query(q, [values], (err, data) => {
      let id = data.insertId;
      console.log(values);
      if (err) return res.status(500).json(err);
      let info = {
        from: '"Propertyease " <noreply@propertyease.in>', // sender address
        to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
       
        // to: "harshgupta.calinfo@gmail.com",
        subject: `Query ID - ${1000 + parseInt(id)} Property Requirement from ${
          req.body.data_name
        }`, // Subject line
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
                                      <p style="margin-bottom: 10px; font-size: 16px;">${
                                        req.body.data_email
                                      } submitted new property requirement. </b></p>
                                      <p style="margin-bottom: 10px; font-size: 16px;">You can Contact him/her on ${
                                        req.body.data_phone
                                      }</p>
                                      <p style="margin-bottom: 10px; font-size: 16px;">Property Requirement Details : </p>
                                      <p style=" font-size: 16px;">Property Type - ${
                                        req.body.data_pro_type
                                      }</p>
                                      <p style=" font-size: 16px;">Location - ${
                                        req.body.data_in_city
                                      }</p>
                                      <p style=" font-size: 16px;">Plot Size - ${
                                        req.body.data_pro_size +
                                        " " +
                                        req.body.data_pro_size_unit
                                      }</p>
                                      <p style="margin-bottom: 10px; font-size: 16px;">Client Budget - ${
                                        req.body.data_price_quo
                                      }</p>
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
        let info2 = {
          from: '"Propertyease " <noreply@propertyease.in>', // sender address
          // to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
          // to: "akshit.calinfo07@gmail.com",
           to: req.body.data_email,
          subject: ` Thank you for posting your requirement`, // Subject line
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
                                        <p style="color:#404040; margin-bottom: 10px;"> Dear ${
                                          req.body.data_name
                                        },</b>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">Thank you for posting your requirement. Your Query Id is ${
                                          1000 + parseInt(id)
                                        }  We will be in touch with you soon.</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support +91-89500-40151 anytime for any information related to this enquiry.</p>
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
        transporter.sendMail(info2, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Mail Sent");
        });
        //return res.status(200).json("Mail Sent");
      });

      //return res.status(200).json("Added Successfully");
    });
  } else {
    console.log("not validated");
  }
};

export const fetchReqData = (req, res) => {
  const q = "SELECT * FROM post_requirement_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
