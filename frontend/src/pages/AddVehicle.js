import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Context from "../context/createContext";
import { Buffer } from "buffer";

function AddVehicle() {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!(JSON.parse(localStorage.getItem("authToken")))){
      navigate("/signin")
    }
    else{
      document.title = "Vehicle App | Form";
    }
  },[])

  // Get Context API
  const { AddAllData, mode } = useContext(Context);

  // Control Input Value Using State And All The Keys Of This State Object Is Same Of Input Name Attribute
  const [inputes, setInputes] = useState({
    _id: `${Math.floor(Math.random() * 1000)}`,
    modelYear: `${new Date().getFullYear()}`,
    vehicleNumber: "",
    ownerName: "",
    ownerContact: "",
    ownerLicense: "",
    vehicleType: "",
    bufferImgs: "",
  });

  // This Is Invalid Method For Show Error
  // const [fieldError, setFieldError] = useState({
  //   modelYearError: "Please Enter Year Between 1900 To 2100",
  //   vehicleNumberError: "Please Enter Valid Vehicle Number",
  //   ownerNameError: "Please Enter Name At Least 5 Character",
  //   ownerContactError: "Please Enter Valid Contact Number",
  //   ownerLicenseError: "Please Enter Valid License Number",
  //   vehicleTypeError: "Please Select Vehicle type",
  //   bufferImgsError: "Please Enter Your Vehicle Image",
  // });

  // This Valid Method For Show Error
  // We Needs Make Each And All Perticuler State For The Error State For Each Input Fields On Our Form
  const [modelYearError, setModelYearError] = useState(
    "Please Enter Year Between 1900 To 2100"
  );
  const [vehicleNumberError, setVehicleNumberError] = useState(
    "Please Enter Valid Vehicle Number"
  );
  const [ownerNameError, setOwnerNameError] = useState(
    "Please Enter Name At Least 5 Character"
  );
  const [ownerContactError, setOwnerContactError] = useState(
    "Please Enter Valid Contact Number"
  );
  const [ownerLicenseError, setOwnerLicenseError] = useState(
    "Please Enter Valid License Number"
  );
  const [vehicleTypeError, setVehicleTypeError] = useState(
    "Please Select Vehicle type"
  );
  const [bufferImgsError, setBufferImgsError] = useState(
    "Please Enter Your Vehicle Image"
  );

  useEffect(() => {
    console.log("modelYearError : ", modelYearError);
    console.log("vehicleNumberError : ", vehicleNumberError);
    console.log("ownerNameError : ", ownerNameError);
    console.log("ownerContactError : ", ownerContactError);
    console.log("ownerLicenseError : ", ownerLicenseError);
    console.log("vehicleTypeError : ", vehicleTypeError);
    console.log("bufferImgsError : ", bufferImgsError);
  }, [
    modelYearError,
    vehicleNumberError,
    ownerNameError,
    ownerContactError,
    ownerLicenseError,
    vehicleTypeError,
    bufferImgsError,
  ]);

  // This Is State Give A Boolean Values For Validation And This Is Also Use For handleSubmit OnClick Event
  const [validation, setValidation] = useState(false);

  // This Is Use For Show Error Message
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  // Get Input Type Files From event.target.files[0] And Convert That Files Into ArrayBuffer Using New FileReader() And Create Buffer String Using new Buffer() npm dependency
  function handleGetFile(event) {
    event.preventDefault();
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        let bufferImg = new Buffer(reader.result);
        let bufferString = bufferImg.toString("base64");
        setInputes({ ...inputes, bufferImgs: bufferString });
      };
    } else {
      setInputes({ ...inputes, bufferImgs: "" });
    }
  }

  // Change The Value Of State And This Is Helps For Change The Values In Real Time In Input Field
  const handleInputesChange = (event) => {
    if (event.target.name === "ownerName") {
      event.target.value =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1);
      event.target.value = event.target.value.replace(/\s+/g, " ");
    }
    if (event.target.name === "modelYear") {
      event.target.value = event.target.value.replace(/\s+/g, "");
    }
    if (event.target.name === "ownerContact") {
      event.target.value = event.target.value.replace(/\s+/g, "");
    }
    if (event.target.name === "vehicleNumber") {
      event.target.value = event.target.value.replace(/\s+/g, "");
      event.target.value = event.target.value.toUpperCase();
    }
    if (event.target.name === "ownerLicense") {
      event.target.value = event.target.value.replace(/\s+/g, " ");
    }
    setInputes({ ...inputes, [event.target.name]: event.target.value });
  };

  // This Is Custom Validation Function
  const validationFunction = () => {
    let regEx = /^([A-Z]\w+[0-9]\d+)([A-Z]\w[0-9]\d)([0-9]\d+)$/g;
    let validateVehicleNumber = regEx.test(inputes.vehicleNumber);

    // For Valid Case
    if (
      inputes.modelYear.length === 4 &&
      inputes.modelYear > 1900 &&
      inputes.modelYear < 2100
    ) {
      setModelYearError("");
    }
    if (inputes.vehicleNumber.length === 10 && validateVehicleNumber) {
      setVehicleNumberError("");
    }
    if (inputes.ownerName.length >= 5) {
      setOwnerNameError("");
      console.log("owner name is valid", ownerNameError);
    }
    if (inputes.ownerContact.length === 10) {
      setOwnerContactError("");
    }
    if (inputes.ownerLicense.length === 16) {
      setOwnerLicenseError("");
    }
    if (inputes.vehicleType.length >= 5) {
      setVehicleTypeError("");
    }
    if (inputes.bufferImgs.length > 0) {
      setBufferImgsError("");
    }

    // For Invalid Case
    if (
      inputes.modelYear.length !== 4 ||
      !(inputes.modelYear > 1900 && inputes.modelYear < 2100)
    ) {
      setModelYearError("Please Enter Year Between 1900 To 2100");
      setIsErrorMsg(true);
      setValidation(false);
    }
    if (inputes.vehicleNumber.length !== 10 || !validateVehicleNumber) {
      setVehicleNumberError("Please Enter Valid Vehicle Number");
      setIsErrorMsg(true);
      setValidation(false);
    }
    if (inputes.ownerName.length < 5) {
      setOwnerNameError("Please Enter Name At Least 5 Character");
      setIsErrorMsg(true);
      setValidation(false);
    }
    if (inputes.ownerContact.length !== 10) {
      setOwnerContactError("Please Enter Valid Contact Number");
      setIsErrorMsg(true);
      setValidation(false);
    }
    if (inputes.ownerLicense.length !== 16) {
      setOwnerLicenseError("Please Enter Valid License Number");
      setIsErrorMsg(true);
      setValidation(false);
    }
    if (inputes.vehicleType.length < 5) {
      setVehicleTypeError("Please Select Vehicle type");
      setIsErrorMsg(true);
      setValidation(false);
    }
    if (inputes.bufferImgs.length <= 0) {
      setBufferImgsError("Please Enter Your Vehicle Image");
      setIsErrorMsg(true);
      setValidation(false);
    }

    // Check All The Correct Inputs
    if (
      inputes.modelYear.length === 4 &&
      inputes.modelYear > 1900 &&
      inputes.modelYear < 2100 &&
      inputes.vehicleNumber.length === 10 &&
      validateVehicleNumber &&
      inputes.ownerName.length >= 5 &&
      inputes.ownerContact.length === 10 &&
      inputes.ownerLicense.length === 16 &&
      inputes.vehicleType.length >= 5 &&
      inputes.bufferImgs.length > 0
    ) {
      setValidation(true);
      setIsErrorMsg(false);
      setModelYearError("");
      setVehicleNumberError("");
      setOwnerNameError("");
      setOwnerContactError("");
      setOwnerLicenseError("");
      setVehicleTypeError("");
      setBufferImgsError("");
    } else {
      setValidation(false);
      setIsErrorMsg(true);
    }
  };

  useEffect(() => {
    let regEx = /^([A-Z]\w+[0-9]\d+)([A-Z]\w[0-9]\d)([0-9]\d+)$/g;
    let validateVehicleNumber = regEx.test(inputes.vehicleNumber);
    // Check All The Correct Inputs
    if (
      inputes.modelYear.length === 4 &&
      inputes.modelYear > 1900 &&
      inputes.modelYear < 2100 &&
      inputes.vehicleNumber.length === 10 &&
      validateVehicleNumber &&
      inputes.ownerName.length >= 5 &&
      inputes.ownerContact.length === 10 &&
      inputes.ownerLicense.length === 16 &&
      inputes.vehicleType.length >= 5 &&
      inputes.bufferImgs.length > 0
    ) {
      setValidation(true);
      setIsErrorMsg(false);
      setModelYearError("");
      setVehicleNumberError("");
      setOwnerNameError("");
      setOwnerContactError("");
      setOwnerLicenseError("");
      setVehicleTypeError("");
      setBufferImgsError("");
    }
  }, [inputes]);

  // This Is Submit Function Which Is Called When User Click On Submit Button....
  const handleSubmit = () => {
    validationFunction();
    if (validation) {
      AddAllData(inputes);
      setInputes({
        modelYear: "",
        vehicleNumber: "",
        ownerName: "",
        ownerContact: "",
        ownerLicense: "",
        vehicleType: "",
        bufferImgs: "",
      });
      navigate("/");
    } else {
      setTimeout(() => {
        setIsErrorMsg(false);
        setValidation(false);
      }, 1200);
    }
  };

  return (
    <div
      className="container my-8 mx-auto"
      style={
        mode
          ? { color: "#1F2937", background: "#E0E0E0" }
          : { color: "white", background: "rgb(16,24,40)" }
      }
    >
      <form
        className={`container mx-auto max-w-fit p-1 border-[1.5px] ${
          mode ? "border border-gray-800" : "border border-white"
        } rounded`}
      >
        <div className="inputes flex flex-col gap-4 max-w-fit p-4">
          <Input
            type={"number"}
            lableText={"Model Year"}
            placeholder={"Enter Your Car's Model Year"}
            name={"modelYear"}
            isNumber={true}
            min={1900}
            max={2100}
            value={inputes.modelYear}
            fieldErrorMsg={modelYearError}
            isRadio={false}
            isErrorMsg={isErrorMsg}
            handleInputesChange={handleInputesChange}
          />
          <Input
            type={"text"}
            lableText={"Vehicle Number"}
            placeholder={"AB84K81684"}
            name={"vehicleNumber"}
            value={inputes.vehicleNumber}
            fieldErrorMsg={vehicleNumberError}
            isRadio={false}
            isErrorMsg={isErrorMsg}
            handleInputesChange={handleInputesChange}
          />
          <Input
            type={"text"}
            lableText={"Owners Name"}
            placeholder={"Enter Owners Name"}
            name={"ownerName"}
            value={inputes.ownerName}
            fieldErrorMsg={ownerNameError}
            isRadio={false}
            isErrorMsg={isErrorMsg}
            handleInputesChange={handleInputesChange}
          />
          <Input
            type={"tel"}
            lableText={"Owners Contact Number"}
            placeholder={"Enter Car's Owners Contact Number"}
            name={"ownerContact"}
            value={inputes.ownerContact}
            fieldErrorMsg={ownerContactError}
            isRadio={false}
            isErrorMsg={isErrorMsg}
            handleInputesChange={handleInputesChange}
          />
          <Input
            type={"text"}
            lableText={"Owners License Number"}
            placeholder={"Enter Car's Owners license Number"}
            name={"ownerLicense"}
            value={inputes.ownerLicense}
            fieldErrorMsg={ownerLicenseError}
            isRadio={false}
            isErrorMsg={isErrorMsg}
            handleInputesChange={handleInputesChange}
          />
          <div className="flex flex-col gap-1">
            <p
              className={`font-semibold ${
                mode ? "text-gray-800" : "text-white"
              } text-base md:text-lg`}
            >
              Vehicle Type
            </p>
            <div className="flex flex-row gap-1 lg:gap-2">
              <Input
                type={"radio"}
                lableText={"Two Wheelers"}
                name={"vehicleType"}
                value={"TwoWheeler"}
                isRadio={true}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"radio"}
                lableText={"Three Wheelers"}
                name={"vehicleType"}
                value={"ThreeWheeler"}
                isRadio={true}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"radio"}
                lableText={"Four Wheelers"}
                name={"vehicleType"}
                value={"FourWheeler"}
                isRadio={true}
                handleInputesChange={handleInputesChange}
              />
            </div>
            {inputes.vehicleType.length <= 0 &&
            isErrorMsg &&
            vehicleTypeError.length > 0 ? (
              <p className="text-red-600 font-normal">{vehicleTypeError}</p>
            ) : null}
          </div>
          <div>
            <input
              className="bg-transparent m-1"
              type="file"
              id={`${mode ? "fileUpload" : "fileUploadDarkMode"}`}
              onChange={handleGetFile}
            />
            {inputes.vehicleType.length <= 0 &&
            isErrorMsg &&
            bufferImgsError.length > 0 ? (
              <p className="text-red-600 font-normal">{bufferImgsError}</p>
            ) : null}
          </div>
          <div className="btn my-2 flex justify-start items-center">
            <button
              className={`subBtn w-full p-2 ${
                mode ? "text-white bg-gray-800" : "text-gray-800 bg-white"
              } rounded-md inline-block text-lg font-semibold`}
              type="button"
              onClick={handleSubmit}
            >
              Submit Data
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddVehicle;
