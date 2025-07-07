const express = require("express");
const bodyParser = require("body-parser");

const customerRoutes = require("./routes/Admin/customer");
const employeeRoutes = require("./routes/Admin/employee");
const serviceRoutes = require("./routes/Admin/services");
const vehicleRoutes = require("./routes/Admin/vh");
const orderRoutes = require("./routes/Admin/order");
const authRoutes = require("./routes/Auth/login");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Stop here for preflight
  }

  next();
});

app.use(customerRoutes);
app.use(serviceRoutes);
app.use(employeeRoutes);
app.use(vehicleRoutes);
app.use(orderRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: "An error occurred" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
