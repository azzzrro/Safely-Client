import axiosInstance from "../../../services/axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const DriverFeedbacks = () => {

    const driver_id = useSelector((store: any) => store.driver.driver_id)

    const [feedbacks, setfeedbacks] = useState<null | any>([])

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get(`/driver/driverData?driver_id=${driver_id}`)
            console.log(data);
            
            setfeedbacks(data.formattedFeedbacks)
        }
        getData()
    }, [])

    return (
        <>
            <div className='bg-gray-100 w-[96%] mx-auto h-fit py-5 rounded-2xl drop-shadow-2xl md:flex items-center px-5'>
                <div className='w-full md:h-fit h-fit grid grid-cols-3'>
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
        </>
    )
}

export default DriverFeedbacks