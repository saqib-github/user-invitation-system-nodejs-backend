const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getUser = (req, res) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split("Bearer")[1];
      console.log("token: " + token);

      const verify = jwt.verify(token, config.secret);
      console.log("verify:id " + verify.id)
      User.findById(verify.id).select('-password').then((user) => {
        console.log("user: " + user)
        return res.status(200).send(user);
      })
    } catch (err) {
      console.log(err.message);
    }
  }

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
