import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../../services/redux/slices/userAuthSlice";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector((store: any) => store.user.user);

    return (
        <>
            <div className="">
                <nav className="relative bg-white shadow ">
                    <div className="container px-6 py-4 mx-auto">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className="flex items-center justify-between">
                                <div 
                                onClick={()=>navigate('/')}
                                className="flex items-center cursor-pointer">
                                    {/* <img src="../../../public/images/Frame 7.png" alt="" style={{height:"2.5rem",width:"auto"}} /> */}
                                    <h1 className="text-blue-800 text-3xl px-2 font-bold">Safely</h1>
                                </div>

                                <div className="flex lg:hidden">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        type="button"
                                        className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                        aria-label="toggle menu"
                                    >
                                        {isOpen ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                                    isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
                                }`}
                            >
                                <div className="flex flex-col text-gol font-medium -mx-6 lg:flex-row lg:items-center lg:mx-1">
                                    <p
                                        onClick={() => navigate("/")}
                                        className="px-3 py-2 mx-2 mt-2 cursor-pointer text-blue-800 transition-colors duration-500 transform rounded-md lg:mt-0  hover:drop-shadow-2xl hover:bg-blue-800 hover:text-golden"
                                    >
                                        Home
                                    </p>
                                    <p
                                        onClick={() => navigate("/rides")}
                                        className="px-3 py-2 mx-2 mt-2 cursor-pointer text-blue-800 transition-colors duration-500 transform rounded-md lg:mt-0  hover:drop-shadow-2xl hover:bg-blue-800 hover:text-golden"
                                    >
                                        Rides
                                    </p>
                                    <p
                                        onClick={() => navigate("/")}
                                        className="px-3 py-2 mx-2 mt-2 cursor-pointer text-blue-800 transition-colors duration-500 transform rounded-md lg:mt-0 hover:drop-shadow-2xl hover:bg-blue-800 hover:text-golden"
                                    >
                                        Notifications
                                    </p>
                                    <p
                                        onClick={()=>navigate('/')}
                                        className="px-3 py-2 mx-2 mt-2 cursor-pointer text-blue-800 transition-colors duration-500 transform rounded-md lg:mt-0  hover:drop-shadow-2xl hover:bg-blue-800 hover:text-golden"
                                    >
                                        Support
                                    </p>
                                </div>

                                <div className="flex items-center mt-4 lg:mt-0">
                                    <button
                                        type="button"
                                        className="flex items-center focus:outline-none dropdown dropdown-bottom dropdown-end"
                                        aria-label="toggle profile dropdown"
                                        tabIndex={0}
                                    >
                                        <ul
                                            tabIndex={0}
                                            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                                        >
                                            {user ? (
                                                <>
                                                    <li onClick={()=>navigate('/profile')}>
                                                        <a>Profile</a>
                                                    </li>
                                                    <li onClick={() => dispatch(userLogout())}>
                                                        <a>Signout</a>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li
                                                    onClick={()=>navigate('/login')}
                                                    >
                                                        <a>Login</a>
                                                    </li>
                                                    <li
                                                    onClick={()=>navigate('/signup')}
                                                    >
                                                        <a>Signup</a>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                        <div className="w-8 h-8">
                                            <div className="avatar placeholder object-cover w-full h-full">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                                    <span className="text-sm">A</span>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
