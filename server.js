const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

/* Global Config */
app.disable("etag").disable("x-powered-by");
app.use(express.static(path.join(__dirname, "public"))); // Set up public folder
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// DATABASE 
mongoose.connect("mongodb://localhost:27017/fortHotel").then(
    () => {
        console.log('Database connection is successful')
    },
    err => {
        console.log('Error when connecting to the database' + err)
    }
);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});