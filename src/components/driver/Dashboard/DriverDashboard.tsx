import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const DriverDashboard = () => {

    const driver_id = useSelector((store: any) => store.driver.driver_id)
    const [driverData, setdriverData] = useState<any | null>(null);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get(`/driver/driverData?id=${driver_id}`);
            setdriverData(data);
        };
        getData();
    }, [])

    const navigate = useNavigate()

    interface RideDetails {
        ride_id: string;
        userId: string;
        pickupCoordinates: PickupLocation;
        dropoffCoordinates: DropoffLocation;
        pickupLocation: string;
        dropoffLocation: string;
        distance: string;
        duration: string;
        model: string;
        price: number;
    }

    interface PickupLocation {
        lat: number;
        lng: number;
    }

    interface DropoffLocation {
        lat: number;
        lng: number;
    }

    const [rides, setRides] = useState<RideDetails | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);


    useEffect(() => {
        const socketInstance = socketIOClient(ENDPOINT);
        console.log("Socket connected driver side", socketInstance);
        setSocket(socketInstance);

        socketInstance.on("getNearByDrivers", () => {
            console.log("inside socket request");
            if (navigator.geolocation) {
                console.log("inside geonavigation");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("position", position);
                        const { latitude, longitude } = position.coords
                        console.log(latitude, longitude, "pos coordinates");
                        if (socketInstance) {
                            console.log("Socket is still on after getting coords");

                        }
                        socketInstance?.emit("driverLocation", latitude, longitude, driver_id)
                    },
                    (error) => {
                        console.log(error.message);
                    }
                )
            }
        });


        socketInstance.on("newRideRequest", (rideDetails, driverIdArray) => {
            if (driverIdArray.includes(driver_id)) {
                setRides(rideDetails)
            }
        })

        socketInstance.on("driverConfirmation", (rideId) => {
            localStorage.setItem("currentRide-driver", rideId)
            navigate('/driver/rides')
        })

        // socketInstance.on("rideAccepted", (acceptedRideId: string) => {
        //     setRides((prevRides: any[]) => prevRides.filter((ride) => ride._id !== acceptedRideId));
        // });

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);

    const handleAcceptRide = () => {
        if (socket) {
            const updatedRideDetails = { ...rides, driver_id }
            console.log(updatedRideDetails, "updated and accepted ridedetails");
            socket.emit("acceptRide", updatedRideDetails);
        }
    };

    return (
        <>
            <div className="w-[81.5%] h-fit mx-auto my-[2.5rem] bg-teal-50 py-6 rounded-3xl drop-shadow-lg">

                {rides ? (

                    <div className="w-[95%] h-fit bg-gray-100 rounded-3xl mx-auto mb-8 mt-3 drop-shadow-xl">
                        <div className="flex px-4 pt-6 mb-3 md:mb-0 md:pt-4 md:pb-2">
                            <EmergencyShareIcon className="text-blue-700" />
                            <div className="flex items-center">
                                <h1 className="text-xs font-semibold text-blue-700">You Have One New Ride!</h1>
                            </div>
                        </div>
                        <div className="px-5 py-2 grid md:grid-cols-6 md:gap-5 gap-6">
                            <div className="md:flex col-span-3">
                                <h1 className="font-bold">Pickup : </h1><h1 className="ml-2">{rides?.pickupLocation}</h1>
                            </div>
                            <div className="md:flex col-span-3">
                                <h1 className="font-bold">Dropoff : </h1><h1 className="ml-2">{rides?.dropoffLocation}</h1>
                            </div>
                            <div className="md:flex">
                                <h1 className="font-bold">Distance : </h1><h1 className="ml-2">{rides?.distance}</h1>
                            </div>
                            <div className="md:flex">
                                <h1 className="font-bold">Duration : </h1><h1 className="ml-2">{rides?.duration}</h1>
                            </div>
                            <div className="md:flex">
                                <h1 className="font-bold">Charge : </h1><h1 className="ml-2">₹{rides?.price}</h1>
                            </div>
                            <div className="col-span-3 md:text-right text-center py-3 md:py-0">
                                <button
                                    onClick={() => setRides(null)}
                                    className="btn btn-sm btn-error text-white mr-3">Deny</button>
                                <button
                                    onClick={() => handleAcceptRide()}
                                    className="btn btn-sm btn-success text-white">Accept</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div className="w-[95%] mx-auto md:h-44 h-fit md:flex md:gap-8 grid grid-rows-3 gap-5 ">
                    <div className="bg-green-200 md:w-1/3 rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                        <div className=" row-span-2 flex items-center px-3">
                            <h1 className="text-2xl font-medium">This month rides</h1>
                        </div>
                        <div className=" row-span-3 flex items-center justify-end">
                            <h1 className="text-8xl px-2">{driverData?.RideDetails?.completedRides}</h1>
                        </div>
                    </div>
                    <div className="bg-green-200 md:w-1/3 rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                        <div className=" row-span-2 flex items-center px-3">
                            <h1 className="text-2xl font-medium">Total Earnings</h1>
                        </div>
                        <div className=" row-span-3 flex items-center justify-end">
                            <h1 className="text-8xl px-2">₹{driverData?.RideDetails?.totalEarnings}</h1>
                        </div>
                    </div>
                    <div className="bg-green-200 md:w-1/3 rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                        <div className=" row-span-2 flex items-center px-3">
                            <h1 className="text-2xl font-medium">Total Rides</h1>
                        </div>
                        <div className=" row-span-3 flex items-center justify-end">
                            <h1 className="text-8xl px-2 ">{driverData?.RideDetails?.completedRides}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
