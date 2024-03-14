import React, {useState} from "react";
import { Link } from "react-router-dom";
import { IoReader } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PopupAlert from  "../components/PopupAlert";

function Card(props) {
    const {list, mode, setSelectedData} = props

    const [toggleRemoveData, setToggleRemoveData] = useState(false)
    const handleAlertRemove = (list)=>{
      setToggleRemoveData(true)
      setSelectedData(list)
    }

  return (
    <>
      { toggleRemoveData && <PopupAlert popUpMessage = {"Are You Sure You Wants To Delete This Products"} setToggleRemoveData={setToggleRemoveData} isRemove={true} isLogout={false} />}
      <div className="mainCard flex flex-col gap-1" style={mode ? {  color: "#1F2937",background: "#E0E0E0"} : {color: "white",background: "rgb(16,24,40)"}}>
        <div className="imgDiv">
          <img src={list.bufferImgs ? `data:image/jpg;charset=utf-8;base64,${list.bufferImgs}` : "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg"} className="imgs object-cover h-[26vh] lg:h-[28vh] xl:h-[24vh] w-full rounded" alt="ImagesList"/>
        </div>
        <div className="ownerNameDiv py-2">
          <h4 className={`text-center text-base font-bold ${mode ? "text-gray-800" : "text-white" }`}>
            <span className="text-center font-bold">Owner Name : </span>
            {list.ownerName}
          </h4>
        </div>
        <div className="vehicleNumber py-2 ">
          <h4 className={`text-center text-base font-bold ${mode ? "text-gray-800" : "text-white" }`}>
            <span className="font-bold">Vehicle Number : </span>
            {list.vehicleNumber}
          </h4>
        </div>
        <div className="btns flex flex-row gap-8 justify-center items-center">
          {/* <Link className="cardBtn pt-1" to={`/details`} onClick={()=>{selectData(list)}}><img className="h-[34px]" src={Arrow} alt="ReadMore"/></Link> */}
          <Link className="cardBtn p-1" to={`/details/${list._id}`} ><IoReader size={"26px"}/></Link>
          {/* <Link className="cardBtn p-1" to={"/edit"} onClick={()=>{selectData(list)}}><img className="h-[24px]" src={Edit} alt="EditDetails"/></Link> */}
          <Link className="cardBtn p-1" to={`/edit/${list._id}`} > <FaEdit size={"26px"}/> </Link>
          <button className="cardBtn p-1" type="button" onClick={()=>{handleAlertRemove(list)}}><MdDelete size={"26px"}/></button>
          {/* <button className="cardBtn p-1" type="button" onClick={()=>{removeData(list)}}><MdDelete size={"26px"}/></button> */}
        </div>
      </div>
    </>
  );
}

export default Card;
