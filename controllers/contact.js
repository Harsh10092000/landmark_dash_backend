import { transporter } from "../nodemailer.js";
import { db } from "../connect.js";
import "dotenv/config"
import axios from "axios";

export const updateContacted = (req, res) => {
  const q = "UPDATE property_module SET pro_contacted = ? WHERE pro_id = ?";
  const values = [req.body.pro_contacted, req.body.pro_id];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const askquestion = (req, res) => {
  const { userId, phone, propertySlug, proId, user_id, pro_user_id } = req.body;
  const q =
    "INSERT INTO property_interest (interest_property_id,interest_person_id) VALUES(?)";
  const values = [proId, user_id];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const q = "SELECT * from login_module where login_id = ?";
    db.query(q, [pro_user_id], (err, data) => {
      let info = {
        from: '"Propertyease " <noreply@propertyease.in>', // sender address
        to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
        //   to: "akshit.calinfo07@gmail.com",
        // to: "harshgupta.calinfo@gmail.com",
        subject: `${userId} Showed Interest in a Property`, // Subject line
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
                                        <p style="margin-bottom: 10px; font-size: 16px;">${userId} has shown interest in the following Property</b></p>
                                        <a href='https://www.propertyease.in/${propertySlug}' style="margin-bottom: 10px; font-size: 16px;">${propertySlug}</a>
                                        <p style="margin-bottom: 10px; font-size: 16px;">You can Contact him/her on <a href="https://wa.me/91${phone}">+91-${phone}</a></p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">${
                                          data[0].login_email
                                        } posted this property. You can contact him/her on <a href="https://wa.me/91${
          data[0].login_number
        }">+91-${data[0].login_number}</a>.</p>
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
        return res.status(200).json("Mail Sent");
      });
    });
  });
};

export const freeEnquiry = (req, res) => {
  const { name, email, phone } = req.body;

  let info = {
    from: '"Propertyease " <noreply@propertyease.in>', // sender address
    to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
    //to: "harshgupta.calinfo@gmail.com",
    subject: `Free Enquiry Request by ${name}`, // Subject line
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
                                       <p style="margin-bottom: 10px; font-size: 16px;">${name} is asking for a free enquiry.</b></p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">With Email : ${email}</p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">You can Contact him/her on ${phone}</p>
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
    return res.status(200).json("Sent");
  });
};




// html: `<div style="margin:0px;padding:0px;">
//      <div style="margin:0px;padding:0px;  margin: 30px auto; width: 700px; padding: 10px 10px;  background-color: #f6f8fc; box-shadow:rgba(13, 109, 253, 0.25) 0px 25px 50px -10px !important; ">
//         <table cellpadding="0" style="width:700px;margin:auto;display:block;font-family:\'trebuchet ms\',geneva,sans-serif;">
//            <tbody>
//               <tr>
//                  <td style="width:700px;display:block;clear:both">
//                     <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style=" margin-top:30px;background-clip:padding-box;border-collapse:collapse;border-radius:5px;">
  
//                        <tr style="height:80px; text-align:center;">
//                           <td style="padding-left:22px; padding-bottom: 10px"><img src="https://property-five.vercel.app/images/logo.png">
//                           </td>
//                        </tr>
//                  </td>
//               </tr>
//               <tr>
//                  <td>
//                     <table style="width:500px;clear:both" border="0" align="center" cellpadding="0" cellspacing="0">
  
//                        <tr>
//                           <td>
//                              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 0px 0px 0px;">
  
//                                 <tr>
//                                    <td height="10px" style="font-size: 16px;line-height: 24px;letter-spacing:.3px;">
//                                       <p style="color:#404040; margin-bottom: 10px;"> Dear User,</b>
//                                       <p style="margin-bottom: 10px; font-size: 16px;">Someone showed interest in your property. Our team is going through it and get back to you.  </b></p>
//                                       <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
//                                    </td>
//                                 </tr>
//                                 <tr>
//                                    <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
//                                       <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
//                                          </b></p>
//                                       <p style="margin-bottom:0px; font-size: 15px;">Admin Team</p>
//                                       <p style="margin-bottom: 10px; font-size: 15px;">Propertyease.in</p>
  
//                                    </td>
//                                 </tr>
//                              </table>
//                           </td>
//                        </tr>
  
//                     </table>
//                  </td>
//               </tr>
//               <tr>
//                  <td style="font-size: 14px;text-align: center;line-height: 21px;letter-spacing: .3px; color: #155298; height: 68px;">
  
//                     <p style="line-height:22px;margin-bottom:0px;padding: 10px;  color:#000;font-size: 12px;">
//                        &copy; Copyright ${new Date().getFullYear()} All Rights Reserved.</p>
//                  </td>
//               </tr>
  
//            </tbody>
//         </table>
//      </div>
//   </div>`,


export const freeEnquiry2 = (req, res) => {
  const { name, email, phone, propertySlug, pro_user_id, pro_contacted, pro_id  } = req.body;
  const q = "SELECT * from login_module where login_id = ?";
  db.query(q, [pro_user_id], (err, data) => {
    let info = {
      from: '"Propertyease " <noreply@propertyease.in>', // sender address
      to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com",
      //to: "harshgupta.calinfo@gmail.com",/ list of receivers
      subject: `${name} Showed Interest in a Property (ID: ${pro_id})`,
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
                                      
                                      <p style="margin-bottom: 10px; font-size: 16px;">${name}, ${email} has shown interest in the following Property. You can Contact him/her on <a href="https://wa.me/91${phone}">+91-${phone}</a></b></p>
                                       <p style="color:#404040; margin-bottom: 10px;"><strong>Property Details : </strong></b>
                                      
                                      <a href='https://www.propertyease.in/${propertySlug}' style="margin-bottom: 10px; font-size: 16px;">${propertySlug}</a>

                                     
                                      
                                      <p style="margin-bottom: 10px; font-size: 16px;"><strong>Posted by : </strong>${
                                        data[0].login_email
                                      } posted this property. You can contact him/her on <a href="https://wa.me/91${
        data[0].login_number
      }">+91-${data[0].login_number}</a>.</p>
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
      to: data[0].login_email,
      //to: "harshgupta.calinfo@gmail.com",
      subject: `Someone Showed Interest in your Property`, // Subject line
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
                                      <p style="margin-bottom: 10px; font-size: 16px;">${name}, ${email} has shown interest in your property. You can Contact him/her on <a href="https://wa.me/91${phone}">+91-${phone}</a>.  </b></p>
                                     
                                       <p style="color:#404040; margin-bottom: 10px; font-size: 16px;"><strong>Property Details : </strong></b>
                                      
                                      <a href='https://www.propertyease.in/${propertySlug}' style="margin-bottom: 10px; font-size: 16px;">${propertySlug}</a></p>

                                      <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
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
    let mobile_number = data[0].login_number ;

    console.log(mobile_number);
    transporter.sendMail(info, (err, data) => {
      if (err) return res.status(500).json(err);
      transporter.sendMail(info2, (err, data) => {
        if (err) return res.status(500).json(err);


        const q =
          "UPDATE property_module SET pro_contacted = ? WHERE pro_id = ?";
        const values = [pro_contacted, pro_id];
        console.log("values : " , values);
        db.query(q, values, (err, data) => {
          if (err) return res.status(500).json(err);
          const q =
          
     "INSERT INTO property_interest (interest_property_id, interested_name, interested_email, interested_phone) VALUES(?)";
   const values = [pro_id, name, email, phone];
   db.query(q, [values], async (err, data) => {
     if (err) return res.status(500).json(err);
     const smsResponse = await sendContactedAlertOnMobile(mobile_number, name, phone);
        if (smsResponse.success) {
          return res.status(200).json("Messaage Sent");
        } else {
           return res.status(smsResponse.status || 500).json({ message: "Failed to send messaage", error: smsResponse.message });
        }
     
          //return res.status(200).json("Updated Successfully");
        });
      });
     });
    });
   });
};




const sendContactedAlertOnMobile = async (mobile_number, name, phone) => { 
   console.log("mobile_number, name, phone : " , mobile_number, name, phone);
   const url = `https://api.textlocal.in/send/?apikey=${process.env.SMS_API}&numbers=91${mobile_number}&sender=PROPEZ&message=` + encodeURIComponent(`Hi, ${name} +91- ${phone} expressed interest in your property on propertyease.in`);
   
   try {
      const response = await axios.get(url);
      console.log("response : " , response.data);
      if (response.status === 200) {
         return { success: true };
      } else {
         return { success: false, status: response.status };
      }
   } catch (error) {
      console.error("Error sending message:", error);
      return { success: false, message: error.message };
   }
};



export const contactAgent = (req, res) => {
  const {
    name,
    email,
    phone,
    queryType,
    agentname,
    agentemail,
    agentphone,
    agentid,
  } = req.body;
  let info = {
    from: '"Propertyease " <noreply@propertyease.in>', // sender address
    to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
    //to: "harshgupta.calinfo@gmail.com",
    subject: `${name} Contacted Broker`, // Subject line
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
                                        <p style="margin-bottom: 10px; font-size: 16px;">${name} has reached out to following broker expressing interest in ${queryType} property.</b></p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Broker Name : ${agentname}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Broker Email : ${agentemail}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Broker Id : ${agentid}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Broker Phone Number : ${agentphone}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">User Email : ${email}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">User Phone Number : ${phone}</p>
                                        
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
   to: agentemail,
   //to: "harshgupta.calinfo@gmail.com",
   subject: `Someone Showed Interest in your Profile`, // Subject line
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
                                   <p style="margin-bottom: 10px; font-size: 16px;">${name}, ${email} has shown interest in your Profile. You can Contact him/her on <a href="https://wa.me/91${phone}">+91-${phone}</a>.  </b></p>
                                   <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
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
    return res.status(200).json("Sent");
  });
});
};

export const interestShowed = (req, res) => {
  const { pro_user_id } = req.body;
  const q = "SELECT * from login_module where login_id = ?";
  db.query(q, [pro_user_id], (err, data) => {
    let info = {
      from: '"Propertyease " <noreply@propertyease.in>', // sender address
      to: data[0].login_email,
      //to: "harshgupta.calinfo@gmail.com",
      subject: `Someone Showed Interest in your Property`, // Subject line
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
                                      <p style="margin-bottom: 10px; font-size: 16px;">Someone showed interest in your property. Our team is going through it and get back to you.  </b></p>
                                      <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
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
      return res.status(200).json("Sent");
    });
  });
};

export const interestShowedInAgent = (req, res) => {
  const { pro_user_id } = req.body;
  const q = "SELECT * from login_module where login_id = ?";
  db.query(q, [pro_user_id], (err, data) => {
    let info = {
      from: '"Propertyease " <noreply@propertyease.in>', // sender address
      //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
      //to: data[0].login_email,
      to: "harshgupta.calinfo@gmail.com",
      subject: `Someone Showed Interest in your Property`, // Subject line
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
                                       <p style="margin-bottom: 10px; font-size: 16px;">Someone showed interest in your property. Our team is going through it and get back to you.  </b></p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
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
      return res.status(200).json("Sent");
    });
  });
};

export const contactUsData = (req, res) => {
  const q =
    "INSERT INTO contact_module (con_name, con_email, con_phone , con_msg) Values (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.message,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
   
    //return res.status(200).json(insertId);
    let info = {
      from: '"Propertyease " <noreply@propertyease.in>', // sender address
      to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
      //   to: "akshit.calinfo07@gmail.com",
       //to: "harshgupta.calinfo@gmail.com",
      subject: `New message from ${req.body.name} `, // Subject line
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
                                         req.body.name
                                       } is contacting us.</b></p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">Email : ${
                                         req.body.email
                                       }</p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">Phone Number : ${
                                         req.body.phone
                                       }</p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">User Message : ${
                                         req.body.message
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
    let userinfo = {
      from: '"Propertyease " <noreply@propertyease.in>', // sender address
      //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
      to: req.body.email,
      //to: "harshgupta.calinfo@gmail.com",
      subject: `Thank you for contacting us`, // Subject line
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
                                       <p style="margin-bottom: 10px; font-size: 16px;">Thank you for contacting with us. We will be in touch with you soon. </b></p>
                                       <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
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
      transporter.sendMail(userinfo, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Mail Sent");
      });
      //return res.status(200).json("Mail Sent");
    });
  });
};

//  export const askquestion = (req, res) => {
//    const { userId, phone, propertySlug, proId, user_id, pro_user_id } = req.body;
//    const q =
//      "INSERT INTO property_interest (interest_property_id,interest_person_id) VALUES(?)";
//    const values = [proId, user_id];
//    db.query(q, [values], (err, data) => {
//      if (err) return res.status(500).json(err);
//      const q = "SELECT * from login_module where login_id = ?";
//      db.query(q, [pro_user_id], (err, data) => {
//        let info = {
//          from: '"Propertyease " <noreply@propertyease.in>', // sender address
//          to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
//          //   to: "akshit.calinfo07@gmail.com",
//          // to: "harshgupta.calinfo@gmail.com",
//          subject: `${userId} Showed Interest in a Property`, // Subject line
//          html: `<div style="margin:0px;padding:0px;">
//         <div style="margin:0px;padding:0px;  margin: 30px auto; width: 700px; padding: 10px 10px;  background-color: #f6f8fc; box-shadow:rgba(13, 109, 253, 0.25) 0px 25px 50px -10px !important; ">
//            <table cellpadding="0" style="width:700px;margin:auto;display:block;font-family:\'trebuchet ms\',geneva,sans-serif;">
//               <tbody>
//                  <tr>
//                     <td style="width:700px;display:block;clear:both">
//                        <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style=" margin-top:30px;background-clip:padding-box;border-collapse:collapse;border-radius:5px;">

//                           <tr style="height:80px; text-align:center;">
//                              <td style="padding-left:22px; padding-bottom: 10px"><img src="https://property-five.vercel.app/images/logo.png">
//                              </td>
//                           </tr>
//                     </td>
//                  </tr>
//                  <tr>
//                     <td>
//                        <table style="width:500px;clear:both" border="0" align="center" cellpadding="0" cellspacing="0">

//                           <tr>
//                              <td>
//                                 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 0px 0px 0px;">

//                                    <tr>
//                                       <td height="10px" style="font-size: 16px;line-height: 24px;letter-spacing:.3px;">
//                                          <p style="color:#404040; margin-bottom: 10px;"> Dear Admin,</b>
//                                          <p style="margin-bottom: 10px; font-size: 16px;">${userId} has shown interest in the following Property</b></p>
//                                          <a href='https://www.propertyease.in/${propertySlug}' style="margin-bottom: 10px; font-size: 16px;">${propertySlug}</a>
//                                          <p style="margin-bottom: 10px; font-size: 16px;">You can Contact him/her on ${phone}</p>
//                                          <p style="margin-bottom: 10px; font-size: 16px;">${
//                                            data[0].login_email
//                                          } posted this property. You can contact him/her on ${
//            data[0].login_number
//          }.</p>
//                                       </td>
//                                    </tr>
//                                    <tr>
//                                       <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
//                                          <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
//                                             </b></p>
//                                          <p style="margin-bottom:0px; font-size: 15px;">Admin Team</p>
//                                          <p style="margin-bottom: 10px; font-size: 15px;">Propertyease.in</p>

//                                       </td>
//                                    </tr>
//                                 </table>
//                              </td>
//                           </tr>

//                        </table>
//                     </td>
//                  </tr>
//                  <tr>
//                     <td style="font-size: 14px;text-align: center;line-height: 21px;letter-spacing: .3px; color: #155298; height: 68px;">

//                        <p style="line-height:22px;margin-bottom:0px;padding: 10px;  color:#000;font-size: 12px;">
//                           &copy; Copyright ${new Date().getFullYear()} All Rights Reserved.</p>
//                     </td>
//                  </tr>

//               </tbody>
//            </table>
//         </div>
//      </div>`,
//        };
//        transporter.sendMail(info, (err, data) => {
//          if (err) return res.status(500).json(err);
//          return res.status(200).json("Mail Sent");
//        });
//      });
//    });
//  };
