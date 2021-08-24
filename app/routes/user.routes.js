const express = require("express");

const { authJwt } = require("../middlewares");

const controller = require("../controllers/user.controllers.js");

const app = express();
const router = express.Router();

router.get("/", [authJwt.verifyToken], controller.getUser);
router.post("/sendmail", [authJwt.verifyToken], controller.sendMail);

module.exports = router;
