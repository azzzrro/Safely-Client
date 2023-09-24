import { useEffect, useState } from 'react'
import { Dialog } from "@material-tailwind/react";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import axiosInstance from '../../../services/axios';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { toast } from 'react-hot-toast';
import socketIOClient, { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const ENDPOINT = import.meta.env.VITE_API_URL;

const DriverCurrentRide = () => {

    const navigate = useNavigate()

    const [cancelledModal, setcancelledModal] = useState(false)

    ///SOCKET SETUP

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = socketIOClient(ENDPOINT)
        setSocket(socketInstance)
        socketInstance.on("rideConfirmed", () => {
            setrideConfirmed(true)
        })

        socketInstance.on("driverPaymentSuccess", () => {
            setopenPayment(!openPayment)
            toast.success("Payment recieved successfully")
            localStorage.removeItem("currentRide-driver")
            navigate('/driver/dashboard')
        })

        socketInstance.on("rideCancelled", () => {
            setcancelledModal(true)
        })

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
            if (socket) {
                setSocket(null)
            }
        };
    }, [])



    const [openFinishModal, setopenFinishModal] = useState(false);
    const handleOpenFinishModal = () => setopenFinishModal(!openFinishModal);


    const [openPayment, setopenPayment] = useState(false);

    const handlePaymentModal = () => {
        setopenPayment(!openPayment)
        socket?.emit("driverRideFinish")
    }

    ///MAP API-SCRIPT

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const [center, setcenter] = useState({ lat: 12.9716, lng: 77.5946 });
    const [zoom, setzoom] = useState(15);
    const [map, setmap] = useState<google.maps.Map | undefined>(undefined);


    ///GETTING THE RIDE DATA

    const [rideData, setrideData] = useState<any | null>(null)
    const [rideConfirmed, setrideConfirmed] = useState(false)
    const [ride_id, setride_id] = useState<string | null>("")

    useEffect(() => {
        const getData = async () => {
            const rideId = localStorage.getItem("currentRide-driver")
            setride_id(rideId)
            const response = await axiosInstance.get(`/driver/getCurrentRide?rideId=${rideId}`)
            setrideData(response.data.rideData)
        }
        getData()
    }, [])


    ///HANDLE THE PIN CHANGE

    const [pin, setpin] = useState<number>(0);

    const handleOtpChange = (index: number, newValue: number) => {
        const newpin = [...pin.toString()];
        newpin[index] = newValue.toString();
        setpin(parseInt(newpin.join("")));
    };


    ///SETTING UP THE DIRECTIONS

    const [directionsResponse, setdirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [driverLocation, setdriverLocation] = useState("")

    useEffect(() => {
        if (rideData) {
            const getDirectionsData = async () => {
                if (rideData.status === "Confirmed") {
                    setrideConfirmed(true)
                    const origin = rideData.pickupLocation
                    const destination = rideData.dropoffLocation
                    getDirections(origin, destination)
                } else {
                    const { latitude, longitude } = rideData.driverCoordinates
                    const origin = await reverseGeocode(latitude, longitude)
                    getDirections(origin, rideData.pickupLocation)
                }
            }
            getDirectionsData()
        }
    }, [rideData]);


    /// GET-DIRECTIONS FUNCTION

    const getDirections = async (origin: any, destination: any) => {
        if (rideData) {
            const directionsService = new google.maps.DirectionsService();
            try {
                const result = await directionsService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING
                })
                setdirectionsResponse(result)
            } catch (error) {
                toast.error((error as Error).message)
            }
        }
    }


    ///CHANGING THE DIRECTIONS

    useEffect(() => {
        if (rideData) {
            getDirections(rideData.pickupLocation, rideData.dropoffLocation)
        }
    }, [rideConfirmed])


    ///REVERSE GEOCODE FOR LOCATION DETAILS

    const reverseGeocode = async (latitude: any, longitude: any) => {
        try {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(latitude, longitude);

            return new Promise((resolve, reject) => {
                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === "OK" && results?.[0]) {
                        const addressComponents = results[0].address_components;
                        let locality = "";

                        for (const component of addressComponents) {
                            if (component.types.includes("route")) {
                                locality += component.long_name + ", ";
                            }
                            if (component.types.includes("neighborhood")) {
                                locality += component.long_name + ", ";
                            }
                            if (component.types.includes("sublocality_level_3")) {
                                locality += component.long_name + ", ";
                            }
                            if (component.types.includes("sublocality_level_2")) {
                                locality += component.long_name + ", ";
                            }
                            if (component.types.includes("sublocality_level_1")) {
                                locality += component.long_name;
                            }
                        }
                        resolve(locality);
                    } else {
                        reject("Getting location failed");
                    }
                });
            });
        } catch (error: any) {
            return error.message;
        }
    };


    ///VERIFY PIN AND CONFIRM RIDE

    const verifyPIN = async () => {
        const newPin = pin.toString()
        if (newPin.length < 6) {
            toast.error("Please enter a PIN")
        } else if (pin === rideData.pin) {
            console.log(pin, "pin number");
            try {
                socket?.emit("verifyRide", pin)
            } catch (error: any) {
                toast.error(error.message)
            }
        } else {
            toast.error("Please enter a valid PIN")
        }
    }


    const clearRide = () => {
        setcancelledModal(false)
        localStorage.removeItem("currentRide-driver")
        navigate('/driver/dashboard')
    }


    return (

        <div>
            <>

                <Dialog open={openFinishModal} handler={handleOpenFinishModal} className='bg-transparent'>
                    <div className='w-full h-60 rounded-lg bg-gray-50 px-5 pt-8 flex flex-col text-center'>
                        <div className=''>
                            <h1 className='text-2xl font-semibold'>
                                Are you sure you reached the destination?
                            </h1>
                        </div>
                        <div className='mt-4 w-full px-14'>
                            <h1 className='text-md'>
                                If the destination is reached then finish the ride and passenger will pay the fare amount.
                            </h1>
                        </div>
                        <div className='flex justify-center items-end h-32 mb-7 gap-5'>
                            <button
                                onClick={handleOpenFinishModal}
                                className='btn'>dismiss</button>
                            <button
                                onClick={() => {
                                    handleOpenFinishModal()
                                    handlePaymentModal()
                                }}
                                className='btn btn-success text-white'>finish ride</button>
                        </div>
                    </div>
                </Dialog>



                <Dialog open={cancelledModal} handler={clearRide} className='bg-transparent'>

                    <div className='w-full h-fit rounded-lg bg-gray-50 px-5 pt-8 flex flex-col text-center'>
                        <div className=''>
                            <h1 className='text-3xl font-semibold text-red-600'>
                                Ride Cancelled by Passenger!
                            </h1>
                        </div>
                        <div className='mt-3'>
                            <h1 className='text-md font-semibold'>
                                Sorry for the inconvenience
                            </h1>
                        </div>
                        <div className='mt-3 w-full px-8'>
                            <h1 className='text-sm'>
                                Passenger Has Cancelled the Ride. Feel Free to Return to Your Preferred Location or Start Looking for a New Passenger Opportunity.<br /> Your Next Fare Awaits!
                            </h1>
                        </div>
                        <div className='flex justify-center items-end mt-4 mb-7 gap-5'>
                            <button
                                onClick={clearRide}
                                className='btn'>dismiss
                            </button>
                        </div>
                    </div>
                </Dialog>


                <Dialog open={openPayment} handler={handlePaymentModal} className='bg-transparent h-72 text-black'>

                    <div className='w-full h-full rounded-lg bg-gray-50 px-5 pt-8 grid grid-rows-6 text-center'>
                        <div className='row-span-1'>
                            <h1 className='text-2xl font-semibold'>
                                Waiting for the payment completion
                            </h1>
                        </div>
                        <div className='flex justify-center items-center gap-3 row-span-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 48 48">
                                <path fill="#BF360C" d="M35,44c0,0-6-2-11-2s-11,2-11,2V32h22V44z"></path><path fill="#FFA726" d="M14 28c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4S14 25.791 14 28M42 28c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4S42 25.791 42 28"></path><path fill="#FFB74D" d="M38,18c0-12.725-28-8.284-28,0v9c0,8.284,6.269,15,14,15s14-6.716,14-15V18z"></path><path fill="#784719" d="M32 26c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2S32 24.895 32 26M20 26c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2S20 24.895 20 26"></path><path fill="#FF5722" d="M24,4C15.495,4,3,9,2.875,36L13,44V24l16.75-9l5.125,7L35,44l10-8c0-12-0.543-29-15-29l-2-3H24z"></path><path fill="#FB8C00" d="M19,35h10c0,0-2,3-5,3S19,35,19,35z"></path>
                            </svg>
                            <span className="loading loading-dots loading-lg"></span>
                            <img width="38" height="38" src="https://img.icons8.com/external-basicons-color-edtgraphics/50/external-Bank-finance-basicons-color-edtgraphics.png" alt="external-Bank-finance-basicons-color-edtgraphics" />
                        </div>
                        <div className='text center flex flex-col gap-3 row-span-4 mt-4'>
                            {/* <h1 className='uppercase text-left text-xs'>Fare<br/>amount</h1>  */}
                            <h1 className='text-7xl text-green-800'>₹{rideData?.price}</h1>
                            <h1 className='text-xs px-10'>After the successful payment completion, please note that it may take some time for the changes to reflect. Thank you for your patience.</h1>
                        </div>
                    </div>
                </Dialog>
            </>
            {rideData && (
                <>
                    <div className="w-[98%] h-fit mx-auto my-1 bg-indigo-50 py-6 rounded-lg drop-shadow-lg">
                        <div className='md:flex w-full gap-4 px-5'>
                            <div className='md:w-1/2 h-fit  rounded-3xl'>
                                <div className='my-3'>
                                    <h1 className='text-lg font-bold'>Ride Details</h1>
                                </div>
                                <div className='grid grid-cols-4 gap-4'>
                                    <div className='col-span-4 w-full h-fit px-3 py-3 drop-shadow-xl rounded-xl bg-gray-100 flex gap-3'>
                                        <div><img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/street-view.png" alt="work-from-home" /></div>
                                        <h1 className='truncate'>{rideData?.pickupLocation}</h1>
                                    </div>
                                    <div className='col-span-4 w-full h-fit px-3 py-3 drop-shadow-xl rounded-xl bg-gray-100 flex gap-3'>
                                        <div><img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/home-page.png" alt="drop-shipping" /></div>
                                        <h1 className='truncate'>{rideData?.dropoffLocation}</h1>
                                    </div>
                                    <div className='col-span-2 w-full h-fit px-3 py-3 drop-shadow-xl rounded-xl bg-gray-100 flex gap-3'>
                                        <div><img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/time.png" alt="time" /></div>
                                        <h1 className='truncate'>{rideData?.duration}</h1>
                                    </div>
                                    <div className='col-span-2 w-full h-fit px-3 py-3 drop-shadow-xl rounded-xl bg-gray-100 flex gap-3'>
                                        <div><img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/point-objects.png" alt="point-objects" /></div>
                                        <h1 className='truncate'>{rideData?.distance}</h1>
                                    </div>
                                    <div className='col-span-2 w-full h-fit px-3 py-3 drop-shadow-xl rounded-xl bg-gray-100 flex gap-3'>
                                        <div><img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/banknotes.png" alt="work-from-home" /></div>
                                        <h1 className='truncate'>₹{rideData?.price}</h1>
                                    </div>

                                    {!rideConfirmed ? (
                                        <>
                                            <div className='col-span-4 w-full px-3 py-3 drop-shadow-xl rounded-xl bg-gray-100 flex gap-3 justify-center items-center'>
                                                <h1 className='text-sm'>Enter the PIN from user to confirm the ride</h1>
                                                <HStack className=''>
                                                    <PinInput otp placeholder="">
                                                        {[...Array(6)].map((_, index) => (
                                                            <PinInputField
                                                                key={index}
                                                                onChange={(e) => handleOtpChange(index, parseInt(e.target.value))}
                                                            />
                                                        ))}
                                                    </PinInput>
                                                </HStack>
                                            </div>
                                            <div className='col-span-4 justify-center gap-3 text-center mt-1 flex'>
                                                <button className='btn btn-sm btn-error text-white'>cancel the ride</button>
                                                <button
                                                    type='button'
                                                    onClick={() => verifyPIN()}
                                                    className="btn btn-sm btn-accent text-white mr-3">confirm the ride</button>
                                            </div>
                                        </>
                                    ) : (
                                        <><div className='col-span-4'>

                                            <div className='flex justify-between gap-1 bg-gray-100 rounded-2xl drop-shadow-lg items-center px-7 py-2'>
                                                <h1 className='text-[11pt] font-bold'>Confirm when you've reached your destination.</h1>
                                                <button
                                                    onClick={handleOpenFinishModal}
                                                    className='btn btn-accent btn-sm text-white'>finish the ride</button>
                                            </div>
                                        </div>
                                        </>
                                    )}


                                </div>
                            </div>
                            <div className='md:w-1/2 mt-8 md:mt-0 h-96 bg-white rounded-3xl drop-shadow-xl'>
                                <GoogleMap
                                    center={center}
                                    zoom={zoom}
                                    mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "4%" }}
                                    options={{
                                        zoomControl: false,
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false,
                                    }}
                                    onLoad={(map) => setmap(map as google.maps.Map)}
                                >
                                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                                </GoogleMap>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DriverCurrentRide