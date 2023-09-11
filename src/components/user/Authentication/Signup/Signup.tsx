import "./Signup.scss";
import React, { useEffect } from "react";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupIcon from "@mui/icons-material/Group";
import { useState } from "react";
import axiosInstance from "../../../../services/axios";
import "../../Authentication/Otp/Otp.scss";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber, RecaptchaVerifier, Auth, ConfirmationResult } from "firebase/auth";
import { auth } from "../../../../services/firebase";
import Identificationpage from "../../../../pages/user/Authentication/Identificationpage";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {



    const [counter, setCounter] = useState(30);

    const navigate = useNavigate();

    const [otpPage, setOtpPage] = useState(false);
    const [identificationPage, setIdentificationPage] = useState(false);

    useEffect(() => {
        if(otpPage){
            counter  > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter,otpPage]);

    const [otp, setOtp] = useState<number>(0);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    
    useEffect(()=>{
        console.log(otp);
        
        },[otp])


    useEffect(() => {
        setOtpPage(false);
        setIdentificationPage(false);
    }, []);

    //Formik-Yup setup

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            re_password: "",
            reffered_Code: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "Type a valid name").required("Please enter a name"),
            email: Yup.string().email("Please enter a valid email").required("Please enter an email"),
            mobile: Yup.string().length(10, "Please enter a valid number").required("Please enter an email"),
            password: Yup.string()
                .matches(/^(?=.*[A-Z])/, "Must include One uppercase letter")
                .matches(/^(?=.*\d)/, "Must include one digit")
                .required("Passowrd is required"),
            re_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password must match")
                .required("Please re-enter the password"),
            reffered_Code: Yup.string()
                .min(5, "Enter a valid code")
                .matches(/^(?=.*\d)/, "Enter a valid code"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await signupHandle(values);
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Handle-OTP change

    const handleOtpChange = (index: number, newValue: number) => {
        const newOtp = [...otp.toString()];
        newOtp[index] = newValue.toString();
        setOtp(parseInt(newOtp.join("")));
    };

    // check-user API

    const signupHandle = async (formData: any) => {
        try {
            const { data } = await axiosInstance.post(`/checkUser`, formData);

            if (data.message === "User login") {
                toast.info("User Already registered! Please Login to continue");
                navigate("/login");
            } else if (data.message === "User must fill documents") {
                toast.info(`User Already registered! Please verify the documents`);
                console.log(data);
                localStorage.setItem("userId", data.userId);
                setIdentificationPage(true);
            } else {
                sendOtp();
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    // OTP and Captcha-verification

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
        try {
            onCaptchaVerify(auth);
            const number = "+91" + formik.values.mobile;
            const appVerifier = window.recaptchaVerifier;
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

    // signup-form submition API

    const registerSubmit = async () => {
        try {
            const response = await axiosInstance.post(`/register`, formik.values);
            if (response.data.message === "Success") {
                toast.success("OTP verified successfully");
                localStorage.setItem("userId", response.data.userId);
                setIdentificationPage(true);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    // style variables

    const iconsColor = "text-gray-400";
    const with_error_class = "pl-2 outline-none border-b border-red-400 w-full";
    const without_error_class = "pl-2 outline-none border-b w-full";

    //JSX-element

    return (
        <>
            {identificationPage ? (
                <Identificationpage />
            ) : (
                <>
                    <div className="registration-container h-screen flex justify-center items-center">
                        <div className="registration-container-second md:w-4/6 w-5/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                            {otpPage ? (
                                <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16  md:w-2/3 i justify-around items-center mb-3 md:m-0">
                                    <div className=" w-full justify-center pt-10 items-center">
                                        <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-6xl user-otp-title">
                                            don’t share your secret OTP!
                                        </h1>
                                        <h1 className="text-blue-800 font-normal text-sm my-3 mx-7 md:mx-0  md:text-lg md:mt-3 user-signup-title">
                                            Please enter the One-Time-Password sent to your registered mobile number
                                        </h1>
                                    </div>
                                    <div className="sm:hidden md:block">
                                        <img
                                            style={{ height: "290px", width: "auto" }}
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
                                            <div className="flex justify-center items-center mb-5">
                                                <h1 className="text-gray-800 font-bold text-xl text-center">
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
                                            <div className="text-center text-gray-500 mt-4">
                                                {counter > 0 ? (
                                                    <p className="text-sm">Resend OTP in 00:{counter}</p>
                                                ) : (
                                                    <p
                                                        className="text-sm text-blue-800 cursor-pointer"
                                                        onClick={() => {
                                                            setCounter(30);
                                                            sendOtp();
                                                        }}
                                                    >
                                                        Resend OTP
                                                    </p>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex md:w-1/2 justify-center pb-10 md:py-10 items-center">
                                    <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <PersonIcon className={iconsColor} />
                                                <input
                                                    className={
                                                        formik.touched.name && formik.errors.name
                                                            ? with_error_class
                                                            : without_error_class
                                                    }
                                                    type="text"
                                                    name="name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    id=""
                                                    placeholder="Full name"
                                                />
                                            </div>
                                            {formik.touched.name && formik.errors.name && (
                                                <p className="form-error-p-tag">{formik.errors.name}</p>
                                            )}
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <AlternateEmailIcon className={iconsColor} />
                                                <input
                                                    className={
                                                        formik.touched.email && formik.errors.email
                                                            ? with_error_class
                                                            : without_error_class
                                                    }
                                                    type="text"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    id=""
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                            {formik.touched.email && formik.errors.email && (
                                                <p className="form-error-p-tag">{formik.errors.email}</p>
                                            )}
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <SmartphoneIcon className={iconsColor} />

                                                <input
                                                    className={
                                                        formik.touched.mobile && formik.errors.mobile
                                                            ? with_error_class
                                                            : without_error_class
                                                    }
                                                    type="text"
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
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <VpnKeyIcon className={iconsColor} />
                                                <input
                                                    className={
                                                        formik.touched.password && formik.errors.password
                                                            ? with_error_class
                                                            : without_error_class
                                                    }
                                                    type="password"
                                                    name="password"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    id=""
                                                    placeholder="Password"
                                                />
                                            </div>
                                            {formik.touched.password && formik.errors.password && (
                                                <p className="form-error-p-tag">{formik.errors.password}</p>
                                            )}
                                            <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                                <VpnKeyIcon className={iconsColor} />
                                                <input
                                                    className={
                                                        formik.touched.re_password && formik.errors.re_password
                                                            ? with_error_class
                                                            : without_error_class
                                                    }
                                                    type="password"
                                                    name="re_password"
                                                    value={formik.values.re_password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    id=""
                                                    placeholder="Retype-Password"
                                                />
                                            </div>
                                            {formik.touched.re_password && formik.errors.re_password && (
                                                <p className="form-error-p-tag">{formik.errors.re_password}</p>
                                            )}
                                            <div className="flex items-center  py-2 px-3 rounded-2xl">
                                                <GroupIcon className={iconsColor} />
                                                <input
                                                    className={
                                                        formik.touched.reffered_Code && formik.errors.reffered_Code
                                                            ? with_error_class
                                                            : without_error_class
                                                    }
                                                    type="text"
                                                    name="reffered_Code"
                                                    value={formik.values.reffered_Code}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    id=""
                                                    placeholder="Referral Code"
                                                />
                                            </div>
                                            {formik.touched.reffered_Code && formik.errors.reffered_Code && (
                                                <p className="form-error-p-tag">{formik.errors.reffered_Code}</p>
                                            )}
                                            <button
                                                type="submit"
                                                className="block w-full bg-blue-800 py-2 rounded-2xl text-golden font-semibold mt-3 mb-2"
                                            >
                                                Register Now
                                            </button>
                                            <div className="text-center">
                                                <span
                                                    onClick={() => {
                                                        navigate("/login");
                                                    }}
                                                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                                                >
                                                    Already a member? Login here
                                                </span>
                                            </div>
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
};

export default Signup;
