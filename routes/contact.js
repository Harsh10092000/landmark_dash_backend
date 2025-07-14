import express from "express";
import { askquestion, freeEnquiry, freeEnquiry2 , interestShowed,contactAgent, interestShowedInAgent,contactUsData } from "../controllers/contact.js";

const router = express.Router();

router.post("/askquestion", askquestion);
router.post("/freeEnquiry", freeEnquiry);
router.post("/freeEnquiry2", freeEnquiry2);
router.post("/interestShowed", interestShowed);
router.post("/contactAgent", contactAgent);
router.post("/interestShowedInAgent", interestShowedInAgent);
router.post("/contactUsData", contactUsData);

export default router;



// <?php
// error_reporting(0);
// ?>
// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <meta name="description" content="">
//     <meta name="author" content="">
//     <title>UIET | KURUKSHETRA Payment System</title>
//     <link href="css/bootstrap.min.css" rel="stylesheet">
//     <link href="css/theme.css" rel="stylesheet">
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//     <script src="js/bootstrap.min.js"></script>
// </head>

// <body>
//     <?php include("include/header.php"); ?>
//     <div class="container">
//         <div class="page-header">
//             <h1 class="text-center">Online Fee Payment</h1>
//             <div class="row">
//                 <div class="col-md-8 col-md-offset-2">
//                     <div class="payment_form">
//                         <form role="form" enctype="multipart/form-data" action="payfeesredirect.php" method="POST">
//                             <fieldset>
//                                 <div class="clearfix"></div>
//                                 <div class="col-md-12  form-group">
//                                     <label>Roll Number <span class="required">*</span></label>
//                                     <input type="text" class="form-control" id="roll_num" name="rollno" maxlength="100">

//                                 </div>
//                                 <div class="clearfix"></div>
//                                 <div class="col-md-12 form-group">
//                                     <label>Student Name <span class="required">*</span></label>
//                                     <input type="text" class="form-control" id="stu_name" name="studentname"
//                                         maxlength="30">
//                                 </div>
//                                 <div class="clearfix"></div>
//                                 <div class="col-md-6 form-group">
//                                     <label>Email Id <span class="required">*</span></label>
//                                     <input type="text" class="form-control" id="stu_email" name="email" maxlength="100">
//                                 </div>
//                                 <div class="col-md-6  form-group">
//                                     <label>Mobile Number <span class="required">*</span></label>
//                                     <input type="text" class="form-control" id="mobile" name="mobile" placeholder
//                                         maxlength="10">

//                                 </div>
//                                 <div class="clearfix"></div>
//                                 <div class="col-md-6  form-group">
//                                     <label>Semester <span class="required">*</span></label>
//                                     <select name="semester" id="stu_sem" class="form-control" size="1">
//                                         <option value="" selected="selected">--Select Semester--</option>
//                                         <option value="Semester - I" class="sem1">Semester - I</option>
//                                         <option value="Semester - II" class="sem1">Semester - II</option>
//                                         <option value="Semester - III" class="sem1">Semester - III</option>
//                                         <option value="Semester - IV" class="sem1">Semester - IV</option>
//                                         <option value="Semester - V" class="sem2">Semester - V</option>
//                                         <option value="Semester - VI" class="sem2">Semester - VI</option>
//                                         <option value="Semester - VII" class="sem2">Semester - VII</option>
//                                         <option value="Semester - VIII" class="sem2">Semester - VIII</option>
//                                         <option value="Ph.D. Yearly" class="sem3">Ph.D. Yearly</option>
//                                         <option value="DMC and Degree Verification" class="sem3">DMC and Degree
//                                             Verification</option>
//                                     </select>
//                                 </div>
//                                 <div class="clearfix"></div>
//                                 <div class="col-md-6 form-group">
//                                     <label> Fee Type <span class="required">*</span></label>
//                                     <select name="feetype" id="stu_fee_type" class="form-control fee_type" size="1">
//                                         <option value="">--Fee Type--</option>
//                                         <option value="Semester Fee"> Semester Fee</option>
//                                         <option value="Other Fee"> Other Fee</option>
//                                     </select>
//                                 </div>
//                                 <div class="col-md-6 form-group">
//                                     <label>Amount <span class="required">*</span></label>
//                                     <input type="text" class="form-control" id="stu_amount" name="amount"
//                                         maxlength="100">
//                                 </div>
//                                 <div class="clearfix"></div>
//                                 <div class="col-md-6 form-group">
//                                     <label class=""></label>
//                                     <input type="submit" class="btn btn btn-dark-blue" value="Make Payment"
//                                         name="submit_payment">
//                                 </div>
//                                 <div class="clearfix"></div>
//                             </fieldset>
//                         </form>
//                     </div>
//                 </div>
//                 <div class="col-md-8 col-md-offset-2">
//                     <div class="hint_block">
//                         <ul>
//                             <li>Mandatory fields are marked with an asterisk (<span class="required">*</span>)</li>
//                             <li>Ph.D. Student Enter Registration Number as a Roll Number</li>
//                             <!-- <li>Check Transaction Status <a href="check-txn-status.php">Click Here</a></strong></li> -->
//                             <li>If any query contact <strong>Office.uiet@kuk.ac.in</strong></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     <?php include("include/footer.php"); ?>
// </body>

// </html>