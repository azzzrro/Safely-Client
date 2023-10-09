import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosDriver from '../../../../services/axios/axiosDriver'
import { toast } from "react-toastify";
import DriverLocationPage from "../../../../pages/driver/Authentication/DriverLocationPage";

const Vehicle = () => {
    const [locationPage, setlocationPage] = useState(false);

    const [carImageUrl, setCarImageUrl] = useState(null);
    const [rcImageUrl, setrcImageUrl] = useState(null);


    const formik = useFormik({
        initialValues: {
            registerationID: "",
            model: "",
            carImage: null,
            rcImage: null,
        },
        validationSchema: Yup.object({
            registerationID: Yup.string().required("Please enter the registeration ID").min(12, "Enter a valid ID"),
            model: Yup.string().required("Choose the vehicle model"),
            carImage: Yup.string().required("Upload the car image"),
            rcImage: Yup.string().required("Upload the RC image"),
        }),
        onSubmit: async (values) => {
            try {

                const driverId = localStorage.getItem("driverId");

                const { data } = await axiosDriver(null).post(`vehicleDetails?driverId=${driverId}`, values, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (data.message === "Success") {
                    toast.success("Vehicle details submitted successfully!")
                    setlocationPage(true)
                } else {
                    toast.error(data.message)
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        },
    })



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setImageUrl: any) => {
        const file = e.currentTarget.files?.[0];

        if (file) {
            formik.setFieldValue(fieldName, file)

            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        } else {
            setImageUrl(null);
            formik.setFieldValue(fieldName, null);
        }
    };


    return (
        <>
            {locationPage ? (
                <DriverLocationPage />
            ) : (
                <div className="driver-registration-container h-screen flex justify-center items-center">
                    <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                        <div className="relative overflow-hidden h-full sm:pl-14 md:pl-13 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                            <div className="flex w-full justify-center pt-10 items-center">
                                <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0 md:mt-4  md:text-5xl user-signup-title">
                                    Please submit your vehicle details!
                                </h1>
                            </div>
                            <div className="hidden  md:flex md:items-center justify-center">
                                <img
                                    style={{ height: "320px", width: "auto" }}
                                    src="https://img.freepik.com/free-vector/files-sent-concept-illustration_114360-3020.jpg?w=740&t=st=1693677666~exp=1693678266~hmac=d2b8470cda1668f0b6b107b888297653d914b10c633cef1bec894126613dacd1"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 mx-8 md:px-0 items-center">
                            <div className="user-signup-form md:w-full px-9 py-8  bg-white drop-shadow-xl">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="md:flex">
                                        <div className="text-left pr-5">
                                            <h1 className="text-blue-800 font-bold text-xs ">Vehicle Registration ID</h1>

                                            <input
                                                className="pl-2 outline-none border-b w-full mb-3"
                                                type="text"
                                                name="registerationID"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            ></input>
                                            <p className="text-xs mb-4 text-red-500">
                                                {formik.touched.registerationID && formik.errors.registerationID}
                                            </p>
                                        </div>

                                        <div className="text-left">
                                            <select
                                                name="model"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="select w-full md:relative md:bottom-4 max-w-xs text-blue-800"
                                            >
                                                <option disabled selected>
                                                    Select the model
                                                </option>
                                                <option>Standard</option>
                                                <option>Sedan</option>
                                                <option>SUV</option>
                                                <option>Luxuary</option>
                                            </select>
                                            <p className="text-xs mb-4 text-red-500">
                                                {formik.touched.model && formik.errors.model}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:flex">
                                        <div className="text-left md:pr-3">
                                            <h1 className="text-blue-800 font-bold text-xs mb-1">Upload the RC Image</h1>
                                            <div className="mb-5 mt-3">
                                                <input
                                                    type="file"
                                                    name="rcImage"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'rcImage', setrcImageUrl)}

                                                    className="block w-full px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border
                                         border-gray-200 rounded-2xl file:bg-gray-200 file:text-gray-700 file:text-sm 
                                         file:px-4 file:py-0.5 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-500
                                          dark:text-gray-800 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none 
                                          focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:bg-gray-300 dark:focus:border-blue-300"
                                                />
                                                <p className="text-xs my-2 text-red-500">
                                                    {formik.touched.rcImage && formik.errors.rcImage}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-left">
                                            <h1 className="text-blue-800 font-bold text-xs mb-1">
                                                Upload the Vehicle image
                                            </h1>
                                            <div className="mb-5 mt-3">
                                                <input
                                                    type="file"
                                                    name="carImage"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'carImage', setCarImageUrl)} className="block w-full px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border
                                         border-gray-200 rounded-2xl file:bg-gray-200 file:text-gray-700 file:text-sm 
                                         file:px-4 file:py-0.5 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-500
                                          dark:text-gray-800 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none 
                                          focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:bg-gray-300 dark:focus:border-blue-300"
                                                />
                                                <p className="text-xs my-2 text-red-500">
                                                    {formik.touched.carImage && formik.errors.carImage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:flex md:justify-between mb-2">
                                        <div>
                                            {rcImageUrl && (
                                                <img
                                                    className="rounded-xl"
                                                    src={rcImageUrl}
                                                    alt="Car"
                                                    width="170"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            {carImageUrl && (
                                                <img
                                                    className="rounded-xl"
                                                    src={carImageUrl}
                                                    alt="Car"
                                                    width="170"
                                                />
                                            )}
                                        </div>
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
                    </div>
                </div>
            )}
        </>
    );
};

export default Vehicle;
