import { useDispatch } from "react-redux";
import { closeRejectedModal } from "../services/redux/slices/rejectedModalSlice";
import { useNavigate } from "react-router-dom";

export const RejectedModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return (
        <>
            <div x-data={{ isOpen: true }} className="relative flex justify-center">
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
                                <div className="my-2 text-center">
                                    <h1 className="text-xl font-bold">Your Registration Has Been Rejected!</h1>

                                    <div className="flex items-center justify-center mt-2">
                                    <img width="55" height="55" src="https://img.icons8.com/arcade/64/--broken-heart.png" alt="--broken-heart"/>
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    We regret to inform you that your registeration has been rejected. We appreciate your interest in joining our service.<br/> Thanks for your patience.
                                    </p>
                                    <p className="text-sm mt-2">Please check your mail for further information</p>
                                </div>
                            </div>

                            <div className="mt-3 sm:flex sm:items-center sm:justify-center">
                                <div className="sm:flex sm:items-center ">
                                    <button
                                        onClick={() => dispatch(closeRejectedModal())}
                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform  rounded-md sm:w-auto sm:mt-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    >
                                        CLOSE
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/driver/identification')
                                            dispatch(closeRejectedModal())
                                        }
                                        }
                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    >
                                        RE-SUBMIT
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
