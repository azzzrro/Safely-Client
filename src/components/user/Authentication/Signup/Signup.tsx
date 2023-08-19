import "./Signup.scss";
import React, { useEffect } from "react";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupIcon from "@mui/icons-material/Group";
import { useState } from "react";
import axiosInstance from "../../../../services/axios/axios";
import "../../Authentication/Otp/Otp.scss";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber, RecaptchaVerifier, Auth, ConfirmationResult } from "firebase/auth";
import { auth } from "../../../../services/firebase/firebase";
import Identificationpage from "../../../../pages/user/Authentication/Identificationpage";

function Signup() {
    const [otpPage, setOtpPage] = useState(false);
    const [identificationPage, setIdentificationPage] = useState(false);

    const [otp, setOtp] = useState<number>(0);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    useEffect(() => {
        setOtpPage(false);
        setIdentificationPage(false)
    }, []);

    const navigate = useNavigate();

    const [re_password, set_re_password] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        reffered_Code: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleOtpChange = (index: number, newValue: number) => {
        const newOtp = [...otp.toString()]; // Convert the OTP number to a string array
        newOtp[index] = newValue.toString(); // Update the individual digit
        setOtp(parseInt(newOtp.join(""))); // Convert back to a single number and update state
    };

    const signupHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {data} = await axiosInstance.post(`/checkUser`, formData);

            if (data.message  === "User login") {
                toast.error("User Already registered!");
                toast.info("Please Login to continue")
                navigate('/login')
            } else if(data.message === "User must fill documents") {
                toast.info("User Already registered!\n Please verify the documents")
                console.log(data);
                
                localStorage.setItem('token',data.token)
                setIdentificationPage(true)
            }else{
                sendOtp();
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const onCaptchaVerify = (auth: Auth) => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: () => {
                    toast.success("Otp sent successfully");
                },
                "expired-callback": () => {
                    toast.error("TimeOut");
                },
            });
        }
    };

    const sendOtp = async () => {
        onCaptchaVerify(auth);
        const number = "+91" + formData.mobile;
        const appVerifier = window.recaptchaVerifier;
        try {
            const result = await signInWithPhoneNumber(auth, number, appVerifier);
            setConfirmationResult(result);
            setOtpPage(true);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const otpVerify = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (otp && confirmationResult) {
            const otpValue: string = otp.toString();
            confirmationResult
                .confirm(otpValue)
                .then(async () => {
                    registerSubmit();
                })
                .catch(() => {
                    toast.error("Enter a valid otp");
                });
        } else {
            toast.error("Enter a valid otp");
        }
    };

    const registerSubmit = async () => {
        try {
            const response = await axiosInstance.post(`/register`, formData);
            if (response.data.email) {
                setIdentificationPage(true)
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const iconsColor = "text-gray-400";
    return (
        <>
            <ToastContainer />

            {identificationPage ? (
                <Identificationpage/>
            ) : (
                <>
                    <div className="registration-container h-screen flex justify-center items-center">
                        <div className="registration-container-second md:w-4/6 w-5/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                            {otpPage ? (
                                <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16  md:w-2/3 i justify-around items-center mb-3 md:m-0">
                                    <div className="flex w-full justify-center pt-10 items-center">
                                        <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-7xl user-otp-title">
                                            don’t share your secret OTP!
                                        </h1>
                                    </div>
                                    <div className="sm:hidden md:block">
                                        <img
                                            style={{ height: "300px", width: "auto" }}
                                            src="https://img.freepik.com/free-vector/new-message-concept-illustration_114360-666.jpg?w=1060&t=st=1692082525~exp=1692083125~hmac=b2a80958a9575bc687f38f052c36e556a1aa6a5bcaaa94134ba0db6c37823bf4"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                                    <div className="flex w-full justify-center pt-10 items-center">
                                        <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-6xl user-signup-title md:mb-4 ">
                                            Signup and get a free first ride!
                                        </h1>
                                    </div>
                                    <div className="hidden  md:flex md:items-center justify-center">
                                        <img
                                            style={{ height: "280px", width: "auto" }}
                                            src="../../../public/images/11668479_20943593.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )}

                            {otpPage ? (
                                <div className="flex md:w-1/2 justify-center px-4  pb-10 md:py-10 items-center">
                                    <div className="user-otp-form md:w-10/12 px-9 py-10  bg-white drop-shadow-2xl">
                                        <form>
                                            <div className="flex justify-center items-center">
                                                <h1 className="text-gray-800 font-bold text-2xl mb-2 text-center">
                                                    Enter the OTP sent to your mobile
                                                </h1>
                                            </div>

                                            <HStack>
                                                <PinInput otp placeholder="">
                                                    {[...Array(6)].map((_, index) => (
                                                        <PinInputField
                                                            key={index}
                                                            onChange={(e) =>
                                                                handleOtpChange(index, parseInt(e.target.value))
                                                            }
                                                        />
                                                    ))}
                                                </PinInput>
                                            </HStack>

                                            <button
                                                onClick={otpVerify}
                                                type="submit"
                                                className="block w-full bg-blue-800 py-2 my-4 rounded-2xl text-golden font-semibold mb-2"
                                            >
                                                Verify
                                            </button>
                                            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                                                Didn't recieved the OTP?
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex md:w-1/2 justify-center pb-10 md:py-10 items-center">
                                    <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                                        <form onSubmit={signupHandle}>
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <PersonIcon className={iconsColor} />
                                                <input
                                                    className="pl-2 outline-none border-b w-full"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    id=""
                                                    placeholder="Full name"
                                                />
                                            </div>
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <AlternateEmailIcon className={iconsColor} />
                                                <input
                                                    className="pl-2 outline-none border-b w-full"
                                                    type="text"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    id=""
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <SmartphoneIcon className={iconsColor} />

                                                <input
                                                    className="pl-2 outline-none border-b w-full"
                                                    type="text"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    id=""
                                                    placeholder="Mobile number"
                                                />
                                            </div>

                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <VpnKeyIcon className={iconsColor} />
                                                <input
                                                    className="pl-2 outline-none border-b w-full"
                                                    type="text"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    id=""
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <VpnKeyIcon className={iconsColor} />
                                                <input
                                                    className="pl-2 outline-none border-b w-full"
                                                    type="text"
                                                    name="re_password"
                                                    value={re_password}
                                                    onChange={(e) => {
                                                        set_re_password(e.target.value);
                                                    }}
                                                    id=""
                                                    placeholder="Retype-Password"
                                                />
                                            </div>
                                            <div className="flex items-center  py-2 px-3 rounded-2xl">
                                                <GroupIcon className={iconsColor} />
                                                <input
                                                    className="pl-2 outline-none border-b w-full"
                                                    type="text"
                                                    name="reffered_Code"
                                                    value={formData.reffered_Code}
                                                    onChange={handleChange}
                                                    id=""
                                                    placeholder="Referral Code"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="block w-full bg-blue-800 py-2 rounded-2xl text-golden font-semibold mt-3 mb-2"
                                            >
                                                Register Now
                                            </button>
                                            <span
                                                onClick={() => {
                                                    navigate("/login");
                                                }}
                                                className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                                            >
                                                Already a member? Login here
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div id="recaptcha-container"></div>
                </>
            )}
        </>
    );
}

export default Signup;
