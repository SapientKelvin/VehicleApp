import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/createContext";
import { useParams } from "react-router-dom";
import {getSingleVehicleDataURL} from "../utils/index"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function VehicleDetails() {
  const navigate = useNavigate()
  const { mode } = useContext(Context);
  const { id } = useParams();

  const toastOptions = {
    position:"top-center",
    autoClose:2000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  useEffect(()=>{
    if(!(JSON.parse(localStorage.getItem("authToken")))){
      navigate("/signin")
    }
    else{
      document.title = "Vehicle App | Vehicle Details";
    }
  },[])

  const [selectIdData, setSelectIdData] = useState({});
  
  async function getParamsData() {
    // This Is For Getting Data From LocalStorage
    // const allDatas = JSON.parse(localStorage.getItem("datas"));
    // let keyData;
    // if (allDatas) {
    //   let keyDataArray = allDatas.find((eachData) => {
    //     return eachData._id === id;
    //   });
    //   keyData = keyDataArray;
    // } else {
    //   keyData = {};
    // }
    // setSelectIdData(keyData);

    // This Is For Getting Data From Server API
    const singleVehicleDataFetched = await fetch(`${getSingleVehicleDataURL}/${id}`, {
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "authToken": JSON.parse(localStorage.getItem("authToken"))
      },
    })
    const singleVehicleData = await singleVehicleDataFetched.json()
    if(singleVehicleData.status){
      setSelectIdData(singleVehicleData.singleVehicleData)
    }
    else{
      console.log("Else Side",singleVehicleData)
      setSelectIdData(null)
      toast.error("Invalid URL", toastOptions)
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  }

  useEffect(() => {
    if (id) {
      getParamsData();
    }
  }, [id]);

  return (
    <>
      {selectIdData?.vehicleImgs && (
        <section className={`detailsContainer container mt-8 mx-auto p-1 sm:p-4 ${mode ? "bg-[#E0E0E0]" : "bg-[rgb(16, 24, 40)]"}`}>
          <div className={`detailsRow grid grid-cols-12 lg:grid-cols-8 border-[1.5px] ${mode ? "border-gray-800" : "border-white"} rounded`}>
            <div className="col-span-12 md:col-span-6 lg:col-span-3 p-2">
              <img
                className="object-cover md:h-[30vh] md:w-[53vw] sm:h-[44vh] sm:w-[100vw] lg:w-[30vw] rounded"
                src={`data:image/jpeg;base64,${selectIdData?.vehicleImgs}`}
                alt="detailsImgs"
              />
            </div>
            <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center flex flex-col gap-4 mx-4 my-2 lg:my-0">
              <div className="flex md:flex-col gap-2 md:gap-1">
                <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                  Owner Name:
                </p>
                <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                  {selectIdData.ownerName}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 md:gap-1">
                <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                  Owner Contact:
                </p>
                <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                  {selectIdData.ownerContact}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 md:gap-1">
                <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                  Owner License:
                </p>
                <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                  {selectIdData.ownerLicense}
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center flex flex-col gap-4 mx-4 my-2 lg:my-0">
              <div className="flex md:flex-col gap-2 md:gap-1">
                <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                  Model Year:
                </p>
                <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                  {selectIdData.modelYear}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 md:gap-1">
                <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                  Vehicle Number:
                </p>
                <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                  {selectIdData.vehicleNumber}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 md:gap-1">
                <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                  Vehicle Type:
                </p>
                <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                  {selectIdData.vehicleType}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <ToastContainer/>
    </>
  );
}

export default VehicleDetails;