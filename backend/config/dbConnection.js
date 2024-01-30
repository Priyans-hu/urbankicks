const mongoose = require("mongoose");
const config = require("./config.json");

mongoose
    .connect(config.dbPath)
    .then(
        (res) => {
            console.log("Connection to database was succesful");
        },
        (err) => {
            console.error("oops! failed to connect with database");
        }
    )
    .catch((err) => {
        console.error("oops! failed to connect with database");
    }
);