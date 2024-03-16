import React, { useEffect, useState } from "react";
import {getAllVehicleDataURL, addVehicleDataURL, updateVehicleDataURL, removeVehicleDataURL} from "../utils/index"
import Context from "../context/createContext";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";


function DataState(props) {
  const navigate = useNavigate()
  // Store ALL The Data In List....
  const [lists, setLists] = useState([]);
  
  // Dark And Light Mode 
  const [mode, setMode] = useState(true);

  const toastOptions = {
    position:"top-center",
    autoClose:2000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
  }

  useEffect(() => {
    setMode(JSON.parse(localStorage.getItem("mode")));
  }, []);

  function toggleMode() {
    let getMode = JSON.parse(localStorage.getItem("mode"));
    console.log("This Is Toggle Button Mode", getMode);
    if (getMode) {
      setMode(false);
      localStorage.setItem("mode", JSON.stringify(false));
      console.log(
        "This Is Toggle Button Mode False",
        JSON.parse(localStorage.getItem("mode"))
      );
    } else {
      setMode(true);
      localStorage.setItem("mode", JSON.stringify(true));
      console.log(
        "This Is Toggle Button Mode True",
        JSON.parse(localStorage.getItem("mode"))
      );
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("mode"))) {
      document.body.classList.remove("darkMode");
      document.body.classList.add("lightMode");
    } else {
      document.body.classList.remove("lightMode");
      document.body.classList.add("darkMode");
    }
  }, [mode]);

  // Route GET Get All The Data From Server || localStorage
  async function getAllData() {
    // Method :- This Is For Getting Data From API From Server Not LocalStorage
    // let datas = JSON.parse(localStorage.getItem("datas"));
    // if (datas && datas.length > 0) {
    //   setLists(datas);
    // } else {
    //   setLists([]);
    // }

    // Method :- This Is For Getting Data From API From Server Not LocalStorage

    const getAllDataFetch = await fetch(`${getAllVehicleDataURL}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": JSON.parse(localStorage.getItem("authToken"))
      }
    })

    const getAllData = await getAllDataFetch.json()

    if(getAllData.status){
      setLists(getAllData.allVehicleData)
    }
    else{
      setLists([])
    }
  }

  // Route POST Addind Data.....
  async function AddAllData(inputesData) {
    let allData = [];
    // let preDatas = JSON.parse(localStorage.getItem("datas"));
    // if (preDatas && preDatas.length > 0) {
    //   allData = [...preDatas, inputesData];
    //   setLists(allData);
    // } else {
    //   allData = [inputesData];
    //   setLists(allData);
    // }
    // localStorage.setItem("datas", JSON.stringify(allData));

    const addVehicleDataFetch = await fetch(`${addVehicleDataURL}`,{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "authToken":JSON.parse(localStorage.getItem("authToken"))
      },
      body: JSON.stringify({
        modelYear: inputesData.modelYear,
        vehicleNumber: inputesData.vehicleNumber,
        ownerName: inputesData.ownerName,
        ownerContact: inputesData.ownerContact,
        ownerLicense: inputesData.ownerLicense,
        vehicleType: inputesData.vehicleType,
        vehicleImgs: inputesData.bufferImgs
      })
    })

    const addedData = await addVehicleDataFetch.json()

    if(addedData.status){
      allData = [...lists, addedData.vehicleData]
      setLists(allData)
      toast.success("Successfully Add", toastOptions)
      setTimeout(()=>{
        navigate("/")
      },1000)
    }
    else{
      allData = [...lists]
      setLists(allData)
      toast.error(addedData.message, toastOptions)
    }
  }

  // Select Data For Edit And Delete....
  const [selectedData, setSelectedData] = useState({});

  // Route PUT  Update Data In LocalStorage
  async function updateDatas(editInputesData, id) {
    // This Is For Updating Data From LocalStorage....
    // if (lists && lists.length > 0) {
    //   let dataLists = lists;
    //   for (let i = 0; i < dataLists.length; i++) {
    //     if (dataLists[i]._id === id) {
    //       dataLists[i] = editInputesData;
    //       break;
    //     }
    //   }
    //   localStorage.setItem("datas", JSON.stringify(dataLists));
    //   setLists(dataLists);
    // } else {
    //   console.log("You Have No Datas In LocalStorage", lists);
    // }

    // This Is For Updating Data From Server API....
    const updateDataFetch = await fetch(`${updateVehicleDataURL}/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "authToken": JSON.parse(localStorage.getItem("authToken"))
      },
      body:JSON.stringify({
        ownerNameEdit: editInputesData.ownerNameEdit,
        ownerContactEdit: Number(editInputesData.ownerContactEdit),
        vehicleTypeEdit: editInputesData.vehicleTypeEdit,
        vehicleImgsEdit: editInputesData.bufferImgsEdit,
      })
    })

    const updatedData = await updateDataFetch.json()
    
    if(updatedData.status){
      // This For Loop For Update Data From Client Side
      let preDatas = lists
      for(let i = 0; i < preDatas.length; i++){
        if(preDatas[i]._id === id){
          preDatas[i].modelYear = updatedData.vehicleUpdateData.modelYear
          preDatas[i].vehicleNumber = updatedData.vehicleUpdateData.vehicleNumber
          preDatas[i].ownerName = updatedData.vehicleUpdateData.ownerName
          preDatas[i].ownerContact = updatedData.vehicleUpdateData.ownerContact
          preDatas[i].ownerLicense = updatedData.vehicleUpdateData.ownerLicense
          preDatas[i].vehicleType = updatedData.vehicleUpdateData.vehicleType
          preDatas[i].vehicleImgs = updatedData.vehicleUpdateData.vehicleImgs
          break;
        }
      }
      setLists(preDatas)
      navigate("/")
      toast.success("Successfully Update", toastOptions)
    }
    else{
      toast.error(updatedData.message, toastOptions)
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  }

  async function removeData(remove) {
    // This Is For Delete Data From LocalStorage
    // if (lists && lists.length > 0) {
    //   let dataNewLists = lists;
    //   let deleted = dataNewLists.filter((eachList) => {
    //     return eachList !== remove;
    //   });
    //   localStorage.setItem("datas", JSON.stringify(deleted));
    //   setLists(deleted);
    // }

    // This Is For Delete Data From Server API

    const removeDataFetch = await fetch(`${removeVehicleDataURL}/${remove._id}`,{
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "authToken": JSON.parse(localStorage.getItem("authToken"))
      }
    })

    const removedData = await removeDataFetch.json()

    if(removedData.status){
      toast.success("Successfully Removed", toastOptions)
      // After Removing The Data getAllData() Call To Get New Lists From The DataBase
      getAllData()
    }
    else{
      toast.error(removedData.message, toastOptions)
    }
  }

  return (
    <Context.Provider
      value={{
        lists,
        selectedData,
        setSelectedData,
        getAllData,
        updateDatas,
        AddAllData,
        removeData,
        toggleMode,
        mode,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default DataState;
