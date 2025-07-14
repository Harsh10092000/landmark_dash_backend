import { transporter } from "../nodemailer.js";
import { db } from "../connect.js";


export const verifyServer = (req, res) => {
  transporter.verify((error, success) => {
    if (error) {
      return res.status(500).json('Server not reachable');
    } else {
      return res.status(200).json('Server is reachable');
    }
  });
};


export const adminInvite =  (req, res) => {
  const emailsResult = sendMultipleEmails(
    req.body.email_reciever_id,
    req.body.email_sub,
    req.body.email_cont
  );
  //console.log("emailsResult : " , emailsResult);
 
  const q = "insert into mail_content (mail_content, mail_subject) Values (?,?)";
  db.query(q, [req.body.email_cont, req.body.email_sub], (err, data) => {
    //console.log(req.body.email_cont);
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    const values2 = Object.values(emailsResult).map(({ to, success }) => [
      insertId,
      to,
      success,
    ]);
    const q = "insert into mail_sent_data (content_id, email_id, status) Values ?";
  db.query(q, [values2], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(emailsResult);
  });
  });
  //return res.status(200).json(emailsResult);
};

const sendMultipleEmails =  (emailsList, sub, content) => {
  const emailsRes = {};
  for (let i = 0, len = emailsList.length; i < len; i++) {
    const res =  sendNewMail({
      from: '"Propertyease " <noreply@propertyease.in>',
      to: emailsList[i],
      subject: sub,
      body: content,
    });
    emailsRes[emailsList[i]] = res;
  }
  return emailsRes;
};




 const sendNewMail =  (data) => {
  const { from, to, subject, body } = data;
  try {
     transporter.sendMail({
      from,
      to,
      subject: subject || "no subject",
      html: body,
    }
  );
    console.log("mail sent : ", to);
    return { success: true, message: "Email sent successfully!", to: to };
  } catch (error) {
    console.error(error);
    console.log("failed : ", to);
    return { success: false, message: "Email not sent !", to: to };
  }
};

// const sendNewMail = (data) => {
//   const { from, to, subject, body } = data;

//   try {
//     transporter.sendMail({
//       from,
//       to,
//       subject: subject || "no subject",
//       html: body,
//     }, (err, info) => {
//       if (err) {
//         console.log("Error sending mail:", err);
//         return { success: false, message: "Email not sent!", to: to };
//       }
//       console.log("Mail sent to:", to);
//       return { success: true, message: "Email sent successfully!", to: to };
//     });
//   } catch (error) {
//     console.error("Caught error:", error);
//     console.log("Failed to send mail to:", to);
//     return { success: false, message: "Email not sent!", to: to };
//   }
// };



// export const adminInvite = async (req, res) => {
//   try {
//     const emailsResult = await sendMultipleEmails(
//       req.body.email_reciever_id,
//       req.body.email_sub,
//       req.body.email_cont
//     );

//     console.log("emailsResult : ", emailsResult);

//     const q = "INSERT INTO mail_content (mail_content) VALUES (?)";
//     const [contentResult] = await db.query(q, [req.body.email_cont]);
//     const insertId = contentResult.insertId;

//     const values2 = Object.values(emailsResult).map(({ to, success }) => [
//       insertId,
//       to,
//       success,
//     ]);

//     const q2 = "INSERT INTO mail_sent_data (content_id, email_id, status) VALUES ?";
//     await db.query(q2, [values2]);

//     return res.status(200).json(emailsResult);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json(err);
//   }
// };




// const sendMultipleEmails = async (emailsList, sub, content) => {
//   const emailPromises = emailsList.map(email => 
//     sendNewMail({
//       from: '"Propertyease " <noreply@propertyease.in>',
//       to: email,
//       subject: sub,
//       body: content,
//     })
//   );

//   return Promise.all(emailPromises);
// };

// const sendNewMail = async (data) => {
//   const { from, to, subject, body } = data;
//   try {
//     await transporter.sendMail({
//       from,
//       to,
//       subject: subject || "no subject",
//       html: body,
//     });
//     console.log("mail sent : ", to);
//     return { success: true, message: "Email sent successfully!", to };
//   } catch (error) {
//     console.error(error);
//     console.log("failed : ", to);
//     return { success: false, message: "Email not sent!", to };
//   }
// };


export const getMailContactList = (req, res) => {
  const q = `
   SELECT login_module.login_id AS email_id, 
       login_module.login_email AS email, 
       1 AS already_user
FROM login_module
UNION
SELECT email_contacts.email_id AS email_id, 
       email_contacts.email AS email, 
       0 AS already_user
FROM email_contacts
LEFT JOIN login_module
ON email_contacts.email = login_module.login_email
WHERE login_module.login_email IS NULL;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// export const addSingleMail = (req, res) => {
//   const { email } = req.body;
//   console.log(email);
//   const q = "insert into email_contacts (email) Values (?)";
//   db.query(q, [email], (err, data) => {
//     console.log(email);
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("Updated Successfully");
//   });
// };


export const addSingleMail = (req, res) => {
  //const { email } = req.body;
  console.log(" req.body : " ,  req.body)
  const values2 = req.body.map((item) => [
    item,
  ]);
  console.log(values2);
  const q = "insert into email_contacts (email) Values ?";
  db.query(q, [values2], (err, data) => {
    //console.log(email);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
};

export const deleteMailContact = (req, res) => {
  console.log("req.params.mailId : ", req.params.mailId);
  const q = "DELETE email_contacts from email_contacts WHERE email_id = ?";
  db.query(q, [req.params.mailId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};




export const userInvite = (req, res) => {
  
  const res1 = sendMultipleEmailToUser(
    req.body.email_reciever_id,
    req.body.email_sender_name
  );
  return res.status(200).json("done");
};


const sendMultipleEmailToUser = (emailsList, name) => {
  const emailsRes = {};

  for (let i = 0, len = emailsList.length; i < len; i++) {
    const res = sendNewMail({
      from: '"Propertyease " <noreply@propertyease.in>',
      to: emailsList[i],
      subject: `Unlock Exclusive Real Estate Opportunities!`,
              body: `
      <div style="margin:0px;padding:0px;">
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
                                                   <p style="color:#404040; margin-bottom: 10px;"> Hi there,</b>

                                                   <p style="margin-bottom: 10px; font-size: 16px;">${name} invited you to join our exclusive real estate community! By signing up, you’ll gain access to:</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>List Properties for Free: </b>Easily list your properties for sale or rent at no cost.</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>Contact Agents and Buyers: </b>Connect directly with agents and potential buyers.</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>Email Alerts: </b>Get notified about new listings and market updates.</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>Shortlist Properties: </b>Save your favorite properties and access them anytime.</p>

                                                   <p style="margin-bottom: 10px; font-size: 16px;"><a href="https://propertyease.in/" style="display: block; width: 200px; margin: 20px auto; padding: 10px 0; text-align: center; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;" >Sign Up Now</a></p>

                                                   <p style="margin-bottom: 10px; font-size: 16px;">Don’t miss out on these amazing opportunities. Click the button above to join us today!</p>

                                                   <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support at <a href="https://wa.me/918950040151">+91-89500-40151</a> anytime for any information related to this enquiry.</p>

                                                   </td>
                                             </tr>
                                             <tr>
                                                <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
                                                   <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
                                                      </b></p>
                                                   <p style="margin-bottom:0px; font-size: 15px;"><b>Propertyease Team</b></p>
                                                   <p style="margin-bottom: 10px; font-size: 15px;"><b>Propertyease.in</b></p>

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
               </div>
          `,
    });
    emailsRes[emailsList[i]] = res;
  }
  return emailsRes;
};


export const getMailContent = (req, res) => {
  const q = `
   SELECT * FROM mail_content;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const getMailData = (req, res) => {
  const q = `
   SELECT * FROM mail_sent_data  order by id desc;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};