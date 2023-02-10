const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
// const router = require('./app/router.js');
const session = require("express-session");

app.locals.siteName = "Feedeleetee";

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static(__dirname + "/public"));

// app.use(router);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/home`);
});
