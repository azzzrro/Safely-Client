import SmartphoneIcon from "@mui/icons-material/Smartphone";
import GoogleIcon from "@mui/icons-material/Google";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";

function DriverLogin() {
    const iconsColor = "text-gray-400";
    return (
        <>
            <div className="driver-registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        <div className=" w-full pt-10 ">
                            <h1 className="text-blue-800 font-bold md:mt-4 text-4xl mx-7 md:mx-0  md:text-6xl user-signup-title md:max-w-sm">
                                Sit back and relax!
                            </h1>
                            <h1 className="text-blue-800 font-bold text-sm my-3 mx-7 md:mx-0  md:text-xl md:mt-3 user-signup-title">
                                Verification in progress. We’ll inform you after the verification.
                            </h1>
                        </div>
                        <div className="hidden  md:flex md:items-center" style={{marginTop:"-30px"}}>
                            <img
                                style={{ height: "300px", width: "auto" }}
                                src="../../../public/images/[removal.ai]_4c7ba0ac-90b6-43f1-b097-932d54d9f8b0-sssdsdsd.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2 justify-center  pb-10 md:py-10 items-center">
                        <div className="user-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                            <form>
                                <div className="text-center">
                                    <h1 className="text-gray-800 font-bold text-2xl mb-5">Welcome back!</h1>
                                </div>

                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <SmartphoneIcon className={iconsColor} />

                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Mobile number"
                                    />
                                </div>

                                {/* <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <VpnKeyIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Password"
                                    />
                                </div> */}

                                <div className="my-4 px-2">
                                    <HStack>
                                        <PinInput otp placeholder="">
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                        </PinInput>
                                    </HStack>
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2"
                                >
                                    Send OTP
                                </button>

                                <div className="flex items-center mt-3">
                                    <div className="flex items-center justify-center w-full bg-blue-800 py-1.5 rounded-2xl text-golden font-semibold mb-2">
                                        <GoogleIcon className="text-golden" style={{ fontSize: "18px" }} />
                                        <h1 className="ml-1">Continue with Google</h1>
                                    </div>
                                </div>
                                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Resend OTP</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DriverLogin;
