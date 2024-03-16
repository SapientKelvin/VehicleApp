const { vehicleDataValidationSchema, vehicleEditDataValidationSchema } = require("../validationSchema")

// This Validation Is For Adding New Vehicle Data 
const validateVehicleData = async (req,res,next)=>{
    try{
        const {error, value} = await vehicleDataValidationSchema.validate(req.body)

        if(error){
            return res.json({message: error.message, status: false})
        }
        else{
            next()
        }
    }
    catch(err){
        res.status(500).json({message:"Something Went Wrong !", status:false})
    }
}

// This Validation Is For Edit Vehicle Data Fields
const validateEditVehicleData = async (req,res,next)=>{
    try{
        const {error, value} = await vehicleEditDataValidationSchema.validate(req.body)

        if(error){
            return res.json({message: error.message, status: false})
        }
        else{
            next()
        }
    }
    catch(err){
        res.status(500).json({message:"Something Went Wrong !", status:false})
    }
}

module.exports = { validateVehicleData, validateEditVehicleData}