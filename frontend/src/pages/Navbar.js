import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Context from "../context/createContext";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import PopupAlert from "../components/PopupAlert";

function Navbar() {
  const location = useLocation();
  const { mode, toggleMode } = useContext(Context);

  const [links, setLinks] = useState([
    { id: "1", text: "Vehicle List", to: "/" },
    { id: "2", text: "Add Vehicle", to: "/add" },
  ]);
  
  // This Is For Responsive Menu Button....
  const [toggler, setToggler] = useState(true);

  const [toggleLogout, setToggleLogout] = useState(false)

  return (
    <>
      {toggleLogout && (
        <PopupAlert
          popUpMessage={"Are You Sure? You Wants To Log Out"}
          isLogout={true}
          isRemove={false}
          setToggleLogout={setToggleLogout}
        />
      )}
      <Nav
        style={
          mode
            ? {
                color: "#1F2937",
                background: "#E0E0E0",
                boxShadow: "8px 8px 16px #b5b5b5, -8px -8px 16px #ffffff",
              }
            : {
                color: "white",
                background: "rgb(31,41,55)",
                boxShadow: "8px 8px 16px #141b24, -8px -8px 16px #2a374a",
              }
        }
      >
        <div className="container mx-auto p-4 flex flex-wrap items-center justify-between">
          {/* max-w-screen-xl */}
          {JSON.parse(localStorage.getItem("authToken")) ? (
            <Link
              to={"/"}
              className={`flex items-center text-xl ${
                mode ? "text-gray-800" : "text-white"
              } font-bold`}
            >
              Vehicle Tracker
            </Link>
          ) : (
            <p
              className={`flex items-center text-xl ${
                mode ? "text-gray-800" : "text-white"
              } font-bold cursor-pointer`}
            >
              Vehicle Tracker
            </p>
          )}
          <button
            onClick={() => {
              setToggler(!toggler);
            }}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              toggler ? "hidden" : ""
            } w-full md:flex gap-4 md:w-auto self-center justify-self-center`}
            id="navbar-default"
          >
            {/* <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0"> */}
            <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 md:flex-row md:gap-2 md:mt-0">
              {JSON.parse(localStorage.getItem("authToken")) ? (
                links.length > 0 ? (
                  links.map((link) => {
                    return (
                      <li key={link.text}>
                        {
                          <Link
                            to={link.to}
                            className={`md:block py-2 px-3 ${
                              mode ? "text-gray-800" : "text-white "
                            } rounded`}
                            aria-current="page"
                          >
                            {" "}
                            {link.text}{" "}
                          </Link>
                        }
                      </li>
                    );
                  })
                ) : (
                  <h1>No Links In Navbar</h1>
                )
              ) : location.pathname === "/signin" ? (
                <Link
                  className={`md:block py-2 px-3 ${
                    mode
                      ? "text-white bg-gray-800"
                      : "text-gray-800 bg-gray-200"
                  } rounded font-semibold`}
                  to={"/signup"}
                >
                  Sign Up
                </Link>
              ) : (
                <Link
                  className={`md:block py-2 px-3 ${
                    mode
                      ? "text-white bg-gray-800"
                      : "text-gray-800 bg-gray-200"
                  } rounded font-semibold`}
                  to={"/signin"}
                >
                  Login
                </Link>
              )}
            </ul>
            {JSON.parse(localStorage.getItem("authToken")) && (
              <>
                <span
                  onClick={toggleMode}
                  className={` p-3 md:p-0 inline-flex items-center cursor-pointer text-sm font-medium ${
                    mode ? "text-gray-800" : "text-white"
                  } `}
                >
                  {mode ? (
                    <MdDarkMode size={"26px"} />
                  ) : (
                    <MdLightMode size={"26px"} />
                  )}
                </span>
                <button
                  className={`md:block py-2 md:ml-3 px-3 ${
                    mode
                      ? "text-white bg-gray-800"
                      : "text-gray-800 bg-gray-200"
                  } rounded font-semibold`}
                  onClick={()=>{setToggleLogout(true)}}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </Nav>
    </>
  );
}

const Nav = styled.nav``;

export default Navbar;
