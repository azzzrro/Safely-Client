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

import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardpage } from "./pages/admin/AdminDashboardpage";
import { ToastContainer } from "react-toastify";
import "mapbox-gl/dist/mapbox-gl.css";
import { AdminDrivers } from "./pages/admin/AdminDrivers";
import { AdminDriverDetailsPending } from "./pages/admin/AdminDriverDetailsPending";


function App() {
    return (
        <>
            <ToastContainer />
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        {/* User Routes */}

                        <Route path="/" element={<Signuppage />} />
                        <Route path="/otp" element={<Otppage />} />
                        <Route path="/identification" element={<Identificationpage />} />
                        <Route path="/photo" element={<Photopage />} />
                        <Route path="/login" element={<Loginpage />} />

                        <Route path="/home" element={<Homepage />} />

                        {/* Driver Routes */}

                        <Route path="/driver/signup" element={<DriverSignupPage />} />
                        <Route path="/driver/otp" element={<DriverOtpPage />} />
                        <Route path="/driver/identification" element={<DriverIdentificationPage />} />
                        <Route path="/driver/photo" element={<DriverPhotoPage />} />
                        <Route path="/driver/location" element={<DriverLocationPage />} />
                        <Route path="/driver/login" element={<DriverLoginPage />} />

                        <Route path="/driver/dashobard" element={<DriverDashboardpage />} />

                        {/* Admin Routes */}

                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin/dashboard" element={<AdminDashboardpage />} />
                        <Route path="/admin/drivers" element={<AdminDrivers />} />
                        <Route path="/admin/pendingDriver/:id" element={<AdminDriverDetailsPending />} />

                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </>
    );
}

export default App;
