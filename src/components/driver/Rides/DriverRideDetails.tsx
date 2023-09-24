import { toast } from 'react-hot-toast'
import { Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { RideDetails } from '../../../utils/Interfaces'
import { useDispatch } from 'react-redux'
import { closeDriverRideData } from '../../../services/redux/slices/driverRideDataSlice'
import axiosInstance from '../../../services/axios'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Chip } from '@material-tailwind/react'

const DriverRideDetails = ({ ride_id }: { ride_id: string }) => {
    const [rideData, setrideData] = useState<RideDetails | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance(`/driver/getRideDetails?ride_id=${ride_id}`)
            setrideData(data)
        }
        getData()
        return ()=>{
            setrideData(null)
        }
    }, [])

    if (!rideData) {
        return (
            <>
                <div className='pr-4 mx-5 h-10 w-full text-center'>
                    <Spinner size='lg' />
                </div>
            </>
        )
    }

    return (
        <>
            <div className='pr-4 mx-5'>
                <div className="flex w-fit border text-white bg-black px-3 py-1 rounded-xl hover:border-black hover:bg-transparent hover:text-black hover:drop-shadow-xl cursor-pointer transition-colors ease-in-out duration-500 items-center gap-1">
                    <ArrowLeftIcon strokeWidth={2} className="h-3 w-4" />
                    <h1
                        onClick={() => dispatch(closeDriverRideData())}
                    >Back</h1>
                </div>
                <div className='w-full md:flex h-fit bg-white mt-5 pb-3 rounded-2xl'>
                    <div className='h-full w-full py-3 px-7'>
                        <div className='h-4/6'>
                            <h1 className='font-semibold mt-2'>Ride Information</h1>
                            <div className='md:flex grid grid-rows-3 gap-3 md:gap-0 justify-between px-7 mt-6'>
                                <div className='tooltip text-left' data-tip={rideData?.pickupLocation}>
                                    <h1 className='text-sm font-extrabold'>PICKUP</h1>
                                    <h1 className='text-gray-600 text-sm max-w-[20rem] truncate'>{rideData?.pickupLocation}</h1>
                                </div>
                                <div className='tooltip text-left' data-tip={rideData?.dropoffLocation}>
                                    <h1 className='text-sm font-extrabold' >DROPOFF</h1>
                                    <h1 className='text-gray-600 text-sm truncate max-w-[20rem] ' >{rideData?.dropoffLocation}</h1>
                                </div>
                                <div>
                                    <h1 className='text-sm font-extrabold'>DATE</h1>
                                    <h1 className='text-gray-600 text-sm truncate max-w-[20rem]'>{rideData?.date}</h1>
                                </div>
                            </div>
                            <div className='md:flex grid grid-rows-3 gap-3 md:gap-0 justify-between px-7 mt-2 md:mt-10 border-b-2 pb-9'>
                                <div>
                                    <h1 className='text-sm font-extrabold'>DISTANCE</h1>
                                    <h1 className='text-gray-600 text-sm'>{rideData?.distance}</h1>
                                </div>
                                <div>
                                    <h1 className='text-sm font-extrabold'>DURATION</h1>
                                    <h1 className='text-gray-600 text-sm'>{rideData?.duration}</h1>
                                </div>
                                <div>
                                    <h1 className='text-sm font-extrabold'>AMOUNT</h1>
                                    <h1 className='text-gray-600 text-sm'>₹{rideData?.price}</h1>
                                </div>
                                {rideData?.status === "Completed" &&
                                    <div>
                                        <h1 className='text-sm font-extrabold'>PAYMENT METHOD</h1>
                                        <h1 className='text-gray-600 text-sm'>{rideData?.paymentMode}</h1>
                                    </div>
                                }
                                <div>
                                    <h1 className='text-sm font-extrabold'>STATUS</h1>
                                    <Chip
                                        size="sm"
                                        variant="ghost"
                                        value={rideData?.status}
                                        color={
                                            rideData?.status === "Completed"
                                                ? "green"
                                                : rideData?.status === "Pending"
                                                    ? "cyan"
                                                    : rideData?.status === "Confirmed"
                                                        ? "purple"
                                                        : rideData?.status === "Cancelled"
                                                            ? "red"
                                                            : "yellow"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='h-2/6'>
                            {rideData?.status === "Completed" && (<>
                            <h1 className='font-semibold mt-3'>Feedback</h1>
                                {rideData?.feedback ? (
                                    <>
                                        <div className=' w-full h-full flex flex-col gap-3 px-5 pt-2'>
                                            <h1>
                                                "{rideData?.feedback}"
                                            </h1>
                                            <div className="rating gap-1 w-3/4">
                                                <input checked={rideData?.rating === 1} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                                <input checked={rideData?.rating === 2} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                                <input checked={rideData?.rating === 3} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                                <input checked={rideData?.rating === 4} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                                <input checked={rideData?.rating === 5} type="radio" name="rating" className="mask mask-heart bg-red-400" />
                                            </div>
                                        </div>
                                    </>
                                ) :
                                    <div>
                                        <h1 className='mt-2 text-gray-700'>Passenger didnt provided a feedback yet!</h1>
                                    </div>
                                }</>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DriverRideDetails