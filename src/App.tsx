import "./App.scss";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import Identificationpage from "./pages/user/Authentication/Identificationpage";
import Loginpage from "./pages/user/Authentication/Loginpage";
import Signuppage from "./pages/user/Authentication/Signuppage";
import { Homepage } from "./pages/user/Home/Homepage";
import Profilepage from "./pages/user/Home/Profilepage";
import UserCurrentRidePage from "./pages/user/Home/UserCurrentRidePage";

import DriverSignupPage from "./pages/driver/Authentication/DriverSignupPage";
import DriverIdentificationPage from "./pages/driver/Authentication/DriverIdentificationPage";
import DriverLoginPage from "./pages/driver/Authentication/DriverLoginPage";
import { DriverDashboardpage } from "./pages/driver/Dashboard/DriverDashboardpage";
import DriverNotificationPage from "./pages/driver/Dashboard/DriverNotificationPage";
import DriverRidesPage from "./pages/driver/Dashboard/DriverRidesPage";

import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardpage } from "./pages/admin/AdminDashboardpage";
import { AdminDrivers } from "./pages/admin/adminDrivers/AdminDrivers";
import { AdminDriverDetailsPending } from "./pages/admin/adminDrivers/AdminDriverDetailsPending";
import AdminDriverDetailsVerified from "./pages/admin/adminDrivers/AdminDriverDetailsVerified";
import AdminUsers from "./pages/admin/adminUsers/AdminUsers";
import AdminUserDetails from "./pages/admin/adminUsers/AdminUserDetails";

function App() {
    const user = useSelector((store:any)=>store.user.loggedIn)
    const driver = useSelector((store:any)=>store.driver.loggedIn)
    const admin = useSelector((store:any)=>store.admin.loggedIn)


    return (
        <>
            <ToastContainer />
            <Toaster />
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        {/* User Routes */}

                        <Route path="/signup" element={user? <Navigate to={'/'}/> : <Signuppage />} />
                        <Route path="/login" element={user? <Navigate to={'/'}/> : <Loginpage />} />
                        <Route path="/identification" element={user? <Navigate to={'/'}/> : <Identificationpage />} />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/profile" element={!user? <Navigate to={'/login'}/> : <Profilepage />} />
                        <Route path="/rides" element={!user? <Navigate to={'/login'}/> : <UserCurrentRidePage/>} />

                        {/* Driver Routes */}

                        <Route path="/driver/signup" element={driver? <Navigate to={'/driver/dashboard'}/> : <DriverSignupPage />} />
                        <Route path="/driver/login" element={driver? <Navigate to={'/driver/dashboard'}/> : <DriverLoginPage />} />
                        <Route path="/driver/identification" element={driver? <Navigate to={'/driver/dashboard'}/> : <DriverIdentificationPage />} />
                        <Route path="/driver/dashboard" element={!driver? <Navigate to={'/driver/login'}/> : <DriverDashboardpage />} />
                        <Route path="/driver/notifications" element={!driver? <Navigate to={'/driver/login'}/> : <DriverNotificationPage />} />
                        <Route path="/driver/rides" element={!driver? <Navigate to={'/driver/login'}/> : <DriverRidesPage />} />

                        {/* Admin Routes */}

                        <Route path="/admin/login" element={admin? <Navigate to={'/admin/dashboard'}/> : <AdminLoginPage />} />
                        <Route path="/admin/dashboard" element={!admin? <Navigate to={'/admin/login'}/> : <AdminDashboardpage />} />
                        <Route path="/admin/drivers" element={!admin? <Navigate to={'/admin/login'}/> : <AdminDrivers />} />
                        <Route path="/admin/pendingDriver/:id" element={!admin? <Navigate to={'/admin/login'}/> : <AdminDriverDetailsPending />} />
                        <Route path="/admin/verifiedDriver/:id" element={!admin? <Navigate to={'/admin/login'}/> : <AdminDriverDetailsVerified />} />
                        <Route path="/admin/users" element={!admin? <Navigate to={'/admin/login'}/> :  <AdminUsers />} />
                        <Route path="/admin/userDetails/:id" element={!admin? <Navigate to={'/admin/login'}/> :  <AdminUserDetails />} />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </>
    );
}

export default App;

