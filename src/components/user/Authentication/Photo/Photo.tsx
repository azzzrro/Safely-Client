import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosUser from '../../../../services/axios/axiosUser'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { openPendingModal } from "../../../../services/redux/slices/pendingModalSlice";


const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
};

function Photo() {
    const [initial, setInitial] = useState(true);
    const webcamRef = useRef<Webcam | null>(null);

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userImage: null,
        },
        validationSchema: Yup.object({
            userImage: Yup.mixed().required("Please upload your image"),
        }),
        onSubmit: async (values) => {
            try {
                if (values.userImage) {
                    const blob = await fetch(values.userImage).then((res) => res.blob());
                    const file = new File([blob], "userImage.jpeg", { type: "image/jpeg" });
                    const formData = new FormData();
                    formData.append("userImage", file);
                    const userId = localStorage.getItem("userId");
                    console.log(userId, "tokennnnn");

                    const response = await axiosUser(null).post(`uploadUserImage?userId=${userId}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    console.log(response);

                    if (response.data.message === "Success") {
                        navigate("/login");
                        dispatch(openPendingModal())
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
            const userImage = webcamRef.current.getScreenshot();
            formik.setFieldValue("userImage", userImage);
        }
    }, []);

    return (
        <>
            <div>
                <div className="registration-container h-screen flex justify-center items-center">
                    <div className="w-5/6 md:w-4/6 md:h-4/5 md:flex justify-center items-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                        {formik.values.userImage ? (
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
                                            src="../../../../public/images/[removal.ai]_70cfeada-8ff0-4248-9357-500daaf02a6b-12291262_wavy_tech-30_single-11.png"
                                        />
                                    </div>
                                </div>
                                <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                                    <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="text-left">
                                                <h1 className="text-blue-800 font-bold text-lg mb-2">Take your Photo</h1>
                                            </div>

                                            <div className="flex justify-center items-center">
                                                <img
                                                    className="max-h-44 w-auto rounded-3xl"
                                                    src={formik.values.userImage}
                                                    alt=""
                                                />
                                            </div>

                                            <div className="mb-4 mt-4">
                                                <button
                                                    onClick={() => {
                                                        formik.setFieldValue("userImage", null);
                                                    }}
                                                    className="block w-full px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
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

                                            {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span> */}
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
                                                    src="../../../../public/images/[removal.ai]_70cfeada-8ff0-4248-9357-500daaf02a6b-12291262_wavy_tech-30_single-11.png"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                                            <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                                                <form>
                                                    <div className="text-left">
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
                                    <div className="mt-4">
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
            </div>
        </>
    );
}

export default Photo;
