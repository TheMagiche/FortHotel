const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
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
mongoose
  .connect("mongodb://localhost:27017/fortHotel", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(
    () => {
      console.log("Database connection is successful");
    },
    err => {
      console.log("Error when connecting to the database" + err);
    }
  );
// ROutes

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
