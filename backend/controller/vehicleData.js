const createError = require("http-errors")
const VehicleData = require("../model/vehicleDataSchema")

// Route :- 1
// Method :- GET
// URL :- http://localhost:5000/api/data/getallvehicle
// Description :- This Route Is Use For Getting All Vehicle Data From DataBase In VehicleData Colletion [ mongoose.model ]
const getVehicle = async (req,res,next)=>{
    try{
        const allVehicleData = await VehicleData.find({})
        res.json({ allVehicleData: allVehicleData, status:true })
    }
    catch(err){
        next( createError.InternalServerError("Internal Server Error") )
    }
}

// Route :- 2
// Method :- POST
// URL :- http://localhost:5000/api/data/addvehicle
// Description :- This Route Is Use For Adding Vehicle Data Into DataBase In VehicleData Colletion [ mongoose.model ]
const addVehicle = async (req,res,next)=>{
    try{
        const { modelYear, vehicleNumber, ownerName, ownerContact, ownerLicense, vehicleType, vehicleImgs } = req.body

        // Checking vehicleNumber Is Already Exist Or Not ? 
        const vehicleNumberData = await VehicleData.findOne({vehicleNumber: vehicleNumber})
        // If Already Exist Then We Send Response As JSON With Message 
        if(vehicleNumberData){
            return res.json({ message:"Vehicle Number Already Exist", status: false})
        }

        // Checking ownerLicense Is Already Exist Or Not ? 
        const ownerLicenseData = await VehicleData.findOne({ownerLicense:ownerLicense})
        // If Already Exist Then We Send Response As JSON With Message
        if(ownerLicenseData){
            return res.json({ message:"Owner License Is Already Exist", status:false })
        }

        const vehicleData = await VehicleData.create({
            modelYear: modelYear,
            vehicleNumber: vehicleNumber,
            ownerName: ownerName,
            ownerContact: ownerContact,
            ownerLicense: ownerLicense,
            vehicleType: vehicleType,
            vehicleImgs: vehicleImgs
        })

        // If Created vehicleData Not Store In The DataBase Then We Send Response As JSON With Message
        if(!vehicleData){
            return res.json({message:"Something Went Wrong, Data Not Store In DataBase", status: false})
        }

        res.json({ vehicleData:vehicleData, status:true })
    }
    catch(err){
        next(createError.InternalServerError("Internal Server Error"))
    }
}

// Route :- 3
// Method :- PUT
// URL :- http://localhost:5000/api/data/updatevehicle/:id (params Id)
// Description :- This Route Is Use For Update Existing Vehicle Data And ReStore Into DataBase In VehicleData Colletion [ mongoose.model ]
const updateVehicle = async (req,res,next)=>{
    try{
        const vehicleId = req.params.id
        const { ownerNameEdit, ownerContactEdit, vehicleTypeEdit, vehicleImgsEdit } = req.body
        const vehicleIdData = await VehicleData.findById(vehicleId)

        if(vehicleId.length !== 24){
            return res.json({ message:"Invalid Id", status: false })
        }

        // If That Vehicle Data Not Exist 
        if(!vehicleIdData){
            return res.json({message:"Data Is Not Found", status:false})
        }

        const updateVehicleData = {
            modelYear: vehicleIdData.modelYear,
            vehicleNumber: vehicleIdData.vehicleNumber,
            ownerName: ownerNameEdit,
            ownerContact: ownerContactEdit,
            ownerLicense: vehicleIdData.ownerLicense,
            vehicleType: vehicleTypeEdit,
            vehicleImgs: vehicleImgsEdit
        }

        // const updateVehicleDataStore = await VehicleData.findOneAndUpdate({vehicleNumber:vehicleNumberEdit}, {$set:updateVehicleData}, {new:true})
        const updateVehicleDataStore = await VehicleData.findByIdAndUpdate(vehicleId, {$set:updateVehicleData}, {new:true})

        res.json({ vehicleUpdateData: updateVehicleDataStore, status: true })

    }
    catch(err){
        next(createError.InternalServerError("Internal Server Error"))
    }
}

// Route :- 4
// Method :- DELETE
// URL :- http://localhost:5000/api/data/removevehicle/:id (params Id)
// Description :- This Route Is Use For Update Existing Vehicle Data And ReStore Into DataBase In VehicleData Colletion [ mongoose.model ]
const deleteVehicle = async (req,res,next)=>{
    try{
        const vehicleId = req.params.id

        if(vehicleId.length !== 24){
            return res.json({ message:"Invalid Id", status: false })
        }

        const vehicleIdData = await VehicleData.findById(vehicleId)
        // If That Vehicle Data Not Exist 
        if(!vehicleIdData){
            return res.json({message:"Vehicle Data Is Not Found", status: false})
        }

        // const deletedVehicleData = await VehicleData.findOneAndDelete({uniqueFieldName: uniqueFieldNameData})
        const deletedVehicleData = await VehicleData.findByIdAndDelete(vehicleId)

        // If Data Not Delete In DataBase
        if(!deletedVehicleData){
            return res.json({message:"Vehicle Data Is Not Delete In DataBase", status:false})
        }

        res.json({ deletedVehicleData:deletedVehicleData, status:true })
    }
    catch(err){
        next(createError.InternalServerError("Internal Server Error"))
    }
}

// Route :- 5
// Method :- GET
// URL :- http://localhost:5000/api/data/singlevehicle/:id
// Description :- This Route Is Use For Getting Single Data From The DataBase For Showing Single Vehicle Details
const singleVehicle = async (req, res, next)=>{
    try{
        const id = req.params.id

        if(id.length !== 24){
            return res.json({ message:"Invalid Id", status: false })
        }

        const singleVehicleIdData = await VehicleData.findById(id)

        // If Single Vehicle Data Is Not Found In DataBase 
        if(!singleVehicleIdData){
            return res.json({ message:"Data Is Not Found", status:false })
        }

        res.json({ singleVehicleData:singleVehicleIdData, status:true })
    }
    catch(err){
        next(createError.InternalServerError("Internal Server Error"))
    }
}

module.exports = { getVehicle, addVehicle, updateVehicle, deleteVehicle, singleVehicle}