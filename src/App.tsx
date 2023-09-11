import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Identificationpage from "./pages/user/Authentication/Identificationpage";
import { ChakraProvider } from "@chakra-ui/react";
import Photopage from "./pages/user/Authentication/Photopage";
import Loginpage from "./pages/user/Authentication/Loginpage";
import Signuppage from "./pages/user/Authentication/Signuppage";
import Otppage from "./pages/user/Authentication/Otppage";
import { Homepage } from "./pages/user/Home/Homepage";

import DriverSignupPage from "./pages/driver/Authentication/DriverSignupPage";
import DriverOtpPage from "./pages/driver/Authentication/DriverOtpPage";
import DriverIdentificationPage from "./pages/driver/Authentication/DriverIdentificationPage";
import DriverPhotoPage from "./pages/driver/Authentication/DriverPhotoPage";
import DriverLocationPage from "./pages/driver/Authentication/DriverLocationPage";
import DriverLoginPage from "./pages/driver/Authentication/DriverLoginPage";
import { DriverDashboardpage } from "./pages/driver/Dashboard/DriverDashboardpage";
import DriverVehiclePage from "./pages/driver/Authentication/DriverVehiclePage";

import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardpage } from "./pages/admin/AdminDashboardpage";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "mapbox-gl/dist/mapbox-gl.css";
import { AdminDrivers } from "./pages/admin/adminDrivers/AdminDrivers";
import { AdminDriverDetailsPending } from "./pages/admin/adminDrivers/AdminDriverDetailsPending";
import AdminDriverDetailsVerified from "./pages/admin/adminDrivers/AdminDriverDetailsVerified";
import AdminUsers from "./pages/admin/adminUsers/AdminUsers";
import AdminUserDetails from "./pages/admin/adminUsers/AdminUserDetails";
import Profilepage from "./pages/user/Home/Profilepage";
import UserRoute from "./routes/userRoutes/UserRoute";
import DriverRoute from "./routes/driverRoutes/DriverRoute";
import AdminRoute from "./routes/adminRoutes/adminRoute";

function App() {
    return (
        <>
            <ToastContainer />
            <Toaster />
            <ChakraProvider>
                <UserRoute />
                <DriverRoute />
                <AdminRoute />
            </ChakraProvider>
        </>
    );
}

export default App;
