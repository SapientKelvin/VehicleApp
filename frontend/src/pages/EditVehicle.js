import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/Input";
import Context from "../context/createContext";
import {getSingleVehicleDataURL} from "../utils/index"

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
  
  const toastOptions = {
    position:"top-center",
    autoClose:2000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  const { id } = useParams();

  // Get Selected Data And updateDatas Function From Context API
  const { updateDatas, mode } = useContext(Context);

  // Get Selected Data Using Params ID And Store In selectIdData State
  // const [selectIdData, setSelectIdData] = useState(null);

  // This Is Toggle For Remove Previous Image When Update New One
  const [toggle, setToggle] = useState(true);

  // This Is All The State Of From Field And All The Keys Are Same As Input Name Attribute
  const [editInputes, setEditInputes] = useState({
    modelYearEdit:"",
    ownerNameEdit: "",
    vehicleNumberEdit:"",
    ownerContactEdit: "",
    ownerLicenseEdit:"",
    vehicleTypeEdit: "",
    bufferImgsEdit: "",
  });

  // This Is Valid Method For Show Error
  // We Needs Make Each And All Perticuler State For The Error State For Each Input Fields On Our Form
  const [editOwnerNameError, setEditOwnerNameError] = useState("Please Enter Name At Least 5 Character")
  const [editOwnerContactError, setEditOwnerContactError] = useState("Please Enter Valid Contact Number")
  const [editVehicleTypeError, setEditVehicleTypeError] = useState("Please Select Vehicle type")
  const [editBufferImgsError, setEditBufferImgsError] = useState("Please Enter Your Vehicle Image")

  // This Is State Give A Boolean Values For Validation And This Is Also Use For handleSubmit OnClick Event
  const [editValidation, setEditValidation] = useState(false);

  // This Is Use For Show Error Message
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  // This Function Is Used For Get All The Data From React Params
  async function getParamsData() {
    const singleVehicleDataFetched = await fetch(`${getSingleVehicleDataURL}/${id}`, {
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "authToken": JSON.parse(localStorage.getItem("authToken"))
      },
    })
    const singleVehicleData = await singleVehicleDataFetched.json()
    if(singleVehicleData.status){
      // setSelectIdData(singleVehicleData.singleVehicleData)
      setEditInputes({
        modelYearEdit: singleVehicleData.singleVehicleData.modelYear,
        ownerNameEdit: singleVehicleData.singleVehicleData.ownerName,
        vehicleNumberEdit: singleVehicleData.singleVehicleData.vehicleNumber,
        ownerContactEdit: singleVehicleData.singleVehicleData.ownerContact,
        ownerLicenseEdit: singleVehicleData.singleVehicleData.ownerLicense,
        vehicleTypeEdit: singleVehicleData.singleVehicleData.vehicleType,
        bufferImgsEdit: singleVehicleData.singleVehicleData.vehicleImgs
      })
    }
    else{
      console.log("Else Side",singleVehicleData)
      // setSelectIdData(null)
      toast.error("Invalid URL", toastOptions)
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  }

  // This Effect Is Runs When Our Params Id Change And Call This Function getParamsData() Which Is Use For Getting Data
  useEffect(() => {
    if (id) {
      getParamsData();
    }
    else{
      toast.error("Invalid URL", toastOptions)
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  }, [id]);

  // This Function Is Call When User onChange The Input Fields
  const handleInputesChange = (event) => {
    if (event.target.name === "ownerNameEdit") {
      event.target.value =
        event.target.value.charAt(0).toUpperCase() +
        event.target.value.slice(1);
      event.target.value = event.target.value.replace(/\s+/g, " ");
    }
    if (event.target.name === "ownerContactEdit") {
      event.target.value = event.target.value.replace(/\s+/g, "");
    }
    setEditInputes({ ...editInputes, [event.target.name]: event.target.value });
  };

  // This Is Custom Validation
  const editValidationFunction = () => {
    if (editInputes.ownerNameEdit.length >= 5) {
      setEditOwnerNameError("")
    }
    if (editInputes.ownerContactEdit?.toString().length === 10) {
      setEditOwnerContactError("")
    }
    if (editInputes.vehicleTypeEdit.length >= 5) {
      setEditVehicleTypeError("")
    }
    if (editInputes.bufferImgsEdit.length > 0) {
      setEditBufferImgsError("")
    }

    // For Invalid Case
    if (editInputes.ownerNameEdit.length < 5) {
      setEditOwnerNameError("Please Enter Name At Least 5 Character");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.ownerContactEdit.toString().length !== 10) {
      setEditOwnerContactError("Please Enter Valid Contact Number");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.vehicleTypeEdit.length < 5) {
      setEditVehicleTypeError("Please Select Vehicle type");
      setIsErrorMsg(true);
      setEditValidation(false);
    }
    if (editInputes.bufferImgsEdit.length <= 0) {
      setEditBufferImgsError("Please Enter Your Vehicle Image");
      setIsErrorMsg(true);
      setEditValidation(false);
    }

    // Check All The Correct Inputs
    if (
      editInputes.ownerNameEdit.length >= 5 &&
      editInputes.ownerContactEdit.toString().length === 10 &&
      editInputes.vehicleTypeEdit.length >= 5 &&
      editInputes.bufferImgsEdit.length > 0
    ) {
      setEditValidation(true);
      setIsErrorMsg(false);
      setEditOwnerNameError("")
      setEditOwnerContactError("")
      setEditVehicleTypeError("")
      setEditBufferImgsError("")
    } 
    else {
      setIsErrorMsg(true);
      setEditValidation(false);
    }

  };

  useEffect(()=>{
    if (
      editInputes.ownerNameEdit.length >= 5 &&
      editInputes.ownerContactEdit.toString().length === 10 &&
      editInputes.vehicleTypeEdit.length >= 5 &&
      editInputes.bufferImgsEdit.length > 0
    ) {
      setEditValidation(true);
      setIsErrorMsg(false);
      setEditOwnerNameError("")
      setEditOwnerContactError("")
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
        setEditInputes({ ...editInputes, bufferImgsEdit: bufferEditString });
      };
    } else {
      setEditInputes({ ...editInputes, bufferImgsEdit: "" });
    }
  }

  // This Function Is Call When User Click On Remove Previous Image Button
  function handleToggle(event) {
    event.preventDefault();
    setEditInputes({ ...editInputes, bufferImgsEdit: "" });
    setToggle(false);
  }

  return (
    <>
      {editInputes && (
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
                name={"modelYearEdit"}
                value={editInputes.modelYearEdit}
                isRadio={false}
                isErrorMsg={isErrorMsg}
                isNumber={true}
                min={1900}
                max={2100}
              />
              <Input
                type={"text"}
                lableText={"Vehicle Number"}
                placeholder={"Enter Your Vehicle Number"}
                name={"vehicleNumberEdit"}
                value={editInputes.vehicleNumberEdit}
                isRadio={false}
                isErrorMsg={isErrorMsg}
              />
              <Input
                type={"text"}
                lableText={"Owners Name"}
                placeholder={"Enter Your Owners Name"}
                name={"ownerNameEdit"}
                value={editInputes.ownerNameEdit}
                isRadio={false}
                fieldErrorMsg={editOwnerNameError}
                isErrorMsg={isErrorMsg}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"tel"}
                lableText={"Owners Contact Number"}
                placeholder={"Enter Your Owners Contact Number"}
                name={"ownerContactEdit"}
                value={editInputes.ownerContactEdit}
                fieldErrorMsg={editOwnerContactError}
                isErrorMsg={isErrorMsg}
                isRadio={false}
                handleInputesChange={handleInputesChange}
              />
              <Input
                type={"text"}
                lableText={"Owners License Number"}
                placeholder={"Enter Your Owners license Number"}
                name={"ownerLicenseEdit"}
                value={editInputes.ownerLicenseEdit}
                isErrorMsg={isErrorMsg}
                isRadio={false}
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
                    check={editInputes.vehicleTypeEdit}
                    editCheck={true}
                    lableText={"Two Wheelers"}
                    name={"vehicleTypeEdit"}
                    value={"TwoWheeler"}
                    isRadio={true}
                    handleInputesChange={handleInputesChange}
                  />
                  <Input
                    type={"radio"}
                    check={editInputes.vehicleTypeEdit}
                    editCheck={true}
                    lableText={"Three Wheelers"}
                    name={"vehicleTypeEdit"}
                    value={"ThreeWheeler"}
                    isRadio={true}
                    handleInputesChange={handleInputesChange}
                  />
                  <Input
                    type={"radio"}
                    check={editInputes.vehicleTypeEdit}
                    editCheck={true}
                    lableText={"Four Wheelers"}
                    name={"vehicleTypeEdit"}
                    value={"FourWheeler"}
                    isRadio={true}
                    handleInputesChange={handleInputesChange}
                  />
                  {isErrorMsg && editInputes.vehicleTypeEdit.length <=0 && editVehicleTypeError.length > 0 ? <p>{editVehicleTypeError}</p> : null}
                </div>
              </div>
              {toggle ? (
                <div className="flex flex-row p-2 gap-2">
                  <img
                    className="h-[16vh]"
                    src={`data:image/jpeg;base64,${editInputes.bufferImgsEdit}`}
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
                  <input type="file" id={`${mode ? "fileUpload" : "fileUploadDarkMode"}`} onChange={handleChangeFile} />
                  {isErrorMsg && editInputes.bufferImgsEdit.length <=0 && editBufferImgsError.length > 0 ? <p className="text-red-600 font-semibold">{editBufferImgsError}</p> : null}
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
      <ToastContainer />
    </>
  );
}

export default EditVehicle;
