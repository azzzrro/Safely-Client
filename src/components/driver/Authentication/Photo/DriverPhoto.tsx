import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../../services/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DriverLocationPage from "../../../../pages/driver/Authentication/DriverLocationPage";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
};

function DriverPhoto() {
    const [initial, setInitial] = useState(true);
    const [locationPage, setlocationPage] = useState(false);

    const webcamRef = useRef<Webcam | null>(null);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            driverImage: null,
        },
        validationSchema: Yup.object({
            driverImage: Yup.mixed().required("Please upload your image"),
        }),
        onSubmit: async (values) => {
            try {
                if (values.driverImage) {
                    const blob = await fetch(values.driverImage).then((res) => res.blob());
                    const file = new File([blob], "driverImage.jpeg", { type: "image/jpeg" });

                    const formData = new FormData();
                    formData.append("driverImage", file);

                    const token = localStorage.getItem("driverToken");
                    console.log(token, "tokennnnn");

                    const response = await axiosInstance.post("/driver/uploadDriverImage", formData, {
                        headers: {
                            Authorization: `bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    console.log(response);

                    if (response.data.message === "Success") {
                        toast.success("Successfully uploaded Image!");
                        // navigate("/driver/login", { state: { status: "pending" } });
                        setlocationPage(true)
                    } else {
                        toast.error(response.data.message);
                    }
                }
            } catch (error) {
                toast.error((error as Error).message);
            }
        },
    });

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const driverImage = webcamRef.current.getScreenshot();
            formik.setFieldValue("driverImage", driverImage);
        }
    }, []);

    return (
        <>
            {locationPage ? (
                <DriverLocationPage />
            ) : (
                <div className="driver-registration-container h-screen flex justify-center items-center">
                    <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                        {formik.values.driverImage ? (
                            <>
                                <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                                    <div className="flex w-full justify-center pt-10 items-center">
                                        <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-6xl user-signup-title">
                                            Please upload a clear photo of yourself!
                                        </h1>
                                    </div>
                                    <div className="hidden  md:flex md:items-center justify-center">
                                        <img
                                            style={{ height: "300px", width: "auto" }}
                                            src="../../../../public/images/20135087_6213634-removebg-preview.png"
                                        />
                                    </div>
                                </div>
                                <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                                    <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                                        <form onSubmit={formik.handleSubmit}>
                                            {/* <div className="text-center">
                                                <h1 className="text-blue-800 font-bold text-lg mb-2">Take your Photo</h1>
                                            </div> */}

                                            <div className="flex justify-center items-center">
                                                <img
                                                    className="max-h-44 w-auto rounded-3xl"
                                                    src={formik.values.driverImage}
                                                    alt=""
                                                />
                                            </div>

                                            <div className="mb-4 mt-4">
                                                <button
                                                    onClick={() => {
                                                        formik.setFieldValue("driverImage", null);
                                                    }}
                                                    className="block w-full font-bold px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                >
                                                    Retake photo
                                                </button>
                                            </div>

                                            <button
                                                type="submit"
                                                className="block w-full bg-blue-800 py-2 rounded-2xl text-golden font-semibold mb-2"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {initial ? (
                                    <>
                                        <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                                            <div className="flex w-full justify-center pt-10 items-center">
                                                <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-6xl user-signup-title">
                                                    Please upload a clear photo of yourself!
                                                </h1>
                                            </div>
                                            <div className="hidden  md:flex md:items-center justify-center">
                                                <img
                                                    style={{ height: "330px", width: "auto" }}
                                                    src="../../../../public/images/20135087_6213634-removebg-preview.png"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                                            <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                                                <form>
                                                    <div className="text-center">
                                                        <h1 className="text-blue-800 font-bold text-lg mb-2">
                                                            Take your Photo
                                                        </h1>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setInitial(false);
                                                        }}
                                                        type="submit"
                                                        className="block w-full bg-blue-800 py-2 rounded-2xl text-golden font-semibold mb-2"
                                                    >
                                                        Open Camera
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-16">
                                        <div>
                                            <Webcam
                                                className="rounded-3xl"
                                                audio={false}
                                                height={400}
                                                ref={webcamRef}
                                                width={400}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={videoConstraints}
                                            />
                                        </div>
                                        <div className="flex justify-center mt-2">
                                            <button
                                                onClick={capture}
                                                className="block w-1/3 bg-blue-800 py-2 rounded-2xl text-golden font-semibold mb-2"
                                            >
                                                Take photo
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default DriverPhoto;
