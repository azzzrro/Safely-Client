import React, { useEffect, useState } from 'react'
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import axiosUser from '../../../services/axios/axiosUser'
import { toast } from 'react-hot-toast';
import socketIOClient, { Socket } from "socket.io-client";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import *  as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dialog } from "@material-tailwind/react";
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import ChatBoxSender from '../../ChatBoxSender';
import ChatInputField from '../../ChatInputField';
import './Home.scss'
import ChatBoxReciever from '../../ChatBoxReciever';

const ENDPOINT = import.meta.env.VITE_API_URL;


const UserCurrentRide = () => {


  const { user, user_id,userToken } = useSelector((store: any) => store.user)

  const [userData, setuserData] = useState<any | null>(null);

  const getUserData = async () => {
    try {
      const { data } = await axiosUser(userToken).get(`userData?id=${user_id}`);
      setuserData(data);
    } catch (error) {
      toast.error((error as Error).message)
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [])

  interface RideDetails {
    _id: number
    ride_id: string;
    driver_id: string;
    user_id: string;
    pickupCoordinates: PickupCoordinates;
    dropoffCoordinates: DropoffCoordinates;
    pickupLocation: string;
    dropoffLocation: string;
    driverCoordinates: DriverCoordinates;
    distance: string;
    duration: string;
    model: string;
    price: number;
    date: number;
    status: string;
    pin: string;
  }

  interface PickupCoordinates {
    latitude: number;
    longitude: number;
  }

  interface DropoffCoordinates {
    latitude: number;
    longitude: number;
  }

  interface DriverCoordinates {
    latitude: number;
    longitude: number;
  }


  ///STRIPE-PAYMENT-SUCCESS

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const rideId = queryParams.get('rideId');

  ///SOCKET SETUP

  const [socket, setSocket] = useState<Socket | null>(null);
  const [chats, setchats] = useState<any[]>([])


  useEffect(() => {
    const socketInstance = socketIOClient(ENDPOINT)
    setSocket(socketInstance)
    socketInstance.on("rideConfirmed", () => {
      setrideConfirmed(true)
    })

    socketInstance.on("userPaymentPage", () => {
      setpaymentModal(true)
    })

    socketInstance.on("chat", (senderChats) => {
      setchats(senderChats)
    })

    if (rideId) {
      toast.success("Payment successful");
      localStorage.removeItem("currentRide-user");
      if (socketInstance) {
        socketInstance.emit("paymentCompleted");
      } else {
        console.log("no sockett");
      }
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
      if (socket) {
        setSocket(null)
      }
    }
  }, [])


  const sendMessageToSocket = (chat: any[]) => {
    socket?.emit("chat", chat)
  }

  const addMessage = (message: string) => {

    const newChat = {
      message,
      sender: user,
      avatar: userData?.userImage
    };
    setchats((prevChats) => [...prevChats, newChat])
    sendMessageToSocket([...chats, newChat])
  }

  const ChatList = () => {
    return chats.map((chat, index) => {
      if (chat.sender === user) return <ChatBoxSender avatar={chat.avatar} message={chat.message} />
      return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} />
    })
  }


  const navigate = useNavigate()

  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  const [paymentModal, setpaymentModal] = useState(false)

  const handlePaymentModal = () => {
    setpaymentModal(!paymentModal)
  }

  const [rideData, setrideData] = useState<RideDetails>()
  const [driverData, setdriverData] = useState<any | null>(null)
  const [feedbacks, setfeedbacks] = useState<null | any>([])

  const [directionsResponse, setdirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [duration, setduration] = useState<string | undefined>(undefined);

  const [rideConfirmed, setrideConfirmed] = useState(false)


  ///MAP API-SCRIPT

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [center] = useState({ lat: 12.9716, lng: 77.5946 });
  const [zoom] = useState(11);
  const [, setmap] = useState<google.maps.Map | undefined>(undefined);


  ///GETTING THE RIDE DATA

  const getRideData = async () => {
    try {
      const ride_id = localStorage.getItem("currentRide-user")
      const response = await axiosUser(userToken).get(`getCurrentRide?rideId=${ride_id}`)
      setrideData(response.data.rideData)
      setdriverData(response.data.driverData)
      setfeedbacks(response.data.driverData?.formattedFeedbacks || null)
      formik.setFieldValue("amount", response.data.rideData?.price)
    } catch (error) {
      toast.error((error as Error).message)
      console.log(error);
    }
  }

  useEffect(() => {
    getRideData()
  }, [])



  ///SETTING UP THE DIRECTIONS

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
          setdriverLocation(origin)
          getDirections(origin, rideData.pickupLocation)
        }
      }
      getDirectionsData()
    }
  }, [rideData]);


  ///CHANGING THE DIRECTIONS

  useEffect(() => {
    if (rideData) {
      getDirections(rideData.pickupLocation, rideData.dropoffLocation)
    }
  }, [rideConfirmed])


  /// GET-DIRECTIONS FUNCTION

  const [driverLocation, setdriverLocation] = useState("")

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
        setduration(result.routes[0].legs[0].duration?.text);

      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  }


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


  ///PAYMENT HANDLING

  const formik = useFormik({
    initialValues: {
      paymentMode: "",
      amount: 0
    },
    validationSchema: Yup.object({
      paymentMode: Yup.string().required("Please choose a Payment method")
    }),
    onSubmit: async (values: any) => {

      if (values.paymentMode === "Wallet" && values.amount > userData?.wallet?.balance) {
        return 0
      }

      const rideId = localStorage.getItem("currentRide-user")


      if (values.paymentMode === "Wallet" || values.paymentMode === "Cash in hand") {
        const { data } = await axiosUser(userToken).post('payment', values, { params: { rideId: rideId } })
        if (data.message === "Success") {
          toast.success("Payment successfull")
          localStorage.removeItem("currentRide-user")
          setpaymentModal(false)
          socket?.emit("paymentCompleted", values.paymentMode, values.amount)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
      else if (values.paymentMode === "Stripe") {

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

        try {
          const { data } = await axiosUser(userToken).post("payment-stripe", values, { params: { rideId: rideId } })

          try {
            const result = await stripe?.redirectToCheckout({
              sessionId: data.id
            });
            if (result?.error) {
              toast.error(result.error.message || "An error occurred during payment.");
            }
          } catch (error) {
            console.error("Error during redirectToCheckout:", error);
            toast.error("An error occurred during payment. Please try again later.");
          }

        } catch (error) {
          console.error("An error occurred:", error)
          toast.error("An error occurred. Please try again later.")
        }
      }
    }
  })

  const errors = () => {
    if (formik.errors) {
      const errorMessages = Object.values(formik.errors)
      errorMessages.forEach((errors: any) => toast.error(errors))
    }
  }

  const [cancelModal, setcancelModal] = useState(false)

  const cancelRide = () => {
    if (socket) {
      const ride_id = localStorage.getItem("currentRide-user")
      socket.emit("rideCancelled", ride_id)
      localStorage.removeItem("currentRide-user")
      navigate('/')
      toast.success("Ride cancelled successfully!")
    }
  }


  const [tab, settab] = useState(1);


  if (!isLoaded) {
    return (
      <>
        <div className='pr-4 mx-5 w-full text-center'>
          <Spinner size='lg' />
        </div>
      </>
    );
  }


  return (
    <div>
      <Dialog className='bg-transparent' open={cancelModal} handler={cancelRide}>
        {cancelModal &&
          <>
            <div className='w-full h-fit rounded-lg bg-gray-50 px-8 pt-8 flex flex-col text-center'>
              <div className='text-left'>
                <h1 className='text-2xl font-bold text-black'>
                  Are you sure want to cancel the ride?
                </h1>
              </div>
              <div className='mt-4 text-left w-full pr-7'>
                <h1 className='text-md font-medium text-red-500'>
                  Canceling a ride after it has already started may inconvenience your driver and affect their earnings.
                </h1>
                <h1 className='text-xs mt-3 pr-7'>
                  It may affect your Safely account. So please proceed with caution.
                </h1>
              </div>
              <div className='flex justify-end items-end h-fit mt-7 mb-7 gap-5'>
                <button
                  onClick={() => setcancelModal(false)}
                  className='btn'>dismiss</button>
                <button
                  onClick={() => cancelRide()}
                  className='btn btn-error text-white'>Cancel ride</button>
              </div>
            </div>
          </>
        }
      </Dialog>


      <Dialog className='bg-transparent' open={paymentModal} handler={handlePaymentModal}>
        {paymentModal &&
          <>
            <div x-data={{ isOpen: true }} className="relative flex justify-center">
              <div
                className="fixed inset-0 z-10 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                  </span>

                  <div className="relative inline-block px-4 pt-5 h-fit w-[35rem] pb-4 overflow-hidden  bg-white rounded-lg shadow-xl sm:align-middle  ">
                    <div className='mb-1'>
                      <div className="mt-2 text-center">
                        <h1 className="text-4xl font-bold text-black">
                          Your destination has been reached!
                        </h1>
                        <h1 className="mt-4 text-sm text-black">Thank you for choosing safely</h1>

                        <p className="mt-4 px-5 text-xs text-gray-500 dark:text-gray-400">
                          Now please pay the fare charge to the driver by choosing any of  the payment options available below
                        </p>

                        <div className='text-2xl mt-4 flex gap-2 w-full justify-center text-black'>
                          <h1>Fare charge</h1>
                          <h1 className='text-green-800'>
                            ₹{rideData?.price}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className='text-left px-8'>
                        <Accordion open={open === 1}>
                          <div className='flex items-center' onClick={() => handleOpen(1)}>
                            <Radio onChange={formik.handleChange} value="Wallet" name="paymentMode" className='text-xs' color="blue" crossOrigin={undefined} />
                            <AccordionHeader className='text-sm'>Safely Wallet</AccordionHeader>
                          </div>
                          <div className='px-11'>
                            <AccordionBody>
                              <div className='flex gap-4'>
                                <span> Wallet balance ₹{userData?.wallet?.balance}</span> <span>{rideData &&
                                  (userData?.wallet?.balance < rideData?.price) &&
                                  <p className='text-red-400'>Insufficient wallet balance</p>
                                }</span>
                              </div>
                            </AccordionBody>

                          </div>
                        </Accordion>

                        <Accordion open={open === 2}>
                          <div className='flex items-center' onClick={() => handleOpen(2)}>
                            <Radio onChange={formik.handleChange} value="Stripe" name="paymentMode" className='text-xs' color="blue" crossOrigin={undefined} />
                            <AccordionHeader className='text-sm'>Stripe - Payements made easy</AccordionHeader>
                          </div>
                          <div className='px-11'>
                            <AccordionBody>
                              Use the stripe payment service for online payments
                            </AccordionBody>
                          </div>
                        </Accordion>

                        <Accordion open={open === 3}>
                          <div className='flex items-center' onClick={() => handleOpen(3)}>
                            <Radio onChange={formik.handleChange} value="Cash in hand" name="paymentMode" className='text-xs' color="blue" crossOrigin={undefined} />
                            <AccordionHeader className='text-sm'>Pay in Cash</AccordionHeader>
                          </div>
                          <div className='px-11'>
                            <AccordionBody>
                              Pay the fare charge in cash
                            </AccordionBody>
                          </div>
                        </Accordion>
                      </div>
                      <div className="mt-5 mb-3 sm:flex sm:items-center sm:justify-center">
                        <div className="sm:flex sm:items-center ">
                          <button
                            type='submit'
                            onClick={() => errors()}
                            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                            PAY THE FARE
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </Dialog>


      {rideData && driverData && (
        <>
          <div className="container mx-auto px-2 pb-5 pt-2">
            {/* <div className="mb-4">
              <h1 className="text-4xl font-bold text-blue-800">Current ride</h1>
            </div> */}
            <div className='container w-full h-fit  drop-shadow-xl flex justify-center items-center'>
              <div className='w-full h-fit md:grid md:grid-cols-6 md:gap-4 mt-2 rounded-xl'>


                <div className='bg-indigo-50 drop-shadow-xl md:col-span-2 rounded-xl pt-1 pb-4 px-1'>
                  <Tabs position="relative" variant="unstyled">
                    <div className='px-1 mt-4'>
                      <TabList>
                        <Tab sx={{ fontSize: "14px" }} onClick={() => settab(1)}>
                          <h1 className={tab === 1 ? "font-bold text-indigo-400" : "font-normal"}>Driver Information</h1>
                        </Tab>
                        <Tab sx={{ fontSize: "14px" }} onClick={() => settab(2)}>
                          <h1 className={tab === 2 ? "font-bold text-indigo-400" : "font-normal"}>Contact</h1>
                        </Tab>
                        <Tab sx={{ fontSize: "14px" }} onClick={() => settab(3)}>
                          <h1 className={tab === 3 ? "font-bold text-indigo-400" : "font-normal"}>Driver feedbacks</h1>
                        </Tab>
                      </TabList>
                      <TabIndicator className={tab === 1 ? "ml-2" : "ml-0"} mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                    </div>
                    <TabPanels>
                      <TabPanel>

                        <div className='w-full flex mt-1 h-36  items-center justify-center '>
                          <div className="avatar h-max">
                            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={driverData?.driverImage} />
                            </div>
                          </div>
                        </div>
                        <div className=' text-center'>
                          <h1>{driverData?.name}</h1>
                          <div className='md:flex gap-3 md:justify-center'>
                            <div className='flex gap-2 justify-center'>
                              <h1>Cab model:</h1>
                              <h1> {driverData?.vehicle_details.model}</h1>
                            </div>
                            <div className='flex gap-2 justify-center'>
                              <h1>Reg ID:</h1>
                              <h1> {(driverData?.vehicle_details.registerationID.toUpperCase())}</h1>
                            </div>
                          </div>
                          <h1><strong>9567632318</strong></h1>
                        </div>
                        <div className='my-3'>

                          <hr
                            style={{
                              background: 'gray',
                              color: 'gray',
                              borderColor: 'gray',
                              opacity: "0.2",
                              height: '0.5px',
                              width: "80%",
                              margin: "auto"
                            }}
                          />
                        </div>


                        {!rideConfirmed ? (
                          <>
                            <div className='px-3 mt-3 flex flex-col gap-4'>
                              <div>
                                <h1 className='font-semibold text-indigo-400 mb-1'>Driver coming from</h1>
                                <div className='flex'>
                                  <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/a.png" alt="work-from-home" /><h1 className='ml-2 truncate'>{driverLocation}</h1>
                                </div>
                              </div>
                              <div>
                                <h1 className='font-semibold text-indigo-400 mb-1'>Will pick you from</h1>
                                <div className='flex'>
                                  <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/b.png" alt="work-from-home" /><h1 className='ml-2 truncate'>{rideData?.pickupLocation}</h1>
                                </div>
                              </div>
                              <div>
                                <h1 className='font-semibold text-indigo-400 mb-1'>Driver arrives in</h1>
                                <div className='flex'>
                                  <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/time.png" alt="work-from-home" /><h1 className='ml-2'>{duration}</h1>
                                </div>
                              </div>
                              <div className=''>
                                <h1 className='font-bold text-indigo-400'>OTP for Driver Confirmation</h1>
                                <div className='flex justify-center  items-center h-12 mt-1 mb-2'>
                                  <h1 className='font-bold text-4xl text-indigo-700 tracking-widest'>{rideData?.pin}</h1>
                                </div>
                                <div className='md:flex md:justify-between text-center md:text-left gap-1 bg-gray-100 rounded-2xl drop-shadow-lg items-center md:px-5 px-7 py-2'>
                                  <h1 className='text-[8pt] md:w-40'>Canceling a confirmed ride may affect your Safely account. Please proceed with caution.</h1>
                                  <button
                                    onClick={() => setcancelModal(true)}
                                    className='btn btn-error btn-sm text-white'>cancel the ride</button>
                                </div>
                              </div>
                            </div>

                          </>
                        ) : (
                          <>
                            <div className='px-3 mt-3'>
                              <h1 className='font-bold text-indigo-400'>Ride Details</h1>
                            </div>
                            <div className=' px-5 py-5 flex flex-col gap-6'>
                              <div className='flex  gap-2'>
                                <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/street-view.png" alt="work-from-home" />
                                <h1 className='truncate'>{rideData?.pickupLocation}</h1>
                              </div>
                              <div className='flex  gap-2'>
                                <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/home-page.png" alt="work-from-home" />
                                <h1 className='truncate'>{rideData?.dropoffLocation}</h1>
                              </div>

                              <div className='flex  justify-start gap-5'>
                                <div className='flex gap-2'>
                                  <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/time.png" alt="work-from-home" />
                                  <h1 className='truncate'>{rideData?.duration}</h1>
                                </div>
                                <div className='flex gap-2'>
                                  <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/point-objects.png" alt="work-from-home" />
                                  <h1 className='truncate'>{rideData?.distance}</h1>
                                </div>
                                <div className='flex gap-2'>
                                  <img width="25" height="25" src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/banknotes.png" alt="work-from-home" />
                                  <h1 className='truncate'>₹{rideData?.price}</h1>
                                </div>
                              </div>
                              <div className='my-1'>
                                <hr
                                  style={{
                                    background: 'gray',
                                    color: 'gray',
                                    borderColor: 'gray',
                                    opacity: "0.2",
                                    height: '0.5px',
                                    width: "80%",
                                    margin: "auto"
                                  }}
                                />
                              </div>
                              <div className='text-center'>
                                <h1 className='font-bold text-2xl text-indigo-400'>Your safety is our top priority. Have a smooth journey!</h1>
                              </div>
                            </div>

                          </>
                        )}
                      </TabPanel>
                      <TabPanel>
                        <div className='bg-white rounded-2xl pt-3 px-3 md:h-[38.5rem] w-full flex flex-col justify-between'>
                          <div className='h-[20rem] md:h-[35.5rem] pb-2 chat-container overflow-y-auto'>
                            <ChatList />
                          </div>
                          <div className='mb-3 w-full'>
                            <ChatInputField addMessage={addMessage} />
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className='bg-indigo-50 rounded-2xl pt-3 px-3 md:h-[38.5rem] w-full'>
                          <div className='h-[20rem] md:h-[35.5rem] pb-2 chat-container overflow-y-auto'>
                            <div className='grid gap-3'>
                            {feedbacks.map((feedbacks: any) => {
                              return (
                                <div className="card bg-base-100 shadow-xl">
                                  <div className="card-body">
                                    <h2 className="card-title">"{feedbacks.feedback}"</h2>
                                    <div className="card-actions mt-1 ml-2">
                                      <div className="rating gap-1">
                                        <input checked={feedbacks.rating === 1} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                        <input checked={feedbacks.rating === 2} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                        <input checked={feedbacks.rating === 3} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                        <input checked={feedbacks.rating === 4} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                        <input checked={feedbacks.rating === 5} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                      </div>
                                    </div>
                                    <div className="w-full text-right">
                                      <p>{feedbacks.formattedDate}</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>




                <div className='drop-shadow-xl h-96 mt-5 md:mt-0 md:h-auto w-full md:col-span-4 rounded-xl'>
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
          </div>
        </>
      )}

      {!rideData && (
        <div className='w-full text-center my-3'>
          <h1>No active rides</h1>
        </div>
      )}
    </div>
  )
}

export default UserCurrentRide