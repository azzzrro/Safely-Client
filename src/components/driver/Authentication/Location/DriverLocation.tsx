function DriverLocation() {
    return (
        <>
            <div className="driver-registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        <div className="flex w-full justify-center pt-10 items-center">
                            <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0 md:mt-4  md:text-6xl user-signup-title">
                                Choose your Location!
                            </h1>
                        </div>
                        <div className="hidden  md:flex md:items-center justify-center">
                            <img
                                style={{ height: "300px", width: "auto" }}
                                src="../../../../public/images/[removal.ai]_e8b3373d-808f-43b2-85d2-374ab65847e9-11641795_4752200.png"
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2 justify-center pb-10 md:py-10 px-2 md:px-0 items-center">
                        <form>
                            <div className="user-signup-form w-96 h-96 px-9 py-8  bg-white drop-shadow-xl">
                                <div className="mb-4 mt-4">

                                </div>
                            </div>
                            <div className="flex mt-6 justify-center" >
                                
                            <button
                                type="submit"
                                className="block w-1/2 bg-blue-800 py-2 rounded-2xl text-golden font-semibold mb-2"
                            >
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DriverLocation;
