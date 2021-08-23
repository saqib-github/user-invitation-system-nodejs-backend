const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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

  // var signature;
  // if (jwt.verify(req.headers.authorization, config.secret)) {
  //   signature = true;
  // } else {
  //   signature = false;
  // }
  // console.log("signature 123", signature);
  // console.log("token", decoded);
  // console.log("header", decoded.header);
  // console.log("header", req.headers.authorization);
  // console.log("decodes", decoded);
  // console.log("payload", decoded.payload);
  // console.log("user_id", decoded.payload.id);
  // console.log("req", req.headers.authorization);
  // User.findById(decoded.payload.id)
  //   .then((user) => {
  //     console.log("user", user);
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //   });
};

exports.sendMail = (req, res) => {
  console.log("Sending mail api", req.email);
  res.send('sendmailapi')
};

exports.sendMail = (req, res) => {};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
