import "./Otp.scss";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";

function Otp() {
    return (
        <>
            <div className="registration-container h-screen flex justify-center items-center">
                <div className="registration-container-second md:w-4/6 w-5/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16  md:w-2/3 i justify-around items-center mb-3 md:m-0">
                        <div className=" w-full justify-center pt-10 items-center">
                            <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-6xl user-otp-title">
                                don’t share your secret OTP!
                            </h1>
                            <h1 className="text-blue-800 font-normal text-sm my-3 mx-7 md:mx-0  md:text-lg md:mt-3 user-signup-title">
                                Please enter the One-Time-Password sent to your registered mobile number
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <img
                                style={{ height: "290px", width: "auto" }}
                                src="https://img.freepik.com/free-vector/new-message-concept-illustration_114360-666.jpg?w=1060&t=st=1692082525~exp=1692083125~hmac=b2a80958a9575bc687f38f052c36e556a1aa6a5bcaaa94134ba0db6c37823bf4"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="flex md:w-1/2 justify-center px-4  pb-10 md:py-10 items-center">
                        <div className="user-otp-form md:w-10/12 px-9 py-10  bg-white drop-shadow-2xl">
                            <form>
                                <div className="flex justify-center items-center">
                                    <h1 className="text-gray-800 font-bold text-2xl mb-2 text-center">
                                        Enter the OTP sent to your mobile
                                    </h1>
                                </div>

                                <HStack>
                                    <PinInput otp placeholder="">
                                        {[...Array(6)].map((_, index) => (
                                            <PinInputField
                                                key={index}
                                                // onChange={(e) => handleOtpChange(index, parseInt(e.target.value))}
                                            />
                                        ))}
                                    </PinInput>
                                </HStack>

                                <button
                                    // onClick={otpVerify}
                                    type="submit"
                                    className="block w-full bg-blue-800 py-2 my-4 rounded-2xl text-golden font-semibold mb-2"
                                >
                                    Verify
                                </button>
                                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                                    Didn't recieved the OTP?
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Otp;
