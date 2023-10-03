import { useState } from "react";
import axiosUser from '../../../../services/axios/axiosUser'
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Identification.scss";
import Photopage from "../../../../pages/user/Authentication/Photopage";
import { toast } from "react-toastify";

function Identification() {
    const [photoPage, setphotoPage] = useState(false);
    // const [idImage, setIdImage] = useState<File | null>(null);
    // const [chooseID, setchooseID] = useState("");
    // const [enterID, setenterID] = useState("");

    // const handleImageUpload = (file: File) => {
    //     setIdImage(file);
    // };

    // useEffect(()=>{
    //     console.log(chooseID);
    // },[chooseID])

    const validationSchema = Yup.object().shape({
        idImage: Yup.mixed().required("ID Image is required"),
        chooseID: Yup.string().required("Choose an ID"),
        enterID: Yup.string().required("Enter the ID"),
    });

    const formik = useFormik({
        initialValues: {
            idImage: null,
            chooseID: "",
            enterID: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleUpload(values);
        },
    });

    const handleUpload = (formData: any) => {
        // const formData = new FormData();
        // formData.append("idImage", idImage as File);
        // formData.append("chooseID", chooseID);
        // formData.append("enterID", enterID);

        const userId = localStorage.getItem("userId");

        axiosUser(null)
            .post(`identification?userId=${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.data.message === "Success") {
                    setphotoPage(true);
                    toast.success("Identification details submitted successfully!")
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
    };

    return (
        <>
            {photoPage ? (
                <Photopage />
            ) : (
                <div className="registration-container h-screen flex justify-center items-center">
                    <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                        <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                            <div className="flex w-full justify-center pt-10 items-center">
                                <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-6xl user-signup-title">
                                    please verify so we can assure safety!
                                </h1>
                            </div>
                            <div className="hidden  md:flex md:items-center justify-center">
                                <img
                                    style={{ height: "330px", width: "auto" }}
                                    src="../../../../public/images/[removal.ai]_606e2e73-3702-4d01-82bb-d822491713e8-12290995_wavy_tech-17_single-04.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                            <div className="user-signup-form md:w-9/12 px-9 py-8  bg-white drop-shadow-xl">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="text-left">
                                        <h1 className="text-blue-800 font-bold text-lg mb-2">Choose your ID</h1>
                                    </div>
                                    <div className="flex mb-3 mt-4">
                                        <input
                                            type="radio"
                                            name="chooseID"
                                            className="radio"
                                            value="Aadhar"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <h1 className="ml-3">Aadhar ID</h1>
                                    </div>
                                    <div className="flex mb-5">
                                        <input
                                            type="radio"
                                            name="chooseID"
                                            className="radio"
                                            value="License"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <h1 className="ml-3">License ID</h1>
                                    </div>
                                    {formik.touched.chooseID && formik.errors.chooseID && (
                                        <p className="form-error-p-tag-identification">{formik.errors.chooseID}</p>
                                    )}
                                    <div className="text-left">
                                        <h1 className="text-blue-800 font-bold text-lg mb-2">Enter your ID</h1>
                                    </div>
                                    <input
                                        className={
                                            formik.touched.enterID && formik.errors.enterID
                                                ? `pl-2 outline-none border-red-400 border-b w-full mb-6`
                                                : `pl-2 outline-none  border-b w-full mb-6`
                                        }
                                        type="text"
                                        name="enterID"
                                        id=""
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.enterID}
                                    />
                                    {formik.touched.enterID && formik.errors.enterID && (
                                        <p className="form-error-p-tag-identification">{formik.errors.enterID}</p>
                                    )}
                                    <div className="text-left">
                                        <h1 className="text-blue-800 font-bold text-lg mb-2">Upload the ID image</h1>
                                    </div>
                                    <div className="mb-4 mt-4">
                                        <input
                                            type="file"
                                            name="idImage"
                                            onChange={(e) => {
                                                formik.setFieldValue("idImage", e.currentTarget.files?.[0]);
                                            }}
                                            accept="image/*"
                                            className="block w-full px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border
                                         border-gray-200 rounded-2xl file:bg-gray-200 file:text-gray-700 file:text-sm 
                                         file:px-4 file:py-0.5 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-500
                                          dark:text-gray-800 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none 
                                          focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:bg-gray-300 dark:focus:border-blue-300"
                                        />
                                        {formik.touched.idImage && formik.errors.idImage && (
                                            <p className="form-error-p-tag-identification-image mb-6">
                                                {formik.errors.idImage}
                                            </p>
                                        )}
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
                    </div>
                </div>
            )}
        </>
    );
}

export default Identification;
