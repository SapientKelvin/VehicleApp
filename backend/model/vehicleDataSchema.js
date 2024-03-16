const mongoose = require("mongoose")
const {Schema} = mongoose

const vehicleDataSchema = new Schema({
    modelYear: {
        type: Number,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerContact: {
        type: Number,
        required: true
    },
    ownerLicense: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleImgs: {
        type: String,
        required: true
    }
})

const VehicleData = mongoose.model("VehicleData", vehicleDataSchema)

module.exports = VehicleData