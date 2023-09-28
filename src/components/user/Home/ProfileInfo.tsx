import { useEffect, useState } from 'react'
import axiosInstance from '../../../services/axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Input } from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast';

const ProfileInfo = () => {

    const user_id = useSelector((store: any) => store.user.user_id)

    const [userData, setuserData] = useState<any | {}>({})
    useEffect(() => {

        const getData = async () => {
            const { data } = await axiosInstance.get(`/userData?id=${user_id}`)
            setuserData(data)
        }
        getData()
    }, [])

    const [editProfile, seteditProfile] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "Type a valid name"),
            email: Yup.string().email("Please enter a valid email"),
            mobile: Yup.string().length(10, "Please enter a valid number"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { data } = await axiosInstance.post(`/profileUpdate?user_id=${user_id}`, values)
                if (data.message === "Success") {
                    setuserData(data.userData)
                    seteditProfile(false)
                    toast.success("Profile updated successfully!")
                }
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
        <>
            <div className='bg-white w-[96%] mx-auto h-fit rounded-2xl drop-shadow-xl md:flex items-center px-5'>
                <div className='md:w-1/3 md:h-96 h-80'>
                    <div className='h-full flex flex-col gap-1 justify-center items-center'>
                        <div className="avatar">
                            <div className="w-36 rounded-full drop-shadow-xl">
                                <img src={userData?.userImage} />
                            </div>
                        </div>
                        <div>
                            <h1 className='text-xl font-semibold'>
                                {userData?.name}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className='md:w-2/3 h-full py-8 pr-7'>
                    {!editProfile ? (
                        <div className='flex flex-col w-full h-full gap-4'>
                            <div className='w-full flex gap-6 -mb-3'>
                                <p className='w-1/2'>Name</p>
                                <p className='w-1/2 hidden md:block'>Mobile</p>
                            </div>
                            <div className='md:flex gap-6'>
                                <Input label={userData?.name} disabled crossOrigin={undefined} />
                                <p className='w-1/2 md:hidden'>Mobile</p>
                                <Input label={userData && userData.mobile ? userData.mobile.toString() : ''} disabled crossOrigin={undefined} />
                            </div>
                            <div className='w-full flex gap-6 -mb-3'>
                                <p className='w-1/2'>Email</p>
                                <p className='w-1/2 hidden md:block'>Referral Code</p>
                            </div>
                            <div className='md:flex gap-6'>
                                <Input label={userData?.email} disabled crossOrigin={undefined} />
                                <p className='w-1/2 md:hidden'>Refferl Code</p>
                                <Input label={userData?.referral_code} disabled crossOrigin={undefined} />
                            </div>
                            <div className='w-full flex gap-6 -mb-3'>
                                <p className='w-1/2'>Account Status</p>
                                <p className='w-1/2 hidden md:block'>Joining Date</p>
                            </div>
                            <div className='md:flex gap-6 overflow-hidden'>
                                <Input label={userData?.account_status} disabled crossOrigin={undefined} />
                                <p className='w-1/2 md:hidden'>Joining Date</p>
                                <Input className='' label={userData?.formattedDate} disabled crossOrigin={undefined} />
                            </div>
                            <div className=''>
                                <button
                                    onClick={() => seteditProfile(true)}
                                    className='btn btn-sm btn-primary px-5 text-white'>EDIT PROFILE</button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className='flex flex-col w-full h-full gap-4'>
                            <div className='w-full flex gap-6 -mb-3'>
                                <p className='w-1/2'>Name</p>
                                <p className='w-1/2 hidden md:block'>Mobile</p>
                            </div>
                            <div className='md:flex gap-6'>
                                <input name='name' onChange={formik.handleChange} type="text" placeholder={userData?.name} className="input input-bordered input-sm py-[1.16rem] w-full max-w-[21.5rem]" />
                                <p className='w-1/2 md:hidden'>Mobile</p>
                                <input name='mobile' onChange={formik.handleChange} type="number" placeholder={userData?.mobile} className="input input-bordered input-sm py-[1.16rem] w-full max-w-[21.5rem]" />
                            </div>
                            <div className='w-full flex gap-6 -mb-3'>
                                <p className='w-1/2'>Email</p>
                                <p className='w-1/2 hidden md:block'>Referral Code</p>
                            </div>
                            <div className='md:flex gap-6'>
                                <input name='email' onChange={formik.handleChange} type="text" placeholder={userData?.email} className="input input-bordered input-sm py-[1.16rem] w-full max-w-[21.5rem]" />
                                <p className='w-1/2 md:hidden'>Refferl Code</p>
                                <Input label={userData?.referral_code} disabled crossOrigin={undefined} />
                            </div>
                            <div className='w-full flex gap-6 -mb-3'>
                                <p className='w-1/2'>Account Status</p>
                                <p className='w-1/2 hidden md:block'>Joining Date</p>
                            </div>
                            <div className='md:flex gap-6'>
                                <Input label={userData?.account_status} disabled crossOrigin={undefined} />
                                <p className='w-1/2 md:hidden'>Joining Date</p>
                                <Input label={userData?.joiningDate} disabled crossOrigin={undefined} />
                            </div>
                            <div className='flex gap-3'>
                                <button
                                    type='submit'
                                    className='btn btn-sm btn-success px-5 text-white'>SAVE CHANGES</button>
                                <button
                                    onClick={() => seteditProfile(false)}
                                    className='btn btn-sm btn-error px-5 text-white'>CANCEL</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;
