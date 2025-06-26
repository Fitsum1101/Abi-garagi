const express = require("express");
const bodyParser = require("body-parser");

const customerRoutes = require("./routes/Admin/customer");
const employeeRoutes = require("./routes/Admin/employee");
const serviceRoutes = require("./routes/Admin/services");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "post,get,put,delete");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(customerRoutes);
app.use(serviceRoutes);
app.use(employeeRoutes);

app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: "An error occurred" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
