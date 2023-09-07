import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import "./Home.scss";

const Ride = () => {
    const [value, setValue] = useState("");
    useEffect(() => {
        console.log(value);
    }, [value]);
    return (
        <>
            <div className="container mx-auto px-6 py-12">
                <div className="">
                    <h1 className="text-4xl font-bold text-blue-800">Book a safe ride!</h1>
                </div>

                <div className="container w-full h-fit md:flex md:items-center md:gap-10 grid grid-rows-2 gap-5 py-6 md:px-10">
                    <div className="md:w-1/3 w-full mt-3 md:h-[32rem] grid grid-rows-5 h-[44rem]">
                        <div className="row-span-2 grid gap-8">
                            <div className="w-full flex gap-4 items-end">
                                <div className="w-4/5">
                                    <Input variant="standard" label="Where from?" crossOrigin={undefined} />
                                </div>
                                <div className="tooltip" data-tip="Choose your current location">
                                    <button className="bg-black px-5 py-1.5 rounded-lg">
                                        <GpsFixedIcon className="text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex gap-4 items-end">
                                <div className="w-4/5">
                                    <Input variant="standard" label="Where to?" crossOrigin={undefined} />
                                </div>
                                <div className="tooltip" data-tip="Choose your current location">
                                    <button className="bg-black px-5 py-1.5 rounded-lg">
                                        <GpsFixedIcon className="text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full">
                                <button className="btn w-full">search for cabs</button>
                            </div>
                        </div>
                        <div className="row-span-3 w-full pt-5 overflow-hidden">
                            <div className="grid grid-cols-4 gap-40 w-full h-28  overflow-x-auto vehicle-section">
                                <div className="w-36 bg-blue-800 p-4 rounded-2xl mr-4">Content 1</div>
                                <div className="w-36 bg-blue-800 p-4 rounded-2xl mr-4">Content 1</div>
                                <div className="w-36 bg-blue-800 p-4 rounded-2xl mr-4">Content 1</div>
                                <div className="w-36 bg-blue-800 p-4 rounded-2xl mr-4">Content 1</div>
                            </div>
                            <div className="w-full mt-5">
                                <button className="btn w-full">confirm the ride</button>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3 w-full md:h-[32rem] h-auo bg-teal-700"></div>
                </div>
            </div>

            <script
                defer
                src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`}
            ></script>
        </>
    );
};

export default Ride;
