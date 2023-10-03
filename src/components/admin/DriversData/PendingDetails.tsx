import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosAdmin from '../../../services/axios/axiosAdmin'
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Dialog } from "@material-tailwind/react";

const PendingDetails = () => {

    const { adminToken } = useSelector((store: any) => store.admin)

    const [acceptModal, setacceptModal] = useState(false);
    const [rejectModal, setrejectModal] = useState(false);
    const [driverData, setdriverData] = useState<any | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const { data } = await axiosAdmin(adminToken).get(`driverData?id=${id}`);
            setdriverData(data);
        } catch (error) {
            toast.error((error as Error).message)
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const verifyDriver = async () => {
        try {
            const { data } = await axiosAdmin(adminToken).get(`verifyDriver?id=${id}`);
            if (data.message === "Success") {
                toast.success("Driver verified successfully!");
                navigate("/admin/drivers");
            } else {
                toast.error("Something internal error");
            }
        } catch (error) {
            toast.error((error as Error).message)
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            reason: "",
        },
        validationSchema: Yup.object({
            reason: Yup.string().required("Please provide a valid reason!").min(5, "Enter a valid reason"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { data } = await axiosAdmin(adminToken).post(`rejectDriver?id=${id}`, values);
                if (data.message === "Success") {
                    setrejectModal(false);
                    toast.success("Driver rejected successfully!");
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
            {acceptModal && (
                <Dialog open={acceptModal} handler={verifyDriver} className='bg-transparent'>
                    <div className="relative flex justify-center">
                        <div
                            className="fixed inset-0 z-10 overflow-y-auto"
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
                                                Are you sure want to verify this registration?
                                            </h1>

                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                Make sure you double checked and validated all the documents submitted by the
                                                driver.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                                        <div className="sm:flex sm:items-center ">
                                            <button
                                                onClick={() => setacceptModal(false)}
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform  rounded-md sm:w-auto sm:mt-0  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity- "
                                            >
                                                DISMISS
                                            </button>
                                            <button
                                                onClick={() => {
                                                    verifyDriver();
                                                    setacceptModal(false);
                                                }}
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            >
                                                VERIFY DRIVER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}

            {rejectModal && (
                <Dialog open={rejectModal} handler={formik.handleSubmit} className='bg-transparent'>
                <div className="relative flex justify-center">
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto"
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
                                            Are you sure want to reject this registration?
                                        </h1>

                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Make sure you double checked and validated all the <br /> documents submitted by
                                            the driver.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mt-2 -mx-1 text-center">
                                        <h1 className="mx-1 text-sm mt-4 mb-2">Please provide the reason for rejection.</h1>
                                        <textarea
                                            name="reason"
                                            onChange={formik.handleChange}
                                            className="flex-1 block h-10 w-full px-3 py-2 mx-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                        />
                                        <div className="text-center mt-1 text-red-500">
                                            <p className="text-xs">{formik.errors.reason}</p>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                                        <div className="sm:flex sm:items-center ">
                                            <button
                                                onClick={() => setrejectModal(false)}
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform  rounded-md sm:w-auto sm:mt-0  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity- "
                                            >
                                                DISMISS
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            >
                                                REJECT DRIVER
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </Dialog>
            )}

            <div className="h-screen">
                <h1 className="mx-[7.8rem] mt-10 text-3xl font-bold text-black">Driver Details</h1>
                <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-4 mt-7 md:px-28 w-full h-full  rounded-3xl">
                    <div className=" ml-4 my-4 rounded-3xl px-3 pt-3 pb-4 h-5/6">
                        <div className="w-full h-3/6 bg-white drop-shadow-2xl rounded-3xl mb-3 overflow-hidden">
                            <img className="w-full" src={driverData?.driverImage} alt="" />
                        </div>

                        <div className="w-full md:h-52 h-3/6 bg-white rounded-3xl drop-shadow-2xl ">
                            <div className="text-center px-3 py-4 text-2xl font-bold">
                                <h1>{driverData?.name}</h1>
                            </div>
                            <div className="md:flex justify-evenly">
                                <div className="flex">
                                    <button className="btn btn-active btn-neutral btn-xs mx-2">Email</button>
                                    <h1>{driverData?.email}</h1>
                                </div>
                                <div className="flex">
                                    <button className="btn btn-active btn-neutral btn-xs mx-2">Mobile</button>
                                    <h1>{driverData?.mobile}</h1>
                                </div>
                            </div>
                            <div className="md:flex justify-evenly mt-4">
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
                                    onClick={() => setacceptModal(true)}
                                    className="btn btn-active btn-success btn-sm mx-2 text-white"
                                >
                                    accept
                                </button>
                                <button
                                    onClick={() => setrejectModal(true)}
                                    className="btn btn-active btn-error btn-sm text-white"
                                >
                                    reject
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-4 my-4 rounded-3xl px-3 py-4 h-5/6">
                        <div className="w-full h-1/3 bg-amber-200 mb-1 rounded-3xl overflow-hidden drop-shadow-2xl">
                            <img src={driverData?.aadhar.aadharImage} alt="" />
                        </div>
                        <div className="w-full h-1/3 bg-amber-200 mt-2 rounded-3xl overflow-hidden drop-shadow-2xl">
                            <img className="w-full" src={driverData?.license.licenseImage} alt="" />
                        </div>
                    </div>
                </div>
                <h1 className=" text-3xl font-bold text-black">Vehicle Details</h1>
                <div className="w-full h-fit md:flex md:justify-evenly md:px-28 py-10">
                    <div className="bg-indigo-400  drop-shadow-2xl w-1/3 h-1/2 rounded-3xl flex flex-col justify-evenly px-5 py-5">
                        <div className="">
                            <h1 className="text-xl text-white font-bold">Vehicle Registeration ID</h1>
                            <div className="text-center mt-2">
                                <h1 className="btn btn-sm btn-neutral">{driverData?.vehicle_details.registerationID}</h1>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 className="text-xl text-white font-bold">Vehicle Model</h1>
                            <div className="text-center mt-2">
                                <h1 className="btn btn-sm btn-neutral">{driverData?.vehicle_details.model}</h1>
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

export default PendingDetails;
