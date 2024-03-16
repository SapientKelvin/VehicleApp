const express = require("express")
const authTokenWare = require("../middleware/user")
const { validateVehicleData, validateEditVehicleData} = require("../validation/validationController/validateVehicleData")
const { getVehicle, addVehicle, updateVehicle, deleteVehicle, singleVehicle } = require("../controller/vehicleData")
const router = express.Router()

// Route :- 1
// Method :- GET
// URL :- http://localhost:5000/api/data/getallvehicle
// Description :- This Route Is Use For Getting Vehicle Data From DataBase In VehicleData Colletion [ mongoose.model ]  
router.get("/getallvehicle", authTokenWare, getVehicle)

// Route :- 2
// Method :- POST
// URL :- http://localhost:5000/api/data/addvehicle
// Description :- This Route Is Use For Adding Vehicle Data Into DataBase In VehicleData Colletion [ mongoose.model ]  
router.post("/addvehicle", authTokenWare, validateVehicleData, addVehicle)

// Route :- 3
// Method :- PUT
// URL :- http://localhost:5000/api/data/updatevehicle/:id (params Id)
// Description :- This Route Is Use For Update Existing Vehicle Data And ReStore Into DataBase In VehicleData Colletion [ mongoose.model ]  
router.put("/updatevehicle/:id", authTokenWare, validateEditVehicleData, updateVehicle)

// Route :- 4
// Method :- DELETE
// URL :- http://localhost:5000/api/data/removevehicle/:id (params Id)
// Description :- This Route Is Use For Update Existing Vehicle Data And ReStore Into DataBase In VehicleData Colletion [ mongoose.model ]
router.delete("/removevehicle/:id", authTokenWare, deleteVehicle)

// Route :- 5
// Method :- GET
// URL :- http://localhost:5000/api/data/singlevehicle/:id
// Description :- This Route Is Use For Getting Single Data From The DataBase For Showing Single Vehicle Details
router.get("/singlevehicle/:id", authTokenWare, singleVehicle)

module.exports = router