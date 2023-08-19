function DriverIdentification() {
    return (
        <>
            <div className="driver-registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        <div className="flex w-full justify-center pt-10 items-center">
                            <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0 md:mt-4  md:text-5xl user-signup-title">
                                Please enter your identification details!
                            </h1>
                        </div>
                        <div className="hidden  md:flex md:items-center justify-center" style={{marginTop:"-30px"}}>
                            <img
                                style={{ height: "380px", width: "auto" }}
                                src="../../../../public/images/[removal.ai]_22bf0d53-d053-4b6d-9cd1-92bd49f0a131-5214651.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                        <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                            <form>
                                <div className="text-left">
                                    <h1 className="text-blue-800 font-bold text-lg ">Enter your Aadhar ID</h1>
                                </div>
                                
                                <input className="pl-2 outline-none border-b w-full mb-3" type="text" name="" id="" />
                                <div className="text-left">
                                    <h1 className="text-blue-800 font-bold text-lg mb-1">Upload the ID image</h1>
                                </div>
                                <div className="mb-7 mt-3">
                                    <input
                                        type="file"
                                        className="block w-full px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border
                                         border-gray-200 rounded-2xl file:bg-gray-200 file:text-gray-700 file:text-sm 
                                         file:px-4 file:py-0.5 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-500
                                          dark:text-gray-800 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none 
                                          focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:bg-gray-300 dark:focus:border-blue-300"
                                    />
                                </div>


                                <div className="text-left">
                                    <h1 className="text-blue-800 font-bold text-lg ">Enter your License ID</h1>
                                </div>
                                
                                <input className="pl-2 outline-none border-b w-full mb-3" type="text" name="" id="" />
                                <div className="text-left">
                                    <h1 className="text-blue-800 font-bold text-lg mb-1">Upload the ID image</h1>
                                </div>
                                <div className="mb-6 mt-3">
                                    <input
                                        type="file"
                                        className="block w-full px-3 py-1.5 mt-2 text-sm text-gray-600 bg-white border
                                         border-gray-200 rounded-2xl file:bg-gray-200 file:text-gray-700 file:text-sm 
                                         file:px-4 file:py-0.5 file:border-none file:rounded-full dark:file:bg-gray-200 dark:file:text-gray-500
                                          dark:text-gray-800 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none 
                                          focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:bg-gray-300 dark:focus:border-blue-300"
                                    />
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
        </>
    );
}

export default DriverIdentification;
