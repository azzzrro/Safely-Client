import { Input } from "@material-tailwind/react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import "./Home.scss";
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Ride = () => {
    const [map, setmap] = useState<google.maps.Map | undefined>(undefined);

    const [directionsResponse, setdirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setdistance] = useState<string | undefined>(undefined);
    const [duration, setduration] = useState<string | undefined>(undefined);

    const originRef = useRef<HTMLInputElement | null>(null);
    const destinationRef = useRef<HTMLInputElement | null>(null);

    const calculateRoute = async () => {

        const originValue = originRef.current?.value;
        const destinationValue = destinationRef.current?.value;

        if (!originValue || !destinationValue) {
            return;
        }

        if(originValue === destinationValue){
            return toast.error("Please choose different locations!")
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
        } catch (error:any) {
            toast.error(error.message);
        }
    };

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

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const [center, setcenter] = useState({ lat: 12.9716, lng: 77.5946 });
    const [zoom, setzoom] = useState(11);


    const reverseGeocode = async (latitude:any,longitude:any) =>{
        try {
            const geocoder = new google.maps.Geocoder()
            const latlng = new google.maps.LatLng(latitude,longitude)

            return new Promise((resolve,reject)=>{
                geocoder.geocode({location:latlng},(results,status)=>{
                    if(status === 'OK' && results?.[0]){
                        resolve(results[0].formatted_address)
                    }else{
                        reject("Getting location failed")
                    }
                })
            })
        } catch (error:any) {
            return error.message
        }
    }

    const fromLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    const locationDetails = await reverseGeocode(latitude,longitude)
                    if(originRef.current){
                        originRef.current.value = locationDetails
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

                    const locationDetails = await reverseGeocode(latitude,longitude)
                    if(destinationRef.current){
                        destinationRef.current.value = locationDetails
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
                                    <div className="grid grid-cols-4 gap-[9.6rem] w-full h-28 pl-1 py-1  overflow-x-auto car-selection">
                                        <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500  car-one">
                                            <div className=" flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name="radio-10"
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
                                                    backgroundImage: "url(https://d2y3cuhvusjnoc.cloudfront.net/sedan.png)",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            ></div>
                                        </div>
                                        <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500 car-one">
                                            <div className=" flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name="radio-10"
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
                                                    name="radio-10"
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
                                                    backgroundImage: "url(https://d2y3cuhvusjnoc.cloudfront.net/suv.png)",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            ></div>
                                        </div>
                                        <div className="w-36 py-2 px-2 rounded-2xl mr-4 grid grid-rows-4 border border-deep-orange-100 hover:border-green-500 car-one">
                                            <div className=" flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name="radio-10"
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
                                        <button className="btn w-full btn-outline">confirm the ride</button>
                                    </div>
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
