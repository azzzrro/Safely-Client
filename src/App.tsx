import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Identificationpage from "./pages/user/Authentication/Identificationpage";
import { ChakraProvider } from "@chakra-ui/react";
import Photopage from "./pages/user/Authentication/Photopage";
import Loginpage from "./pages/user/Authentication/Loginpage";
import Signuppage from "./pages/user/Authentication/Signuppage";
import Otppage from "./pages/user/Authentication/Otppage";
import DriverSignupPage from "./pages/driver/Authentication/DriverSignupPage";
import DriverOtpPage from "./pages/driver/Authentication/DriverOtpPage";
import DriverIdentificationPage from "./pages/driver/Authentication/DriverIdentificationPage";
import DriverPhotoPage from "./pages/driver/Authentication/DriverPhotoPage";
import DriverLocationPage from "./pages/driver/Authentication/DriverLocationPage";
import DriverLoginPage from "./pages/driver/Authentication/DriverLoginPage";

function App() {
    return (
        <>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>

                      {/* User Routes */}

                        <Route path="/" element={<Signuppage />} />
                        <Route path="/otp" element={<Otppage />} />
                        <Route path="/Identification" element={<Identificationpage />} />
                        <Route path="/photo" element={<Photopage/>} />
                        <Route path="/login" element={<Loginpage/>}/>

                      {/* Driver Routes */}

                        <Route path="/Driver-signup" element={<DriverSignupPage/>}/>
                        <Route path="/Driver-otp" element={<DriverOtpPage/>}/>
                        <Route path="/Driver-identification" element={<DriverIdentificationPage/>}/>
                        <Route path="/Driver-photo" element={<DriverPhotoPage/>}/>
                        <Route path="/Driver-location" element={<DriverLocationPage/>}/>
                        <Route path="/Driver-login" element={<DriverLoginPage/>}/>

                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </>
    );
}

export default App;
