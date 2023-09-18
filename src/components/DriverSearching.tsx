import { useDispatch } from "react-redux";
import { cancelSearching } from "../services/redux/slices/driverSearchSlice";
import './user/Home/Home.scss'

const DriverSearching = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div x-data={{ isOpen: true }} className="relative flex justify-center">
                <div
                    className="fixed inset-0 z-10 overflow-y-auto bg-opacity-50 bg-black"
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
                                    <h1 className="text-xl font-bold">Sit back and relax!</h1>
                                    <h1 className="my-1">We're connecting with the best drivers in your area.</h1>

                                    <div className="flex h-20 w-full items-center justify-center">
                                        {/* <span className="loading loading-ring loading-lg"></span> */}

                                        <div className="ping h-20 w-20"></div>
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Your safety and satisfaction are paramount to us. We appreciate your patience as we
                                        carefully select the perfect driver to ensure a smooth journey for you..
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                                <div className="sm:flex sm:items-center ">
                                    <button
                                        onClick={() => dispatch(cancelSearching())}
                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-black border border-black hover:bg-black hover:text-white capitalize transition-colors duration-300 transform rounded-md sm:w-auto sm:mt-0 focus:outline-none "
                                    >
                                        CANCEL RIDE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverSearching;
