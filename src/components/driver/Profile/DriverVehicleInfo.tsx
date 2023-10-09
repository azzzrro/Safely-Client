import { useEffect, useState } from 'react'
import axiosDriver from '../../../services/axios/axiosDriver';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import toast from 'react-hot-toast'

const DriverVehicleInfo = () => {
    const {driver_id,driverToken} = useSelector((store: any) => store.driver)
    const [driverData, setdriverData] = useState<any | {}>({})

    
    const getData = async () => {
        try {
            const { data } = await axiosDriver(driverToken).get(`driverData?driver_id=${driver_id}`)
            setdriverData(data)
        } catch (error) {
            toast.error((error as Error).message)
            console.log(error);
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className='bg-gray-100 w-[96%] mx-auto h-fit rounded-2xl drop-shadow-2xl md:flex gap-4 px-5'>
                <div className='h-[22rem] md:w-1/5 w-full flex flex-col justify-center items-center text-center gap-4'>
                    <div>
                        <h1 className='text-xl font-semibold'>
                            Vehicle Model
                        </h1>
                        <h1>
                            {driverData?.vehicle_details?.model}
                        </h1>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold'>
                            Registration ID
                        </h1>
                        <h1>
                            {driverData?.vehicle_details?.registerationID}
                        </h1>
                    </div>
                </div>
                <div className='h-fit md:w-2/5 w-full py-5'>
                    <div>
                        <h1 className='text-xl font-semibold mb-2'>
                            RC IMAGE
                        </h1>
                    </div>
                    <div className='w-full h-fit bg-brown-300 rounded-2xl overflow-hidden'>
                        <img src={driverData?.vehicle_details?.rcImageUrl} width={"100%"} height={"100%"} alt="" />
                    </div>
                </div>
                <div className='h-fit md:w-2/5 w-full py-5'>
                    <div>
                        <h1 className='text-xl font-semibold mb-2'>
                            CAR IMAGE
                        </h1>
                    </div>
                    <div className='w-full h-fit bg-brown-300 rounded-2xl overflow-hidden'>
                        <img src={driverData?.vehicle_details?.carImageUrl} width={"100%"} height={"100%"} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DriverVehicleInfo