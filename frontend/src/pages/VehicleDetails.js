import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/createContext";
import { useParams } from "react-router-dom";

function VehicleDetails() {
  const navigate = useNavigate()
  const { mode } = useContext(Context);
  const { id } = useParams();

  useEffect(()=>{
    if(!(JSON.parse(localStorage.getItem("authToken")))){
      navigate("/signin")
    }
    else{
      document.title = "Vehicle App | Vehicle Details";
    }
  },[])

  const [selectIdData, setSelectIdData] = useState({});
  
  function getParamsData() {
    const allDatas = JSON.parse(localStorage.getItem("datas"));
    let keyData;
    if (allDatas) {
      let keyDataArray = allDatas.find((eachData) => {
        return eachData._id === id;
      });
      keyData = keyDataArray;
    } else {
      keyData = {};
    }
    setSelectIdData(keyData);
  }

  useEffect(() => {
    if (id) {
      getParamsData();
    }
  }, [id]);

  return (
    <>
      {selectIdData?.bufferImgs && (
        <section className={`detailsContainer container mt-8 mx-auto p-1 sm:p-4 ${mode ? "bg-[#E0E0E0]" : "bg-[rgb(16, 24, 40)]"}`}>
          <div className={`detailsRow grid grid-cols-12 lg:grid-cols-8 border-[1.5px] ${mode ? "border-gray-800" : "border-white"} rounded`}>
            <div className="col-span-12 md:col-span-6 lg:col-span-3 p-2">
              <img
                className="object-cover md:h-[30vh] md:w-[53vw] sm:h-[44vh] sm:w-[100vw] lg:w-[30vw] rounded"
                src={`data:image/jpeg;base64,${selectIdData?.bufferImgs}`}
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
    </>
  );
}

export default VehicleDetails;

{
  /* <>
      {selectIdData && (
        <section className="detailsContainer container mt-8 mx-auto">
          <div className="detailsRow grid grid-cols-12">
            <div className="col-span-12 md:col-span-10 lg:col-span-4 p-2">
              <img
                className="object-cover md:h-[30vh] md:w-[53vw] sm:h-[44vh] sm:w-[100vw] rounded"
                src={`data:image/jpeg;base64,${selectIdData?.bufferImgs}`}
                alt="detailsImgs"
              />
            </div>
            <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center flex flex-col gap-4 mx-4 my-2 lg:my-0">
              {keys && keys.length > 0 ? (
                keys.map((eachKeys, index) => {
                  return index <= 2 ? (
                    <div
                      className="flex md:flex-col gap-2 md:gap-1"
                      key={index}
                    >
                      <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                        {" "}
                        {eachKeys.charAt(0).toUpperCase() + eachKeys.slice(1)}
                        <span className="font-semibold">:</span>{" "}
                      </p>
                      <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                        {selectIdData[eachKeys]}
                      </p>
                    </div>
                  ) : null;
                })
              ) : (
                <h2>No Data Founds</h2>
              )}
            </div>
            <div className="col-span-12 md:col-span-3 lg:col-span-2 self-center flex flex-col gap-4 mx-4 my-2 lg:my-0">
              {keys && keys.length > 0 ? (
                keys.map((eachKeys, index) => {
                  return index > 2 ? (
                    <div
                      className="flex md:flex-col gap-2 md:gap-1"
                      key={index}
                    >
                      <p className={`font-medium text-base ${mode ? "text-gray-600" : "text-white"}`}>
                        {eachKeys.charAt(0).toUpperCase() + eachKeys.slice(1)}{" "}
                        <span className="font-semibold">:</span>{" "}
                      </p>
                      <p className={`font-semibold p-0 text-base ${mode ? "text-gray-800" : "text-white"}`}>
                        {selectIdData[eachKeys]}
                      </p>
                    </div>
                  ) : null;
                })
              ) : (
                <h2>No Data Founds</h2>
              )}
            </div>
          </div>
        </section>
      )}
    </> */
}
