const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const nodeMailer = require("nodemailer");
// const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

/* Global Config */
app.disable("etag").disable("x-powered-by");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());

// DATABASE
// mongoose
//   .connect("mongodb://localhost:27017/fortHotel", {
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
//   .then(
//     () => {
//       console.log("Database connection is successful");
//     },
//     err => {
//       console.log("Error when connecting to the database" + err);
//     }
//   );

// Routes
app.post("/send-email", function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: "krammax@gmail.com",
      pass: 235209006
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: "lullabyltd@hotmail.com",
    subject: "Contact Form from:  " + req.body.subject,
    body: "Message:  " + req.body.message,
    html: `<h3> ${req.body.message} </h3>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.writeHead(301, {
    Location: "public/index.html"
  });
  res.end();
});

app.post("/form", function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: "krammax@gmail.com",
      pass: 235209006
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    to: "lullabyltd@hotmail.com",
    subject: "Contact Form from:  " + req.body.subject,
    body: "Message:  " + req.body.message,
    html: `<h3> ${req.body.message} </h3>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.writeHead(301, {
    Location: "public/index.html"
  });
  res.end();
});

//Handle production
if (process.env.NODE_ENV === "production") {
  // Statiic folder
  app.use(express.static(__dirname + "/public/")); // Set up public folder
  // Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
  });
}

// Check on dev mode don't uncomment
// app.use(express.static(__dirname + '/public/')); // Set up public folder
// // Handle SPA
// app.get(/.*/, (req, res) => {
//     res.sendFile(__dirname + "/public/index.html");
// });

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
