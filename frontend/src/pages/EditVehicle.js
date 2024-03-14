import React, { useState, useContext, useEffect } from "react";
import Input from "../components/Input";
import Context from "../context/createContext";
import { useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";

function EditVehicle() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!(JSON.parse(localStorage.getItem("authToken")))){
      navigate("/signin")
    }
    else{
      document.title = "Vehicle App | Edit Vehicle";
    }
  },[])
  
  const { id } = useParams();

  // Get Selected Data And updateDatas Function From Context API
  const { updateDatas, mode } = useContext(Context);

  // Get Selected Data Using Params ID And Store In selectIdData State
  const [selectIdData, setSelectIdData] = useState(null);

  // This Is Toggle For Remove Previous Image When Update New One
  const [toggle, setToggle] = useState(true);

  // This Is All The State Of From Field And All The Keys Are Same As Input Name Attribute
  const [editInputes, setEditInputes] = useState({
    _id: "",
    modelYear: "",
    vehicleNumber: "",
    ownerName: "",
    ownerContact: "",
    ownerLicense: "",
    vehicleType: "",
    bufferImgs: "",
  });

  // This Is Valid Method For Show Error
  // We Needs Make Each And All Perticuler State For The Error State For Each Input Fields On Our Form
  const [editModelYearError, setEditModelYearError] = useState("Please Enter Year Between 1900 To 2100")
  const [editVehicleNumberError, setEditVehicleNumberError] = useState("Please Enter Valid Vehicle Number")
  const [editOwnerNameError, setEditOwnerNameError] = useState("Please Enter Name At Least 5 Character")
  const [editOwnerContactError, setEditOwnerContactError] = useState("Please Enter Valid Contact Number")
  const [editOwnerLicenseError, setEditOwnerLicenseError] = useState("Please Enter Valid License Number")
  const [editVehicleTypeError, setEditVehicleTypeError] = useState("Please Select Vehicle type")
  const [editBufferImgsError, setEditBufferImgsError] = useState("Please Enter Your Vehicle Image")

  // This Is State Give A Boolean Values For Validation And This Is Also Use For handleSubmit OnClick Event
  const [editValidation, setEditValidation] = useState(false);

  // This Is Use For Show Error Message
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  // This Function Is Used For Get All The Data From React Params
  function getParamsData() {
    const allDatas = JSON.parse(localStorage.getItem("datas"));
    let dataObject;
    if (allDatas) {
      let selectObg = allDatas.find((eachData) => {
        return eachData._id === id;
      });
      dataObject = selectObg;
    } else {
      dataObject = null;
    }
    setSelectIdData(dataObject);
  }

  // This Effect Is Runs When Our Params Id Change And Call This Function getParamsData() Which Is Use For Getting Data
  useEffect(() => {
    if (id) {
      getParamsData();
    }
  }, [id]);

  // This Is Most Most Require Effect For Get The Data And Set The All Input Fields Value Which Is Previous Entered Value By User
  // Without This Effect Our Field Is Empty String Or Undefiend
  useEffect(() => {
    if (selectIdData && selectIdData._id.length > 0) {
      setEditInputes({
        _id: selectIdData?._id,
        modelYear: selectIdData?.modelYear,
        vehicleNumber: selectIdData?.vehicleNumber,
        ownerName: selectIdData?.ownerName,
        ownerContact: selectIdData?.ownerContact,
        ownerLicense: selectIdData?.ownerLicense,
        vehicleType: selectIdData?.vehicleType,
        bufferImgs: selectIdData?.bufferImgs,
      });
    }
  }, [selectIdData]);

  // This Function Is Call When User onChange The Input Fields
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
    setEditInputes({ ...editInputes, [event.target.name]: event.target.value });
  };

  // This Is Custom Validation
  const editValidationFunction = () => {
    let regEx = /^([A-Z]\w+[0-9]\d+)([A-Z]\w[0-9]\d)([0-9]\d+)$/g;
    let validateVehicleNumber = regEx.test(editInputes.vehicleNumber);
    // For Valid Case
    if (
      editInputes.modelYear.length === 4 &&
      editInputes.modelYear > 1900 &&
      editInputes.modelYear < 2100
    ) {
      setEditModelYearError("")
    }
    if (editInputes.vehicleNumber.length === 10 && validateVehicleNumber) {
      setEditVehicleNumberError("")
    }
    if (editInputes.ownerName.length >= 5) {
      setEditOwnerNameError("")
    }
    if (editInputes.ownerContact.length === 10) {
      setEditOwnerContactError("")
    }
    if (editInputes.ownerLicense.length === 16) {
      setEditOwnerLicenseError("")
    }
    if (editInputes.vehicleType.length >= 5) {
      setEditVehicleTypeError("")
    }
    if (editInputes.bufferImgs.length > 0) {
      setEditBufferImgsError("")
    }

    // For Invalid Case
    if (
      editInputes.modelYear.length !== 4 ||
      !(editInputes.modelYear > 1900 && editInputes.modelYear < 2100)
    ) {
      setEditModelYearError("Please Enter Year Between 1900 To 2100");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.vehicleNumber.length !== 10 || !validateVehicleNumber) {
      setEditVehicleNumberError("Please Enter Valid Vehicle Number");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.ownerName.length < 5) {
      setEditOwnerNameError("Please Enter Name At Least 5 Character");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.ownerContact.length !== 10) {
      setEditOwnerContactError("Please Enter Valid Contact Number");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.ownerLicense.length !== 16) {
      setEditOwnerLicenseError("Please Enter Valid License Number")
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.vehicleType.length < 5) {
      setEditVehicleTypeError("Please Select Vehicle type");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.bufferImgs.length <= 0) {
      setEditBufferImgsError("Please Enter Your Vehicle Image");
      setIsErrorMsg(true);
      setEditValidation(false);
    }

    // Check All The Correct Inputs
    if (
      editInputes.modelYear.length === 4 &&
      editInputes.modelYear > 1900 &&
      editInputes.modelYear < 2100 &&
      editInputes.vehicleNumber.length === 10 &&
      validateVehicleNumber &&
      editInputes.ownerName.length >= 5 &&
      editInputes.ownerContact.length === 10 &&
      editInputes.ownerLicense.length === 16 &&
      editInputes.vehicleType.length >= 5 &&
      editInputes.bufferImgs.length > 0
    ) {
      setEditValidation(true);
      setIsErrorMsg(false);
      setEditModelYearError("")
      setEditVehicleNumberError("")
      setEditOwnerNameError("")
      setEditOwnerContactError("")
      setEditOwnerLicenseError("") 
      setEditVehicleTypeError("")
      setEditBufferImgsError("")
    } 
    else {
      setIsErrorMsg(true);
      setEditValidation(false);
    }

  };

  useEffect(()=>{
    let regEx = /^([A-Z]\w+[0-9]\d+)([A-Z]\w[0-9]\d)([0-9]\d+)$/g;
    let validateVehicleNumber = regEx.test(editInputes.vehicleNumber);
    if (
      editInputes.modelYear.length === 4 &&
      editInputes.modelYear > 1900 &&
      editInputes.modelYear < 2100 &&
      editInputes.vehicleNumber.length === 10 &&
      validateVehicleNumber &&
      editInputes.ownerName.length >= 5 &&
      editInputes.ownerContact.length === 10 &&
      editInputes.ownerLicense.length === 16 &&
      editInputes.vehicleType.length >= 5 &&
      editInputes.bufferImgs.length > 0
    ) {
      setEditValidation(true);
      setIsErrorMsg(false);
      setEditModelYearError("")
      setEditVehicleNumberError("")
      setEditOwnerNameError("")
      setEditOwnerContactError("")
      setEditOwnerLicenseError("") 
      setEditVehicleTypeError("")
      setEditBufferImgsError("")
    } 
  },[editInputes])

  // This Function Is Call When User Submit Thier Updates Data
  const handleSubmit = (event) => {
    event.preventDefault();
    editValidationFunction()
    if (editValidation) {
      updateDatas(editInputes, id);
      setEditInputes({
        _id: "",
        modelYear: "",
        vehicleNumber: "",
        ownerName: "",
        ownerContact: "",
        ownerLicense: "",
        vehicleType: "",
        bufferImgs: "",
      })
      navigate("/");
    } else {
      setTimeout(() => {
        setEditValidation(false)
        setIsErrorMsg(false);
      }, 1200);
    }
  };

  // This Function Is Call When User Change The Image
  function handleChangeFile(event) {
    event.preventDefault();
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        let bufferEditImg = new Buffer(reader.result);
        let bufferEditString = bufferEditImg.toString("base64");
        setEditInputes({ ...editInputes, bufferImgs: bufferEditString });
      };
    } else {
      setEditInputes({ ...editInputes, bufferImgs: "" });
    }
  }

  // This Function Is Call When User Click On Remove Previous Image Button
  function handleToggle(event) {
    event.preventDefault();
    setEditInputes({ ...editInputes, bufferImgs: "" });
    setToggle(false);
  }

  return (
    <>
      {selectIdData && (
        <div
          className="container my-8 mx-auto "
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
                placeholder={"Enter Your Model Year"}
                name={"modelYear"}
                value={editInputes.modelYear}
                isRadio={false}
                fieldErrorMsg={editModelYearError}
                isErrorMsg={isErrorMsg}
                isNumber={true}
                min={1900}
                max={2100}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"text"}
                lableText={"Vehicle Number"}
                placeholder={"Enter Your Vehicle Number"}
                name={"vehicleNumber"}
                value={editInputes.vehicleNumber}
                isRadio={false}
                fieldErrorMsg={editVehicleNumberError}
                isErrorMsg={isErrorMsg}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"text"}
                lableText={"Owners Name"}
                placeholder={"Enter Your Owners Name"}
                name={"ownerName"}
                value={editInputes.ownerName}
                isRadio={false}
                fieldErrorMsg={editOwnerNameError}
                isErrorMsg={isErrorMsg}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"tel"}
                lableText={"Owners Contact Number"}
                placeholder={"Enter Your Owners Contact Number"}
                name={"ownerContact"}
                value={editInputes.ownerContact}
                fieldErrorMsg={editOwnerContactError}
                isErrorMsg={isErrorMsg}
                isRadio={false}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"text"}
                lableText={"Owners License Number"}
                placeholder={"Enter Your Owners license Number"}
                name={"ownerLicense"}
                value={editInputes.ownerLicense}
                fieldErrorMsg={editOwnerLicenseError}
                isErrorMsg={isErrorMsg}
                isRadio={false}
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
                    check={editInputes.vehicleType}
                    editCheck={true}
                    lableText={"Two Wheelers"}
                    name={"vehicleType"}
                    value={"TwoWheeler"}
                    isRadio={true}
                    handleInputesChange={handleInputesChange}
                  />
                  <Input
                    type={"radio"}
                    check={editInputes.vehicleType}
                    editCheck={true}
                    lableText={"Three Wheelers"}
                    name={"vehicleType"}
                    value={"ThreeWheeler"}
                    isRadio={true}
                    handleInputesChange={handleInputesChange}
                  />
                  <Input
                    type={"radio"}
                    check={editInputes.vehicleType}
                    editCheck={true}
                    lableText={"Four Wheelers"}
                    name={"vehicleType"}
                    value={"FourWheeler"}
                    isRadio={true}
                    handleInputesChange={handleInputesChange}
                  />
                  {isErrorMsg && editInputes.vehicleType.length <=0 && editVehicleTypeError.length > 0 ? <p>{editVehicleTypeError}</p> : null}
                </div>
              </div>
              {toggle ? (
                <div className="flex flex-row p-2 gap-2">
                  <img
                    className="h-[16vh]"
                    src={`data:image/jpeg;base64,${editInputes.bufferImgs}`}
                    alt="PreviousImage"
                  />
                  <button
                    className={`h-[26px] px-2 font-semibold ${
                      mode
                        ? "bg-gray-800 text-white border-black"
                        : "text-gray-800 bg-white border-white"
                    } text-md rounded-sm`}
                    onClick={handleToggle}
                  >
                    x
                  </button>
                </div>
              ) : (
                <div className="">
                  {" "}
                  <input type="file" id="fileUpload" onChange={handleChangeFile} />
                  {isErrorMsg && editInputes.bufferImgs.length <=0 && editBufferImgsError.length > 0 ? <p className="text-red-600 font-semibold">{editBufferImgsError}</p> : null}
                </div>
              )}
              <div className="btn my-2 flex justify-start items-center">
                <button
                  className={`subBtn w-full p-2 ${
                    mode ? "text-white bg-gray-800" : "text-gray-800 bg-white"
                  } rounded-md inline-block text-lg font-semibold`}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit Data
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditVehicle;
