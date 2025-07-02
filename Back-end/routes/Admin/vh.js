const router = require("express").Router();

const vhController = require("../../controllers/Admin/vh");

//   "customer_id": 1,
//         "vehicle_year": "2022",
//         "vehicle_make": "Tesla",
//         "vehicle_model": "Model S",
//         "vehicle_type": "Sedan",
//         "vehicle_mileage": "10000",
//         "vehicle_tag": "9890Ab2",
//         "vehicle_serial": "458008887783543435553434",
//         "vehicle_color": "Silver"
//       }

router.post("/vehicle/:id", vhController.postVehicle);
