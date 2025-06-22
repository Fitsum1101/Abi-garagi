const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");

const customerRoutes = require("./routes/Admin/customer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", customerRoutes);

app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: "An error occurred" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
