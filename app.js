const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const mongoose = require("mongoose");

// importing routes
const authRoute = require("./app/routes/auth.routes.js");
const userRoute = require("./app/routes/user.routes.js");

const app = express();

// application midlwares
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome to our application " });
});

// importing models
const db = require("./app/models");
const Role = db.Role;

// connect to database
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully Connected to database");
    // initial();
  })
  .catch((err) => {
    console.log("Connection Error", err);
    process.exit();
  });

// set port and listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});

// routes middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// initial function callings

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
