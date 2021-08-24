const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.getUser = (req, res) => {
  let token = req.headers["x-access-token"];
  var decoded = jwt.decode(token, { complete: true });
  console.log("decoded", decoded);
  console.log("user_id", decoded.payload.id);
  User.findById(decoded.payload.id)
    .select("-password")
    .then((user) => {
      console.log("user: " + user);
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
};

exports.sendMail = async (req, res) => {
  let invitation_email = req.body.email;
  let sender_mail;
  let sender_name;
  let token = req.headers["x-access-token"];
  // ..............
  var invitation_token = jwt.sign({ email: invitation_email }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
  console.log(invitation_token);
  let invitation_link = `http://localhost:8080/signup/${invitation_token}`;
  var decoded = jwt.decode(token, { complete: true });
  console.log("decoded", decoded);
  console.log("user_id", decoded.payload.id);
  res.send("djbcvjbv");
  User.findById(decoded.payload.id).then((user) => {
    console.log("usermail: ", user.email);
    sender_mail = user.email;
    sender_name = user.first_name;
  });
  try {
    let transporter = nodemailer.createTransport({
      host: "stmp.etheral.email",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "saqib.browser@gmail.com",
        pass: "saqib786",
      },
    });
    const mailOptions = {
      from: `${sender_mail}`,
      to: `${invitation_email}`,
      subject: `Message from ${sender_name}`,
      html: `<!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0,
         shrink-to-fit=no"" />
         <link
           rel="stylesheet"
           href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
           integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
           crossorigin="anonymous"
         />
         <script
           src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
           integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
           crossorigin="anonymous"
         ></script>
         <script
           src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
           integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
           crossorigin="anonymous"
         ></script>
         <script
           src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
           integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
           crossorigin="anonymous"
         ></script>
         <title>Email</title>
         <style>
           body {
             height: 100%;
           }
         </style>
       </head>
       <body>
         <div class=" w-50 ml-0 mr-0 mx-auto text-center">
           <h1>Welcome</h1>
           <strong>Invitation Link</strong>
           <p>please click on the link below</p>
            <a href=${invitation_link}>
           <button class="btn btn-primary " >Register</button> </a>
         </div>
       </body>
     </html>
     `,
    };

    transporter.sendMail(mailOptions, (err, message) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("email sent", message.response);
        res.json({
          message: "Email sent successfully",
        });
      }
    });
  } catch (err) {
    console.log("not sent error", err);
  }
};
