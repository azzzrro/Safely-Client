import SmartphoneIcon from "@mui/icons-material/Smartphone";
import GoogleIcon from "@mui/icons-material/Google";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier, Auth, ConfirmationResult } from "firebase/auth";
import { auth } from "../../../../services/firebase";
import axiosInstance from "../../../../services/axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DriverLogin({ status }: { status: string }) {
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const navigate = useNavigate();

    // formik
    const formik = useFormik({
        initialValues: {
            mobile: "",
        },
        validationSchema: Yup.object({
            mobile: Yup.string().length(10, "Enter a valid mobile number").required("Please enter the mobile number"),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await axiosInstance.post("/driver/checkLoginDriver", values);
                console.log(data, "dattaaa");
                if (data.message === "Success") {
                    sendOtp();
                } else if (data.message === "Incomplete registration") {
                    toast.info("Please complete the verification!");
                    localStorage.setItem("driverToken", data.token);
                    navigate("/driver/identification");
                } else if (data.message === "Not verified") {
                    toast.info("Verification is ongoing!\n We'll send you an email after the verification");
                } else {
                    toast.error("Not registered! Please register to  continue.");
                }
            } catch (error) {
                toast.error((error as Error).message);
            }
        },
    });

    // Handle-OTP change

    const [otpInput, setotpInput] = useState(false);

    const [otp, setOtp] = useState<number>(0);

    const handleOtpChange = (index: number, newValue: number) => {
        const newOtp = [...otp.toString()];
        newOtp[index] = newValue.toString();
        setOtp(parseInt(newOtp.join("")));
    };

    // OTP-function

    const onCaptchaVerify = (auth: Auth) => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: () => {
                    toast.success("Otp sent successfully");
                    setotpInput(true);
                },
                "expired-callback": () => {
                    toast.error("TimeOut");
                },
            });
        }
    };

    const sendOtp = async () => {
        try {
            onCaptchaVerify(auth);
            const number = "+91" + formik.values.mobile;
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, number, appVerifier);
            setConfirmationResult(result);
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
                    toast.success("Login success");
                })
                .catch(() => {
                    toast.error("Enter a valid otp");
                });
        } else {
            toast.error("Enter a valid otp");
        }
    };

    const googleLogin = async (data: CredentialResponse) => {
        try {
            if (data.credential) {
                const decodedData = jwt_decode(data.credential) as any;
                const userEmail = decodedData.email;
                const formData = new FormData();
                formData.append("email", userEmail);
                const response = await axiosInstance.post("/driver/checkGoogleLoginDriver", formData);
                if (response.data.message === "Success") {
                    toast.success("Login success!");
                } else if (response.data.message === "Incomplete registration") {
                    toast.info("Please complete the registration!");
                    localStorage.setItem("driverToken", response.data.token);
                    navigate("/driver/identification");
                } else if (response.data.message === "Not verified") {
                    toast.info("Verification is ongoing!");
                } else {
                    toast.error("Not registered! Please register to  continue.");
                }
            }
        } catch (error: any) {
            toast.error(error);
        }
    };

    const iconsColor = "text-gray-400";
    return (
        <>
            <div className="driver-registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        {status === "pending" && (
                            <div className=" w-full pt-10 ">
                                <h1 className="text-blue-800 font-bold md:mt-4 text-4xl mx-7 md:mx-0  md:text-6xl user-signup-title md:max-w-sm">
                                    Sit back and relax!
                                </h1>
                                <h1 className="text-blue-800 font-bold text-sm my-3 mx-7 md:mx-0  md:text-xl md:mt-3 user-signup-title">
                                    Verification in progress. We’ll inform you after the verification.
                                </h1>
                            </div>
                        )}

                        {status === "" && (
                            <div className=" w-full pt-10 ">
                                <h1 className="text-blue-800 font-bold md:mt-4 text-4xl mx-7 md:mx-0  md:text-5xl user-signup-title md:max-w-sm">
                                    Please sign in with your mobile number!
                                </h1>
                                <h1 className="text-blue-800 md:max-w-xs text-sm my-3 mx-7 md:mx-0  md:text-sm md:mt-3 user-signup-title">
                                    We'll send you a One-Time-Password to your registered mobile number.
                                </h1>
                            </div>
                        )}

                        <div className="hidden  md:flex md:items-center" style={{ marginTop: "-30px" }}>
                            <img
                                style={{ height: "300px", width: "auto" }}
                                src="../../../public/images/[removal.ai]_4c7ba0ac-90b6-43f1-b097-932d54d9f8b0-sssdsdsd.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2 justify-center  pb-10 md:py-10 items-center">
                        <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="text-center">
                                    <h1 className="text-gray-800 font-bold text-2xl mb-5">Welcome back!</h1>
                                </div>

                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <SmartphoneIcon className={iconsColor} />

                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="number"
                                        name="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id=""
                                        placeholder="Mobile number"
                                    />
                                </div>
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <p className="form-error-p-tag">{formik.errors.mobile}</p>
                                )}

                                {/* <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <VpnKeyIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Password"
                                    />
                                </div> */}

                                <div className="my-4 px-2">
                                    {otpInput && (
                                        <HStack>
                                            <PinInput otp placeholder="">
                                                {[...Array(6)].map((_, index) => (
                                                    <PinInputField
                                                        key={index}
                                                        onChange={(e) => handleOtpChange(index, parseInt(e.target.value))}
                                                    />
                                                ))}
                                            </PinInput>
                                        </HStack>
                                    )}
                                </div>

                                {otpInput ? (
                                    <button
                                        onClick={otpVerify}
                                        className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                    >
                                        Verify OTP
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                    >
                                        Send OTP
                                    </button>
                                )}

                                <div className="flex justify-center items-center text-center text-xs mt-4 text-blue-800">
                                    <HorizontalRuleIcon />
                                    <h1>or sign-in using Google</h1>
                                    <HorizontalRuleIcon />
                                </div>

                                <div className="flex justify-center items-center mt-3 mb-2">
                                    {/* <div className="flex items-center justify-center w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2">
                                        <GoogleIcon className="text-golden" style={{ fontSize: "18px" }} /> */}
                                    <GoogleLogin shape="circle" ux_mode="popup" onSuccess={googleLogin} />
                                    {/* <h1 className="ml-1">Continue with Google</h1>
                                    </div> */}
                                </div>
                                <div className="text-center">
                                    <span 
                                    onClick={()=>navigate('/driver/signup')}
                                    className="text-xs ml-2 hover:text-blue-500 cursor-pointer">
                                        Not registered yet? Sign-up here!
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </>
    );
}

export default DriverLogin;
