import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axiosUser from '../../../../services/axios/axiosUser'
import { toast } from "react-toastify";
import { signInWithPhoneNumber, RecaptchaVerifier, Auth, ConfirmationResult } from "firebase/auth";
import { auth } from "../../../../services/firebase";
import "./Login.scss";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { openPendingModal } from "../../../../services/redux/slices/pendingModalSlice";
import { openRejectedModal } from "../../../../services/redux/slices/rejectedModalSlice";

import { userLogin } from "../../../../services/redux/slices/userAuthSlice";

function Login() {
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const navigate = useNavigate();

    const [userData, setuserData] = useState({
        user: "",
        userToken: null,
        user_id: ""
    });

    const dispatch = useDispatch();
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
                const { data } = await axiosUser(null).post("checkLoginUser", values);
                if (data.message === "Success") {
                    sendOtp();
                    setuserData({ user: data.name, userToken: data.token, user_id: data._id });
                } else if (data.message === "Incomplete registration") {
                    toast.error("Please complete the verification!");
                    localStorage.setItem("userId", data.userId);
                    navigate("/identification");
                } else if (data.message === "Blocked") {
                    toast.info("Your account is blocked!");
                } else if (data.message === "Not verified") {
                    dispatch(openPendingModal());
                } else if (data.message === "Rejected") {
                    dispatch(openRejectedModal());
                    localStorage.setItem("userId", data.userId);
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

    const [counter, setCounter] = useState(30);

    useEffect(() => {
        if (otpInput) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, otpInput]);

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
                    dispatch(userLogin(userData))
                    toast.success("login success");
                    navigate("/");
                    localStorage.removeItem("userId")
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
                const response = await axiosUser(null).post("checkGoogleLoginUser", formData);
                if (response.data.message === "Success") {
                    toast.success("Login success!");
                    dispatch(userLogin({ user: response.data.name, userToken: response.data.token, user_id: response.data._id }));
                    localStorage.removeItem("userId")
                    navigate("/");
                } else if (response.data.message === "Incomplete registration") {
                    toast.info("Please complete the verification!");
                    localStorage.setItem("userId", response.data.userId);
                    navigate("/identification");
                } else if (response.data.message === "Not verified") {
                    dispatch(openPendingModal());
                } else if (response.data.message === "Rejected") {
                    toast.error("rejected");
                    dispatch(openRejectedModal());
                    localStorage.setItem("userId", response.data.userId);
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
            <div className="registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        <div className=" w-full pt-10 ">
                            <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-5xl user-login-title md:max-w-md">
                                Please sign in with your mobile number!
                            </h1>
                            <h1 className="text-blue-800  text-sm my-3 mx-7 md:mx-0  md:text-sm md:max-w-xs md:mt-3 user-signup-title">
                                We'll send you a One-Time-Password to your registered mobile number.
                            </h1>
                        </div>

                        <div className="hidden  md:flex md:items-center" style={{ marginTop: "-25px" }}>
                            <img
                                style={{ height: "330px", width: "auto" }}
                                src="https://d2y3cuhvusjnoc.cloudfront.net/[removal.ai]_ac4bb899-8f0d-469a-b782-3d865a890352-12291223_wavy_tech-28_single-10.png"
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
                                    <>
                                        <button
                                            onClick={otpVerify}
                                            className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                        >
                                            Verify OTP
                                        </button>

                                        <div className="text-center text-gray-500 mt-4">
                                            {counter > 0 ? (
                                                <p className="text-sm">Resend OTP in 00:{counter}</p>
                                            ) : (
                                                <p
                                                    className="text-sm text-blue-800 cursor-pointer"
                                                    onClick={() => {
                                                        setCounter(30);
                                                        sendOtp;
                                                    }}
                                                >
                                                    Resend OTP
                                                </p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                    >
                                        Send OTP
                                    </button>
                                )}

                                <div className="flex flex-col w-full border-opacity-50">
                                    <div className="divider text-xs font-medium">or sign-in using Google</div>

                                    <div className="flex justify-center items-center mb-2">
                                        <GoogleLogin shape="circle" ux_mode="popup" onSuccess={googleLogin} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <span
                                        onClick={() => navigate("/signup")}
                                        className="text-xs ml-2 hover:text-blue-500 cursor-pointer"
                                    >
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

export default Login;
