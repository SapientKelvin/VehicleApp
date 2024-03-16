import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './pages/Navbar';
import AddVehicle from "./pages/AddVehicle"
import VehicleDetails from "./pages/VehicleDetails"
import EditVehicle from './pages/EditVehicle';
import DataState from "./context/DataState"
import SignUp from './pages/SignUp'
import SignIn from "./pages/SignIn"
import ForgotPassword from './components/ForgotPassword';
import Verify from './components/Verify';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <DataState>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/add' element={<AddVehicle />} />
            <Route exact path='/details/:id' element={<VehicleDetails/>} />
            <Route exact path='/edit/:id' element={<EditVehicle />} />
            <Route exact path={"/signup"} element={<SignUp />} />
            <Route exact path={"/signin"} element={<SignIn />} />
            <Route exact path={"/forgot"} element={<ForgotPassword />} />
            <Route exact path={"/verifyotp"} element={<Verify />} />
            <Route exact path={"/resetpassword"} element={<ResetPassword />} />
          </Routes>
        </DataState>
      </BrowserRouter>
    </>
  );
}

export default App;
