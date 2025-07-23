import express from 'express';
import cors from 'cors';
import authProperty from "./routes/property.js";
import authAccount from "./routes/account.js";
import authContact from "./routes/contact.js";
import authAdmin from "./routes/admin.js";
import authWatermark from "./routes/watermark.js"
import authWatermark2 from "./routes/watermark2.js"
import authPostRequirement from "./routes/postRequirement.js"
import authAgent from "./routes/agent.js"
import authAd from "./routes/ad.js"
import authProPlan from "./routes/proPlan.js"
import authMap from "./routes/map.js"
import authPay from "./routes/pay.js"
import authMailDigest from "./routes/maildigest.js"
// import "dotenv/config"
// import cookieParser from 'cookie-parser';
//mport path from "path";
import authSettings from "./routes/settings.js"
//import { maildigest } from "./controllers/maildigest.js";
// import authCodeGen from "./routes/codeGeneration.js";
import authInvite from "./routes/invite.js";
import authAuroRemovalProperty from "./routes/autoRemovePro.js"
import authSession from "./routes/session.js"
// import dotenv from 'dotenv';
// import helmet from 'helmet';
import { autoRemoveProperty, autoRemovePropertyReminder } from "./controllers/expiredMail.js";

const app = express();
// var corsOptions = {
//     origin: '*',  
// };
// app.use(cors(corsOptions));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4176', 'https://user.landmarkplots.com'], 
  credentials: true,
}));
app.use(express.json());
// app.use(cors({
//   origin: 'http://dashboard.example.com',
//   credentials: true,
// }));
app.use(express.static("./public"));
// app.get('/api/session', async (req, res) => {
//     try {
//       const response = await fetch('http://localhost:3000/api/auth/session', {
//         method: 'GET',
//         headers: {
//           Cookie: req.headers.cookie || '', // Forward cookies from browser
//         },
//         credentials: 'include', // Include cookies
//       });
  
//       if (!response.ok) {
//         return res.status(401).json({ error: 'Not authenticated' });
//       }
  
//       const sessionData = await response.json();
//       if (!sessionData.user) {
//         return res.status(401).json({ error: 'Not authenticated' });
//       }
  
//       console.log("sessionData : " , sessionData);
//       // Optionally fetch plain email from database or keep encrypted
//       res.json({
//         user: {
//           id: sessionData.user.id,
//           name: sessionData.user.name,
//           email: sessionData.user.email, // Still encrypted
//         },
//       });
//     } catch (error) {
//       console.error('Session fetch error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

  // app.use("/api/auth", authLogin);
  app.use("/api/act", authAccount);
  app.use("/api/pro", authProperty);
  app.use("/api/contact", authContact);
  app.use("/api/admin", authAdmin);
  app.use("/api/watermark", authWatermark);
  app.use("/api/watermark2", authWatermark2);
  app.use("/api/postRequirement", authPostRequirement);
  app.use("/api/agent", authAgent);
  app.use("/api/ad", authAd);
  app.use("/api/proPlan", authProPlan);
  app.use("/api/cityMap", authMap);
  app.use("/api/pay", authPay);
  app.use("/api/setting", authSettings);
  app.use("/api/maildigest", authMailDigest);
  // app.use("/api/gencode", authCodeGen);
  app.use("/api/invite", authInvite);
  app.use("/api/proemovalsetting", authAuroRemovalProperty);
  app.use("/api/session", authSession);

app.listen(8015, () => {
    console.log("App is running ");
  });