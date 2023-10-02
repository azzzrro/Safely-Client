import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const VerifiedDetails = () => {
    const [statusModal, setstatusModal] = useState(false);
    const [driverData, setdriverData] = useState<any | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get(`/admin/driverData?id=${id}`);
            setdriverData(data);
        };
        getData();
    }, []);

    const formik = useFormik({
        initialValues: {
            reason: "",
            status: "",
        },
        validationSchema: Yup.object({
            reason: Yup.string().required("Please provide a valid reason!").min(5, "Enter a valid reason"),
            status: Yup.string().required("Please select the status"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { data } = await axiosInstance.post(`/admin/updateDriverStatus?id=${id}`, values);
                if (data.message === "Success") {
                    setstatusModal(false);
                    toast.success("Status updated successfully!");
                    navigate("/admin/drivers");
                } else {
                    toast.error("Something internal error");
                }
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            {statusModal && (
                <div className="relative flex justify-center">
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto bg-opacity-40 bg-black"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>

                            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-righ  sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                                <div>
                                    <div className="mt-2 text-center">
                                        <h1 className="text-xl font-bold">
                                            Are you sure want to change the
                                            <br /> status of this driver?
                                        </h1>

                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Make sure you double checked and validated all the <br /> stats of the driver so
                                            far.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mt-2 -mx-1 text-center">
                                        <div>
                                            <select
                                                name="status"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="select select-info select-sm w-full max-w-xs"
                                            >
                                                <option disabled selected>
                                                    Select the updated status
                                                </option>
                                                <option>Block</option>
                                                <option>Warning</option>
                                                <option>Good</option>
                                            </select>
                                        </div>
                                        <div className="text-center mt-1 text-red-500">
                                            <p className="text-xs">{formik.touched.status && formik.errors.status}</p>
                                        </div>
                                        <h1 className="mx-1 text-sm mt-4 mb-2">Please provide the reason.</h1>
                                        <textarea
                                            name="reason"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            className="flex-1 block h-10 w-full px-3 py-2 mx-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                        />
                                        <div className="text-center mt-1 text-red-500">
                                            <p className="text-xs">{formik.touched.reason && formik.errors.reason}</p>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                                        <div className="sm:flex sm:items-center ">
                                            <button
                                                onClick={() => setstatusModal(false)}
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform  rounded-md sm:w-auto sm:mt-0  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity- "
                                            >
                                                DISMISS
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            >
                                                UPDATE STATUS
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-screen">
                <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-4 md:px-28 w-full h-full  rounded-3xl">
                    <div className=" ml-4 my-4 rounded-3xl px-3 pt-3 pb-4 h-5/6">
                        <div className="w-full h-3/6 bg-white drop-shadow-2xl rounded-3xl mb-3 overflow-hidden">
                            <img className="w-full" src={driverData?.driverImage} alt="" />
                        </div>

                        <div className="w-full md:h-fit py-5 px-4 h-3/6 bg-white rounded-3xl drop-shadow-2xl ">
                            <div className="text-center px-3  text-2xl font-bold">
                                <h1>{driverData?.name}</h1>
                            </div>
                            <div className="flex flex-col gap-3 mt-5 items-center">
                                <div className="flex">
                                    <button className="btn btn-active btn-neutral btn-xs mx-2">Email</button>
                                    <h1>{driverData?.email}</h1>
                                </div>
                                <div className="flex">
                                    <button className="btn btn-active btn-neutral btn-xs mx-2">Mobile</button>
                                    <h1>{driverData?.mobile}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 items-center mt-3 mb-3">
                                <div className="flex">
                                    <button className="btn btn-active btn-neutral btn-xs mx-2">Aadhar Id</button>
                                    <h1>{driverData?.aadhar.aadharId}</h1>
                                </div>
                                <div className="flex">
                                    <button className="btn btn-active btn-neutral btn-xs mx-2">License id</button>
                                    <h1>{driverData?.license.licenseId}</h1>
                                </div>
                            </div>

                            <div className="md:flex justify-center items-center h-2/5">
                                <button
                                    onClick={() => setstatusModal(true)}
                                    className="btn btn-active btn-accent btn-sm text-white"
                                >
                                    UPDATE ACCOUNT STATUS
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-4 my-4 rounded-3xl px-3 py-4 h-5/6">
                        <div className="w-full h-16 bg-indigo-400 mb-3 rounded-3xl overflow-hidden drop-shadow-2xl">
                            <div className="flex justify-center items-center h-full w-full">
                                <h1 className="font-bold mr-3 text-white">
                                    ACCOUNT STATUS
                                </h1>
                                {driverData?.account_status === "Good" &&
                                <h1 className="btn btn-sm btn-success text-white">{driverData?.account_status}</h1>
                                }
                                {driverData?.account_status === "Blocked" &&
                                <h1 className="btn btn-sm btn-error text-white">{driverData?.account_status}</h1>
                                }
                                {driverData?.account_status === "Warning" &&
                                <h1 className="btn btn-sm btn-warning text-white">{driverData?.account_status}</h1>
                                }
                            </div>
                        </div>
                        <div className="w-full h-1/3 bg-amber-200 mb-1 rounded-3xl overflow-hidden drop-shadow-2xl">
                            <img src={driverData?.aadhar.aadharImage} alt="" />
                        </div>
                        <div className="w-full h-1/3 bg-amber-200 mt-2 rounded-3xl overflow-hidden drop-shadow-2xl">
                            <img className="w-full" src={driverData?.license.licenseImage} alt="" />
                        </div>
                    </div>
                </div>
                <h1 className=" text-3xl mt-10 font-bold text-black">Vehicle Details</h1>
                <div className="w-full h-fit md:flex md:justify-evenly md:px-28 py-10">
                    <div className="bg-indigo-400  drop-shadow-2xl w-1/3 h-1/2 rounded-3xl flex flex-col justify-evenly px-5 py-5">
                        <div className="my-2">
                            <h1 className="btn btn-sm btn-neutral mb-1">Vehicle Registeration ID</h1>
                            <div className="text-center my-3">
                                <h1 className="text-white text-xl">{driverData?.vehicle_details.registerationID}</h1>
                            </div>
                        </div>
                        <div className="">
                            <h1 className="btn btn-sm btn-neutral">Vehicle Model</h1>
                            <div className="text-center mt-3">
                                <h1 className="text-white text-xl">{driverData?.vehicle_details.model}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="drop-shadow-2xl h-fit mb-1 rounded-3xl overflow-hidden">
                            <img className="w-full" src={driverData?.vehicle_details.rcImageUrl} alt="" />
                        </div>
                        <div className="drop-shadow-2xl h-fit mt-2 rounded-3xl overflow-hidden">
                            <img src={driverData?.vehicle_details.carImageUrl} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifiedDetails;
