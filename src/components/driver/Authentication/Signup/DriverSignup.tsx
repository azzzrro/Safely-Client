import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupIcon from "@mui/icons-material/Group";
import "./DriverSignup.scss";

function DriverSignup() {
    const iconsColor = "text-gray-400";
    return (
        <>
            <div className="driver-registration-container h-screen flex justify-center items-center">
                <div className="w-5/6 md:w-4/6 md:h-4/5  md:flex justify-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="relative overflow-hidden h-full sm:pl-14 md:pl-16 md:w-1/2 i justify-around items-center mb-3 md:m-0">
                        <div className="flex w-full justify-center pt-10 items-center">
                            <h1 className="text-blue-800 font-bold md:mb-8 text-4xl mx-7 md:mx-0  md:text-5xl driver-signup-title">
                                Unlock exciting benefits by registering as a driver!
                            </h1>
                        </div>
                        <div className="hidden  md:flex md:items-center" style={{marginTop:"-40px"}}>
                            <img
                                style={{ height: "330px", width: "auto" }}
                                src="../../../public/images/[removal.ai]_7d8b958b-03bb-4249-8817-6e555f711362-12892968_5095140.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex md:w-1/2 justify-center pb-10 md:py-10 items-center">
                        <div className="driver-signup-form md:w-8/12 px-9 py-8  bg-white drop-shadow-xl">
                            <form>
                                {/* <div className="text-center">
                                <h1 className="text-gray-800 font-bold text-2xl mb-2">Hello there!</h1>
                            </div> */}
                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <PersonIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Full name"
                                    />
                                </div>
                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <AlternateEmailIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Email Address"
                                    />
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

                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <VpnKeyIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <VpnKeyIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Retype-Password"
                                    />
                                </div>
                                <div className="flex items-center  py-2 px-3 rounded-2xl">
                                    <GroupIcon className={iconsColor} />
                                    <input
                                        className="pl-2 outline-none border-b w-full"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Referral Code"
                                    />
                                </div>

                                {/* <div className="flex items-center mt-3">
                                    <div className="flex items-center justify-center w-full bg-blue-800 py-2 rounded-2xl text-golden font-semibold mb-2">
                                        <GoogleIcon className="text-golden" style={{ fontSize: "18px" }} />
                                        <h1 className="ml-1">SIgn-up with Google</h1>
                                    </div>
                                </div> */}

                                <button
                                    type="submit"
                                    className="block w-full bg-blue-800 py-2 mt-5 rounded-2xl text-golden font-semibold mb-2"
                                >
                                    Register
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

export default DriverSignup;
