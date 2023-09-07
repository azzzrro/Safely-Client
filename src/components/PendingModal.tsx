import { useDispatch } from "react-redux";
import { closePendingModal } from "../services/redux/slices/pendingModalSlice";

export const PendingModal = () => {
  const dispatch = useDispatch()
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
                                

                                <div className="mt-2 text-center">
                                  
                                    <h1 className="text-xl font-bold">
                                    Thank you for registering with safely
                                  </h1>
                                  <h1 className="my-1">Your verification is ongoing!</h1>

                                    <div className="flex items-center justify-center">
                                    <span className="loading loading-dots loading-lg"></span>
                                </div>
                                    
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    We're in the process of verifying your account to provide the best experience. Once verified, you'll receive a verification email.<br/> Thanks for your patience.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 sm:flex sm:items-center sm:justify-center">

                                <div className="sm:flex sm:items-center ">

                                    <button 
                                    onClick={()=>dispatch(closePendingModal())}
                                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                        CLOSE
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
