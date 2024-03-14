import React, { useEffect, useState } from "react";
import Context from "../context/createContext";

function DataState(props) {
  // Store ALL The Data In List....
  const [lists, setLists] = useState([]);
  
  // Dark And Light Mode 
  const [mode, setMode] = useState(true);

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
  function getAllData() {
    let datas = JSON.parse(localStorage.getItem("datas"));
    if (datas && datas.length > 0) {
      setLists(datas);
    } else {
      setLists([]);
    }
  }

  // Route POST Addind Data.....
  function AddAllData(inputesData) {
    let allData = [];
    let preDatas = JSON.parse(localStorage.getItem("datas"));
    if (preDatas && preDatas.length > 0) {
      allData = [...preDatas, inputesData];
      setLists(allData);
    } else {
      allData = [inputesData];
      setLists(allData);
    }
    localStorage.setItem("datas", JSON.stringify(allData));
  }

  // Select Data For Edit And Delete....
  const [selectedData, setSelectedData] = useState({});

  // Route PUT  Update Data In LocalStorage
  function updateDatas(editInputesData, id) {
    if (lists && lists.length > 0) {
      let dataLists = lists;
      for (let i = 0; i < dataLists.length; i++) {
        if (dataLists[i]._id === id) {
          dataLists[i] = editInputesData;
          break;
        }
      }
      localStorage.setItem("datas", JSON.stringify(dataLists));
      setLists(dataLists);
    } else {
      console.log("You Have No Datas In LocalStorage", lists);
    }
  }

  // Route DELETE Remove One Data
  // function removeData(remove) {
  //   console.log("Before Values",returnValue)
  //   handleToggleModal()
  //   console.log("After Values",returnValue)
  //   if (returnValue) {
  //     if (lists && lists.length > 0) {
  //       let dataNewLists = lists;
  //       let deleted = dataNewLists.filter((eachList) => {
  //         return eachList !== remove;
  //       });
  //       localStorage.setItem("datas", JSON.stringify(deleted));
  //       setLists(deleted);
  //     }
  //   }
  // }

  function removeData(remove) {
    if (lists && lists.length > 0) {
      let dataNewLists = lists;
      let deleted = dataNewLists.filter((eachList) => {
        return eachList !== remove;
      });
      localStorage.setItem("datas", JSON.stringify(deleted));
      setLists(deleted);
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
