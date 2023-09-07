import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="">
                <nav className="relative bg-white shadow ">
                    <div className="container px-6 py-4 mx-auto">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
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
                                        onClick={() => navigate("/admin/dashboard")}
                                        className="px-3 py-2 mx-2 mt-2 cursor-pointer text-blue-800 transition-colors duration-500 transform rounded-md lg:mt-0  hover:drop-shadow-2xl hover:bg-blue-800 hover:text-golden"
                                    >
                                        Home
                                    </p>
                                    <p
                                        onClick={() => navigate("/admin/drivers")}
                                        className="px-3 py-2 mx-2 mt-2 cursor-pointer text-blue-800 transition-colors duration-500 transform rounded-md lg:mt-0 hover:drop-shadow-2xl hover:bg-blue-800 hover:text-golden"
                                    >
                                        Notifications
                                    </p>
                                    <p
                                        onClick={() => navigate("/admin/users")}
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
                                            <li>
                                                <a>Profile</a>
                                            </li>
                                            <li>
                                                <a>Signout</a>
                                            </li>
                                        </ul>
                                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                            <img
                                                src="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?w=740&t=st=1693803682~exp=1693804282~hmac=c888a79a5dcadeaaf9ce7326aa9a7dc03c6648d288b43e25d6142950b8223908"
                                                className="object-cover w-full h-full"
                                                alt="avatar"
                                            />
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
