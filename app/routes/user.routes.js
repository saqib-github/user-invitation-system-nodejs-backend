const express = require("express");



const controller = require("../controllers/user.controllers.js");
// const passport = require('passport-http-bearer');
// passport.use(new BearerStrategy( {},
//     function(token, done) {
//       User.findOne({ token: token }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         return done(null, user, { scope: 'all' });
//       });
//     }
//   ));

const app = express();
const router = express.Router();

router.get('/', controller.getUser);

module.exports = router;
