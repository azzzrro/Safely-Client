import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosAdmin from '../../../services/axios/axiosAdmin'
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

const VerifiedFeedbacks = () => {
    const { id } = useParams();
    const [feedbacks, setfeedbacks] = useState<null | any>([])
    const { adminToken } = useSelector((store: any) => store.admin)

    const getData = async () => {
        try {
            const { data } = await axiosAdmin(adminToken).get(`driverFeedbacks?driver_id=${id}`)
            setfeedbacks(data)
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
    <div className='bg-gray-100 w-[96%] mx-auto h-fit py-5 rounded-2xl drop-shadow-2xl md:flex items-center px-5'>
                <div className='w-full md:h-fit h-fit grid grid-cols-3 gap-4'>
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

export default VerifiedFeedbacks