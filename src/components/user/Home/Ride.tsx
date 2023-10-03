import { Input } from "@material-tailwind/react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import "./Home.scss";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cancelSearching, startSearching } from "../../../services/redux/slices/driverSearchSlice";
import socketIOClient, { Socket } from "socket.io-client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ENDPOINT = import.meta.env.VITE_API_URL;

const Ride = () => {


    const [noDriversModal, setnoDriversModal] = useState(false)


    ///SOCKET SET-UP

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = socketIOClient(ENDPOINT);
        setSocket(socketInstance);

        console.log("Socket connected user side");

        socketInstance.on("userConfirmation", (rideId) => {
            localStorage.setItem("currentRide-user", rideId)
            dispatch(cancelSearching())
            navigate('/rides')
        })
    }, [])


    const {user_id} = useSelector((store: any) => store.user);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [pickupLocation, setPickupLocation] = useState<string>("");
    const [dropoffLocation, setDropoffLocation] = useState<string>("");


    ///COORDINATES

    const [pickupCoordinates, setpickupCoordinates] = useState({
        latitude: "",
        longitude: "",
    });

    const [dropoffCoordinates, setdropoffCoordinates] = useState({
        latitude: "",
        longitude: "",
    });


    ///MAP API-SCRIPT

    const [map, setmap] = useState<google.maps.Map | undefined>(undefined);
    const [center, setcenter] = useState({ lat: 12.9716, lng: 77.5946 });
    const [zoom, setzoom] = useState(11);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });


    ///ROUTE CALCULATIONS

    const [directionsResponse, setdirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setdistance] = useState<string | undefined>(undefined);
    const [duration, setduration] = useState<string | undefined>(undefined);

    const originRef = useRef<HTMLInputElement | null>(null);
    const destinationRef = useRef<HTMLInputElement | null>(null);

    const calculateRoute = async () => {
        const originValue = originRef.current?.value;
        const destinationValue = destinationRef.current?.value;


        if (!originValue || !destinationValue) {
            return toast.error("Please choose the pickup and drop0ff locations");
        }

        if (originValue === destinationValue) {
            return toast.error("Please choose different locations!");
        }

        if (originValue && destinationRef.current?.value && originValue != destinationValue) {
            setPickupLocation(originValue);
            setDropoffLocation(destinationValue);
            const pickupCoords = await geocodeLocation(originValue);
            setpickupCoordinates(pickupCoords);
            const dropoffCoords = await geocodeLocation(destinationValue);
            setdropoffCoordinates(dropoffCoords);
        }

        const directionsService = new google.maps.DirectionsService();

        try {
            const result = await directionsService.route({
                origin: originValue,
                destination: destinationValue,
                travelMode: google.maps.TravelMode.DRIVING,
            });


            setdirectionsResponse(result);
            setdistance(result.routes[0].legs[0].distance?.text);
            setduration(result.routes[0].legs[0].duration?.text);
        } catch (error: any) {
            toast.error(error.message);
        }
    };


    ///CLEAR ROUTES AND MAP

    function clearRoutes() {
        setdirectionsResponse(null);
        setdistance(undefined);
        setduration(undefined);
        if (originRef.current) {
            originRef.current.value = "";
        }

        if (destinationRef.current) {
            destinationRef.current.value = "";
        }
    }


    /// FOR LOCATION NAME USING CO-ORDINATES

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


    ///FOR CO-ORDINATES USING PLACE NAME

    const geocodeLocation = async (locationName: string) => {
        try {
            const geocoder = new google.maps.Geocoder();

            return new Promise((resolve, reject) => {
                geocoder.geocode({ address: locationName }, (results, status) => {
                    if (status === "OK" && results?.[0]) {
                        const location = results[0].geometry.location;
                        const latitude = location.lat();
                        const longitude = location.lng();
                        resolve({ latitude, longitude });
                    } else {
                        reject("Geocoding failed");
                    }
                });
            });
        } catch (error: any) {
            return error.message;
        }
    };



    ///LOCATION PICKER

    const fromLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationDetails = await reverseGeocode(latitude, longitude);
                    if (originRef.current) {
                        originRef.current.value = locationDetails;
                        setPickupLocation(locationDetails);
                    }

                    setcenter({ lat: latitude, lng: longitude });
                    map?.panTo(center);
                    setzoom(16);
                },
                (error) => {
                    toast.error(error.message);
                }
            );
        }
    };

    const toLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    const locationDetails = await reverseGeocode(latitude, longitude);
                    if (destinationRef.current) {
                        destinationRef.current.value = locationDetails;
                        setDropoffLocation(locationDetails);
                    }

                    setcenter({ lat: latitude, lng: longitude });
                    map?.panTo(center);
                    setzoom(16);
                },
                (error) => {
                    toast.error(error.message);
                }
            );
        }
    };


    ///CHARGE CALCULATIONS

    interface Charges {
        standard: number;
        sedan: number;
        suv: number;
        premium: number;
    }

    let charges: Charges = {
        standard: 0,
        sedan: 0,
        suv: 0,
        premium: 0,
    };

    if (distance && duration) {
        charges = {
            standard: Math.floor(parseFloat(distance) * 50),
            sedan: Math.floor(parseFloat(distance) * 70),
            suv: Math.floor(parseFloat(distance) * 90),
            premium: Math.floor(parseFloat(distance) * 150),
        };
    }


    ///RIDE-ID GENERATOR

    const generateRandomString = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const digits = "0123456789";
        let randomString = "";

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters[randomIndex];
        }

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            randomString += digits[randomIndex];
        }

        return randomString;
    };


    ///HANDLE VEHICLE MODEL SELECTION

    const handleModelSelection = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.value) {
            case "Standard":
                formik.setFieldValue("model", "Standard")
                formik.setFieldValue('price', charges.standard)
                break;
            case "SUV":
                formik.setFieldValue("model", "SUV")
                formik.setFieldValue('price', charges.suv)
                break;
            case "Premium":
                formik.setFieldValue("model", "Premium")
                formik.setFieldValue('price', charges.premium)
                break;
            case "Sedan":
                formik.setFieldValue("model", "Sedan")
                formik.setFieldValue('price', charges.sedan)
                break;
        }
    };


    ///RIDE FORM SUBMISSION

    const noDrivers = () => {
        setTimeout(() => {
            dispatch(cancelSearching())
            setnoDriversModal(true)
        }, 5000);
    }

    const formik = useFormik({
        initialValues: {
            ride_id: generateRandomString(),
            user_id: user_id,
            pickupLocation: "",
            dropoffLocation: "",
            pickupCoordinates: {},
            dropoffCoordinates: {},
            distance: "",
            duration: "",
            model: "",
            price: 0,
        },
        validationSchema: Yup.object({
            model: Yup.string().min(3, "Please choose an option!").required("Please choose an option!"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            console.log(values, "submitting values");

            try {

                if (!user_id) {
                    return toast.error("Please login to book the cab!")
                }

                socket?.emit('getNearByDrivers', values);
                dispatch(startSearching());
                noDrivers()

            } catch (error: any) {
                console.log(error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });


    const showError = () => {
        if (formik.errors.model) {
            toast.error(formik.errors.model)
        }
    }

    useEffect(() => {
        formik.setFieldValue("pickupLocation", pickupLocation)
        formik.setFieldValue("dropoffLocation", dropoffLocation)
    }, [pickupLocation, dropoffLocation])

    useEffect(() => {
        formik.setFieldValue("pickupCoordinates", pickupCoordinates)
        formik.setFieldValue("dropoffCoordinates", dropoffCoordinates)
    }, [pickupCoordinates, dropoffCoordinates])

    useEffect(() => {
        formik.setFieldValue("distance", distance)
    }, [distance])

    useEffect(() => {
        formik.setFieldValue("duration", duration);
    }, [duration])


    if (!isLoaded) {
        return (
            <div
                role="status"
                className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
            >
                <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <>

            {noDriversModal &&

                <>
                    <div x-data={{ isOpen: true }} className="relative flex justify-center">
                        <div
                            className="fixed inset-0 z-10 overflow-y-auto bg-opacity-50 bg-black"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                </span>

                                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-righ  sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                                    <div>
                                        <div className="mt-2 text-center">
                                            <h1 className="text-xl font-bold mb-2">Taking longer than usual!</h1>
                                            <h1 className="my-2 text-sm">Dont worry, we got you!<br /> We're trying our best to get you a driver.</h1>

                                            <div className="flex h-20 w-full items-center justify-center">
                                                {/* <span className="loading loading-ring loading-lg"></span> */}

                                                <div className="loader2 h-15 w-15">
                                                    <span className="hour"></span>
                                                    <span className="min"></span>
                                                    <span className="circel"></span>
                                                </div>
                                            </div>

                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                All the drivers seems busy. But if you ready to wait little more, we can get you the best driver available
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:flex sm:items-center sm:justify-center">
                                        <div className="sm:flex sm:items-center ">
                                            <button
                                                onClick={() => setnoDriversModal(false)}
                                                className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-black border border-black hover:bg-black hover:text-white capitalize transition-colors duration-300 transform rounded-md sm:w-auto sm:mt-0 focus:outline-none "
                                            >
                                                CANCEL SEARCHING
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            }

            <div className="container mx-auto px-6 py-12">
                <div className="">
                    <h1 className="text-4xl font-bold text-blue-800">Book a safe ride!</h1>
                </div>

                <div className="container w-full h-fit md:flex md:items-center md:gap-10 grid grid-rows-2 gap-5 py-6 md:px-10">
                    <div className="md:w-1/3 w-full mt-3 md:h-[32rem] grid grid-rows-5 h-[44rem]">
                        <div className="row-span-2 grid gap-8">
                            <div className="w-full flex gap-4 items-end">
                                <div className="w-4/5">
                                    <Autocomplete>
                                        <Input
                                            variant="standard"
                                            label="Where from?"
                                            inputRef={originRef}
                                            crossOrigin={undefined}
                                        />
                                    </Autocomplete>
                                </div>
                                <div className="md:tooltip" data-tip="Choose your current location">
                                    <button onClick={() => fromLocation()} className="bg-black px-5 py-1.5 rounded-lg">
                                        <GpsFixedIcon className="text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex gap-4 items-end">
                                <div className="w-4/5">
                                    <Autocomplete>
                                        <Input
                                            variant="standard"
                                            label="Where to?"
                                            inputRef={destinationRef}
                                            crossOrigin={undefined}
                                        />
                                    </Autocomplete>
                                </div>
                                <div className="md:tooltip" data-tip="Choose your current location">
                                    <button onClick={() => toLocation()} className="bg-black px-5 py-1.5 rounded-lg">
                                        <GpsFixedIcon className="text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex gap-1">
                                <button onClick={calculateRoute} className="btn btn-outline  w-4/5">
                                    search for cabs
                                </button>
                                <button onClick={clearRoutes} className="btn w-1/5">
                                    clear
                                </button>
                            </div>
                        </div>

                        {distance && duration && (
                            <>
                                <div className="flex flex-row gap-3 items-center ">
                                    <div className="basis-[50%] text-white bg-blue-gray-300 shadow drop-shadow-xl w-1/2 rounded-2xl h-2/3 flex justify-evenly items-center gap-2">
                                        <h1 className=" text-xs max-w-[50px]">Total Distance</h1>
                                        <h1 className="font-bold text-3xl ">{distance}</h1>
                                    </div>
                                    <div className="basis-[50%] text-white shadow drop-shadow-xl bg-blue-gray-300 w-1/2 rounded-2xl h-2/3 flex justify-center gap-1 items-center ">
                                        <h1 className=" text-xs max-w-[50px]">Total Duration</h1>
                                        <h1 className="font-bold text-3xl ">{duration}</h1>
                                    </div>
                                </div>

                                <div className="row-span-2 w-full pt-2 overflow-hidden">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="grid grid-cols-4 gap-[9.6rem] w-full h-28 pl-1 py-1  overflow-x-auto car-selection">
                                            <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500  car-one">
                                                <div className=" flex items-center gap-1">
                                                    <input
                                                        type="radio"
                                                        value="Sedan"
                                                        onChange={handleModelSelection}
                                                        name="model"
                                                        className="radio-xs checked:bg-blue-500"
                                                    />
                                                    <h1 className="text-xs">Sedan</h1>
                                                    <span>
                                                        <h1 className="text-[9px] mt-[3px] text-teal-500">Recommended</h1>
                                                    </span>
                                                </div>
                                                <div className="pl-5">
                                                    <h1 className="text-sm font-semibold">₹{charges.sedan}/-</h1>
                                                </div>
                                                <div
                                                    className="row-span-2 car-selection-one "
                                                    style={{
                                                        backgroundImage:
                                                            "url(https://d2y3cuhvusjnoc.cloudfront.net/sedan.png)",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500 car-one">
                                                <div className=" flex items-center gap-1">
                                                    <input
                                                        onChange={handleModelSelection}
                                                        value="Standard"
                                                        type="radio"
                                                        name="model"
                                                        className="radio-xs checked:bg-blue-500"
                                                    />
                                                    <h1 className="text-xs">Standard</h1>
                                                </div>
                                                <div className="pl-5">
                                                    <h1 className="text-sm font-semibold">₹{charges.standard}/-</h1>
                                                </div>
                                                <div
                                                    className="row-span-2 car-selection-one "
                                                    style={{
                                                        backgroundImage:
                                                            "url(https://d2y3cuhvusjnoc.cloudfront.net/standard.png)",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500 car-one">
                                                <div className=" flex items-center gap-1">
                                                    <input
                                                        type="radio"
                                                        value="SUV"
                                                        onChange={handleModelSelection}
                                                        name="model"
                                                        className="radio-xs checked:bg-blue-500"
                                                    />
                                                    <h1 className="text-xs">SUV</h1>
                                                </div>
                                                <div className="pl-5">
                                                    <h1 className="text-sm font-semibold">₹{charges.suv}/-</h1>
                                                </div>
                                                <div
                                                    className="row-span-2 car-selection-one"
                                                    style={{
                                                        backgroundImage:
                                                            "url(https://d2y3cuhvusjnoc.cloudfront.net/suv.png)",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500 car-one">
                                                <div className=" flex items-center gap-1">
                                                    <input
                                                        onChange={handleModelSelection}
                                                        type="radio"
                                                        value="Premium"
                                                        name="model"
                                                        className="radio-xs checked:bg-blue-500"
                                                    />
                                                    <h1 className="text-xs">Premium</h1>
                                                </div>
                                                <div className="pl-5">
                                                    <h1 className="text-sm font-semibold">₹{charges.premium}/-</h1>
                                                </div>
                                                <div
                                                    className="row-span-2 car-selection-one"
                                                    style={{
                                                        backgroundImage:
                                                            "url(https://d2y3cuhvusjnoc.cloudfront.net/luxuary.png)",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="w-full mt-5">
                                            <button
                                                type="submit"
                                                className="btn w-full btn-outline"
                                                onClick={formik.errors.model ? () => showError() : () => null}
                                            >
                                                confirm the ride
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="md:w-2/3 w-full md:h-[32rem] h-auto">
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
                            <Marker position={center} />
                            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ride;
