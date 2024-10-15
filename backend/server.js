const express = require("express");
const dotenv = require("dotenv");
const notRoute = require("./routes/notlar.js");
const db = require("./config/db.js");

const app = express();
dotenv.config();

// MW
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

app.use("/api/notlar", notRoute);

db();

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}. port dinleniyor`);
});
