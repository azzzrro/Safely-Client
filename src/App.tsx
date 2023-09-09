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
import {Toaster} from 'react-hot-toast'
import "mapbox-gl/dist/mapbox-gl.css";
import { AdminDrivers } from "./pages/admin/adminDrivers/AdminDrivers";
import { AdminDriverDetailsPending } from "./pages/admin/adminDrivers/AdminDriverDetailsPending";
import AdminDriverDetailsVerified from "./pages/admin/adminDrivers/AdminDriverDetailsVerified";
import AdminUsers from "./pages/admin/adminUsers/AdminUsers";
import AdminUserDetails from "./pages/admin/adminUsers/AdminUserDetails";

function App() {
    return (
        <>
            <ToastContainer />
            <Toaster/>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        {/* User Routes */}

                        <Route path="/signup" element={<Signuppage />} />
                        <Route path="/otp" element={<Otppage />} />
                        <Route path="/identification" element={<Identificationpage />} />
                        <Route path="/photo" element={<Photopage />} />
                        <Route path="/login" element={<Loginpage />} />

                        <Route path="/" element={<Homepage />} />

                        {/* Driver Routes */}

                        <Route path="/driver/signup" element={<DriverSignupPage />} />
                        <Route path="/driver/otp" element={<DriverOtpPage />} />
                        <Route path="/driver/identification" element={<DriverIdentificationPage />} />
                        <Route path="/driver/vehicle" element={<DriverVehiclePage/>} />

                        <Route path="/driver/photo" element={<DriverPhotoPage />} />
                        <Route path="/driver/location" element={<DriverLocationPage />} />
                        <Route path="/driver/login" element={<DriverLoginPage />} />

                        <Route path="/driver/dashboard" element={<DriverDashboardpage />} />

                        {/* Admin Routes */}

                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin/dashboard" element={<AdminDashboardpage />} />

                        <Route path="/admin/drivers" element={<AdminDrivers />} />
                        <Route path="/admin/pendingDriver/:id" element={<AdminDriverDetailsPending />} />
                        <Route path="/admin/verifiedDriver/:id" element={<AdminDriverDetailsVerified />} />

                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/userDetails/:id" element={<AdminUserDetails />} />


                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </>
    );
}

export default App;
