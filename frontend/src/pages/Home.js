import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Context from "../context/createContext";

function Home() {
  const navigate = useNavigate();
  const { lists, setSelectedData, getAllData, mode, setToggleAlert } = useContext(Context);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("authToken"))) {
      navigate("/signin");
    } else {
      getAllData();
      document.title = "Vehicle App | Home";
    }
  }, []);

  return (
    <>
      <div
        className={`container mx-auto mt-8 `}
        style={
          mode
            ? { color: "#1F2937", background: "#E0E0E0" }
            : { color: "white", background: "rgb(16,24,40)" }
        }
      >
        <div className="grid grid-cols-12 p-2">
          {lists && lists.length > 0 ? (
            lists.map((list) => {
              return (
                <div
                  className={`cards col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 sm:mx-2 my-4 xl:my-2 pb-4 border-[1.5px] ${
                    mode ? "border border-gray-800" : "border border-white"
                  } rounded-sm`}
                  key={list.ownerName}
                >
                  <Card
                    list={list}
                    setSelectedData={setSelectedData}
                    mode={mode}
                    setToggleAlert={setToggleAlert}
                  />
                </div>
              );
            })
          ) : (
            <h1>No Data Found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
