import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { RideDetails } from "../../../utils/Interfaces";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Spinner } from '@chakra-ui/react'


const ENDPOINT = import.meta.env.VITE_API_URL;

export const DriverDashboard = () => {


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };




    const driver_id = useSelector((store: any) => store.driver.driver_id)

    const [driverData, setdriverData] = useState<any | null>(null);
    const [chartData, setchartData] = useState(null)
    const [pieChartData, setpieChartData] = useState<any[] | []>([])
    const [currentMonthRide, setcurrentMonthRide] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get(`/driver/dashboardData?driver_id=${driver_id}`)
            setchartData(data.chartData)
            setpieChartData(data.pieChartData)
            setdriverData(data.driverData);
            setcurrentMonthRide(data.CurrentMonthRides)
        }
        getData();
    }, [])

    useEffect(() => {
        console.log(pieChartData, "charttt");
    }, [pieChartData])

    const navigate = useNavigate()

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

                {rides &&

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
                }

                {(!driverData || !chartData || !pieChartData || !currentMonthRide) ? (
                    <>
                        <div className='pr-4 mx-5 w-full text-center'>
                            <Spinner size='lg' />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-[95%] mx-auto md:h-fit h-fit md:grid-cols-3  md:gap-8 grid  gap-5 ">
                            <div className="bg-green-200  rounded-3xl md:grid-cols-1 grid grid-rows-5 gap-1 drop-shadow-xl">
                                <div className=" row-span-2 flex items-center px-3">
                                    <h1 className="text-2xl font-medium text-white">This month rides</h1>
                                </div>
                                <div className=" row-span-3 flex items-center justify-end">
                                    <h1 className="text-8xl px-2 text-white">{currentMonthRide}</h1>
                                </div>
                            </div>
                            <div className="bg-green-200  rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                                <div className=" row-span-2 flex items-center px-3">
                                    <h1 className="text-2xl font-medium text-white">Total Earnings</h1>
                                </div>
                                <div className=" row-span-3 flex items-center justify-end">
                                    <h1 className="text-8xl px-2 text-white">₹{driverData?.RideDetails?.totalEarnings}</h1>
                                </div>
                            </div>
                            <div className="bg-green-200  rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                                <div className=" row-span-2 flex items-center px-3">
                                    <h1 className="text-2xl font-medium text-white">Total Rides</h1>
                                </div>
                                <div className=" row-span-3 flex items-center justify-end">
                                    <h1 className="text-8xl px-2  text-white">{driverData?.RideDetails?.completedRides}</h1>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-16 md:grid-cols-2 md:gap-8 grid">
                            <div>
                            <h1 className="pl-8 mb-8 font-bold">EARNINGS PER MONTH</h1>
                                {chartData &&
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={chartData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                    </LineChart>
                                }
                            </div>
                            <div>
                                <h1 className="pb-8 font-bold">PAYMENT METHODS</h1>
                                {pieChartData &&
                                    <PieChart width={400} height={220}>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                }
                                <div className="flex gap-5">
                                    <h1 className="text-green-500">Wallet Payment</h1>
                                    <h1 className="text-yellow-700">Cash in hand</h1>
                                    <h1 className="text-blue-700">Card Payment</h1>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    );
};
