// import React, { useEffect, useState } from "react";
// import socketIOClient, { Socket } from "socket.io-client";

// const ENDPOINT = import.meta.env.VITE_API_URL;

const DriverNotification = () => {

    // interface RideDetails{
    //     ride_id: string;
    //     // driver: string;
    //     userId: string;
    //     pickupCoordinates: PickupLocation;
    //     dropoffCoordinates: DropoffLocation;
    //     pickupLocation:string
    //     dropoffLocation:string
    //     distance:string
    //     duration:string
    //     model:string
    //     price: number;
    //     // date: number;
    //     // status: string;
    // }

    // interface PickupLocation {
    //     lat: number;
    //     lng: number;
    // }
    
    // interface DropoffLocation {
    //     lat: number;
    //     lng: number;
    // }

    // const [rides, setRides] = useState<RideDetails[]>([]);
    // const [socket, setSocket] = useState<Socket | null>(null);

    // useEffect(() => {
    //     const socketInstance = socketIOClient(ENDPOINT);
    //     console.log("Socket connected client side");
    //     setSocket(socketInstance);

    //     socketInstance.on("newRideRequest", (newRide: RideDetails) => {
    //         setRides((prevRides) => [...prevRides, newRide]);
    //     });

    //     // socketInstance.on("rideAccepted", (acceptedRideId: string) => {
    //     //     setRides((prevRides: any[]) => prevRides.filter((ride) => ride._id !== acceptedRideId));
    //     // });

    //     return () => {
    //         if (socketInstance) {
    //             socketInstance.disconnect();
    //         }
    //     };
    // }, []);

    // const handleAcceptRide = (rideId: string) => {
    //     if (socket) {
    //         socket.emit("acceptRide", rideId);
    //     }
    // };

    return (
        <>
            <div className="w-[81.5%] h-fit mx-auto my-[2.5rem] bg-teal-50 py-6 rounded-3xl drop-shadow-lg">
                <h1>Ride Requests</h1>
                {/* <ul>
                    {rides.map((ride) => (
                        <li key={ride.ride_id}>
                            <p>Pickup: {ride.pickupLocation}</p>
                            <p>Drop-off: {ride.dropoffLocation}</p>
                            <button onClick={() => handleAcceptRide(ride.ride_id)}>Accept</button>
                        </li>
                    ))}
                </ul> */}
            </div>
        </>
    );
};

export default DriverNotification;
