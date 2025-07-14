import { db } from "../connect.js";
import { transporter } from "../nodemailer.js";

export const addSubscriberData = (req, res) => {
  const q =
    "INSERT INTO mail_subscriber ( sub_name, sub_email , sub_phone) Values (?)";
  const values = [req.body.name, req.body.email, req.body.phone];
  let info = {
    from: '"Propertyease " <noreply@propertyease.in>', // sender address
    to: req.body.email,
    //to: "harshgupta.calinfo@gmail.com",
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
                                    <p style="color:#404040; margin-bottom: 10px;"> Dear ${
                                      req.body.name
                                    },</b>
                                    <p style="margin-bottom: 10px; font-size: 16px;">We are thrilled to welcome you to the Propertyease family!</b></p>
                                    <p style="margin-bottom: 10px; font-size: 16px;">Thank you for subscribing to our email services. You will now receive the latest updates, property listings, and exclusive offers directly to your inbox. We are committed to providing you with valuable information to help you find your dream property.</b></p>
                                    <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support  <a href="https://wa.me/918950040151">+91-89500-40151</a> anytime for any information related to this enquiry.</p>
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
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    transporter.sendMail(info, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
  });
};

export const maildigest = (req, res) => {
  const q = "SELECT * from property_module order by pro_id desc limit 5";
  const subData =
    "SELECT GROUP_CONCAT( sub_email ) as emails FROM mail_subscriber";
  let emailData = "";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    db.query(subData, (err, subscriberData) => {
      if (err) return res.status(500).json(err);
      subscriberData.map((item) => {
        emailData = item.emails;
      });

      //console.log("data : " , data);
      //return res.status(200).json(data);

      let info = {
        //from: '"Propertyease " <noreply@propertyease.in>', // sender address
        // from: process.env.BROADCAST_SENDER_EMAIL,
        from: `"${process.env.BROADCAST_SENDER_EMAIL_NAME} " <${process.env.BROADCAST_SENDER_EMAIL}>`,
        //to: "sbpb136118@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
        to: emailData,
        //bcc: emailData,
        //bcc: ["harshgupta.calinfo@gmail.com,harshwork1009@gmail.com"],
        subject: process.env.BROADCAST_EMAIL_SUBJECT, // Subject line

        html: `
<div class="wrapper" style="width: 710px;margin: 40px auto;padding: 20px;border-radius: 10px;border: 1px solid #ede3e3;">
<table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
    style="border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tbody>
        <tr>
            <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body"
                    style="border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:710px"
                    cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none">
                    <tbody>
                        <tr>
                            <td align="left"
                                style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                                <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                    style="border-collapse:collapse;border-spacing:0px">
                                    <tbody>
                                        <tr>
                                            <td align="left" style="padding:0;Margin:0;width:560px">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center"
                                                                style="padding:10px;Margin:0;font-size:0px"><a
                                                                    target="_blank" href="#"
                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#69686D;font-size:14px"><img
                                                                        src="https://www.propertyease.in/images/logo.png"
                                                                        alt="Real Estate Welcome"
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        title="Real Estate Welcome" height="60"></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center"
                                                                style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                                                <h1
                                                                    style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#014751">
                                                                    New listing alert</h1>
                                                                
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="es-m-txt-l es-m-p0r es-m-p0l"
                                                                style="padding:0;Margin:0;padding-top:10px;padding-left:40px;padding-right:40px">
                                                                <p
                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;line-height:21px;color:#69686D;font-size:14px">
                                                                    Dear Valued User,</p>
                                                                <p
                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;line-height:21px;color:#69686D;font-size:14px">
                                                                    <br>
                                                                </p>
                                                                <p
                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;line-height:21px;color:#69686D;font-size:14px">
                                                                    We are excited to share with you our latest property
                                                                    listing! Please feel free to contact us at <a href="https://wa.me/918950040151">+91-89500-40151</a>. We are here to assist you and provide further information as needed.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none"
    style="border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tbody>
    ${data
      .map(
        (object) => `
        <tr style="padding-top: 15px">
            <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0"
                    role="none"
                    style="border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:710px">
                    <tbody>
                        <tr>
                            <td align="left" bgcolor="#F7F6F4"
                                style="padding:20px;Margin:0;background-color:#f7f6f4;border-radius:30px">
                                <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                                <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none"
                                    style="border-collapse:collapse;border-spacing:0px;float:left">
                                    <tbody>
                                        <tr>
                                            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;font-size:0px">
                                                                <a target="_blank" href="#"
                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#69686D;font-size:14px"><img
                                                                        class="adapt-img p_image"
                                                                        src="https://tlr.stripocdn.email/content/guids/CABINET_384ff44f253af801835a77e6187431ba3d2f26c78de5af3c8b1c48cf857e9f17/images/pexelsbinyaminmellish186077.jpg"
                                                                        alt=""
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;border-radius:20px"
                                                                        width="270"></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                                <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none"
                                    style="border-collapse:collapse;border-spacing:0px;float:right">
                                    <tbody>

                                    
                                        <tr>
                                            <td align="left" style="padding:0;Margin:0;width:365px">
                                                <table cellpadding="0" cellspacing="0" width="100%"
                                                    style="border-collapse:separate;border-spacing:0px;border-radius:30px;background-color:#f7f6f4"
                                                    bgcolor="#F7F6F4" role="presentation">
                                                    <tbody>
                                                        <tr>
                                                            <td align="left"
                                                                style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                                                <a href="https://propertyease.in/${
                                                                  object.pro_url
                                                                }" style="text-decoration: none;">
                                                                <h3 class="p_price"
                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#014751">
                                                                    <strong>

                                    ${
                                      object.pro_area_size +
                                      " " +
                                      object.pro_area_size_unit +
                                      " " +
                                      object.pro_type.split(",")[0] +
                                      " "
                                    }
                    for ${object.pro_ad_type === "Rent" ? "Rent" : "Sale"} in
                    <span className="text-capitalize">
                      ${object.pro_locality + ", "}
                    </span>
                    
                    ${
                      object.pro_sub_district
                        ? object.pro_sub_district + ", "
                        : ""
                    }
                    ${object.pro_city + ", "}
                    ${object.pro_state}</strong>
                                                                </h3>
</a>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td align="left"
                                                                style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                                                <h3 class="p_price"
                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#014751">
                                                                    <strong> ${
                                                                      object.pro_amt
                                                                        ? "₹" +
                                                                          object.pro_amt +
                                                                          " " +
                                                                          object.pro_amt_unit
                                                                        : "Ask Price"
                                                                    }</strong>
                                                                </h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding:0;Margin:0">
                                                                <table cellpadding="0" cellspacing="0" width="100%"
                                                                    class="es-menu" role="presentation"
                                                                    style="border-collapse:collapse;border-spacing:0px">
                                                                    <tbody>
                                                                        <tr class="links-images-left">
                                                                            <td align="left" valign="top" width="100%"
                                                                                class="p_description"
                                                                                style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;padding-right:15px;border:0">
                                                                                <a target="_blank" href="#"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:Montserrat, helvetica, arial, sans-serif;color:#69686D;font-size:14px"><img
                                                                                        src="https://tlr.stripocdn.email/content/guids/CABINET_d4268b164551da89e57ab4ef989bf64a3c37acea80029fd0e3ad24c59f443754/images/group.png"
                                                                                        alt="9037 Merry Drive, Egorkovskoi"
                                                                                        title="9037 Merry Drive, Egorkovskoi"
                                                                                        align="absmiddle" width="16"
                                                                                        style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-right:5px;vertical-align:middle">${
                                                                                          object.pro_locality
                                                                                        },&nbsp;
                  ${object.pro_city}</a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td align="left"
                                                                style="padding:0;Margin:0;padding-top:10px;padding-bottom:15px"><!--[if mso]><a href="https://propertyease.in/${
                                                                  object.pro_url
                                                                }" target="_blank" hidden>
   <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="#" 
               style="height:36px; v-text-anchor:middle; width:167px" arcsize="50%" strokecolor="#014751" strokeweight="1px" fillcolor="#f7f6f4">
       <w:anchorlock></w:anchorlock>
       <center style='color:#014751; font-family:Montserrat, helvetica, arial, sans-serif; font-size:12px; font-weight:400; line-height:12px;  mso-text-raise:1px'><a href="https://propertyease.in/${
         object.pro_url
       }">View Listing</a></center>
   </v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border"
                                                                    style="border-style:solid;border-color:#014751;background:#f7f6f4;border-width:1px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a
                                                                        href="https://propertyease.in/${
                                                                          object.pro_url
                                                                        }" class="es-button" target="_blank"
                                                                        style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#014751;font-size:14px;display:inline-block;background:#f7f6f4;border-radius:30px;font-family:Montserrat, helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center;padding:10px 40px 10px 40px;mso-padding-alt:0;mso-border-alt:10px solid  #f7f6f4">View
                                                                        Listing</a></span><!--<![endif]--></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table><!--[if mso]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
                            <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                                <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                    style="border-collapse:collapse;border-spacing:0px">
                                    <tbody>
                                        <tr>
                                            <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" height="25" style="padding:0;Margin:0">
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
        `
      )
      .join("")}
    </tbody>
</table>



<table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none"
    style="border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#DADFE2;background-repeat:repeat;background-position:center top">
    <tbody>
        <tr>
            <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0"
                    role="none"
                    style="border-collapse:collapse;border-spacing:0px;background-color:#DADFE2;width:710px">
                    <tbody>
                        <tr>
                            <td align="left"
                                style="padding:0;Margin:0;padding-top:20px;padding-left:20px;     padding-bottom: 18px; padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" 
                       cellspacing="0"><tr><td style="width:295px" valign="top"><![endif]-->
                                <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none"
                                    style="border-collapse:collapse;border-spacing:0px;float:left">
                                    <tbody>
                                        <tr>
                                            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:295px">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                        <tr>
                                                            <td align="left" class="es-m-txt-l"
                                                                style="padding:0;Margin:0;font-size:0px"><a
                                                                    target="_blank" href="https://propertyease.in/"
                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#69686D;font-size:12px"><img
                                                                        src="https://www.propertyease.in/images/logo.png"
                                                                        alt="Logo"
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        height="35" title="Logo"></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left"
                                                                style="padding:0;Margin:0;padding-top:15px">
                                                                <p
                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;line-height:18px;color:#69686D;font-size:12px">
                                                                    Provides clients with quality real estate services.
                                                                    We help you to find your perfect home.</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!--[if mso]></td><td style="width:20px"></td><td style="width:245px" valign="top"><![endif]-->
                                <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none"
                                    style="border-collapse:collapse;border-spacing:0px;float:right">
                                    <tbody>
                                        <tr>
                                            <td align="left" style="padding:0;Margin:0;width:245px">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                                    style="border-collapse:collapse;border-spacing:0px">
                                                    <tbody>
                                                        <tr>
                                                            <td align="right" class="es-m-txt-l"
                                                                style="padding:0;Margin:0">
                                                                <p
                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;line-height:18px;color:#69686D;font-size:12px">
                                                                    <a href="https://propertyease.in/" target="_blank"
                                                                        style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#69686D;font-size:12px">Home
                                                                        </a><br>
                                                                        <a
                                                                        href="https://propertyease.in/contactus" target="_blank"
                                                                        style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#69686D;font-size:12px">Contact
                                                                        us</a><br><a href="https://propertyease.in/allproperties" target="_blank"
                                                                        style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#69686D;font-size:12px">View Properties</a>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table><!--[if mso]></td></tr></table><![endif]-->
                            </td>
                        </tr>



                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

</div>
`,
      };
      transporter.sendMail(info, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Sent");
      });
    });
  });
};

const recipients = ["harshgupta.calinfo@gmail.com,harshwork1009@gmail.com"];
// const batchSize = 50; // Number of emails to send in each batch
// const delay = 2000; // Delay between batches in milliseconds (e.g., 2 seconds)

async function sendBatch(batch) {
  const sendPromises = batch.map((recipient) => {
    const mailOptions = {
      from: '"Propertyease " <noreply@propertyease.in>',
      bcc: recipient,
      subject: "Your Subject Here",
      text: "Hello, this is a test email sent using Nodemailer!",
    };
    return transporter
      .sendMail(mailOptions)
      .then((info) =>
        console.log(`Email sent to ${recipient}: ${info.response}`)
      )
      .catch((error) => console.log(`Error sending to ${recipient}: ${error}`));
  });

  await Promise.all(sendPromises);
}

async function sendEmailsInBatches(recipients, batchSize, delay) {
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    await sendBatch(batch);
    if (i + batchSize < recipients.length) {
      console.log(
        `Waiting for ${delay / 1000} seconds before sending the next batch...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.log("All emails sent!");
}

//sendEmailsInBatches(recipients, batchSize, delay);

//const recipients = ['recipient1@example.com', 'recipient2@example.com', 'recipient3@example.com']; // List of recipients

// recipients.forEach((recipient) => {
//     const mailOptions = {
//         from: '"Propertyease " <noreply@propertyease.in>',
//         bcc: recipient,
//         subject: 'Your Subject Here',
//         text: 'Hello, this is a test email sent using Nodemailer! 22222'
//     };

//     digesttransporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(`Error sending to ${recipient}: ${error}`);
//         }
//         console.log(`Email sent to ${recipient}: ${info.response}`);
//     });
// });


export const deleteSub = (req, res) => {
    const q =
      "DELETE mail_subscriber from mail_subscriber WHERE sub_id = ?";
    db.query(q, [req.params.subId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("DELETED");
    });
  };
  