import { useEffect, useState } from 'react'
import axiosInstance from '../../../services/axios'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Input } from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { Switch } from "@material-tailwind/react";



const DriverInfo = () => {


  const driver_id = useSelector((store: any) => store.driver.driver_id)

  const [driverData, setdriverData] = useState<any | {}>({})
  useEffect(() => {

    const getData = async () => {
      const { data } = await axiosInstance.get(`/driver/driverData?driver_id=${driver_id}`)
      setdriverData(data)
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
        console.log(values);

        const { data } = await axiosInstance.post(`/driver/profileUpdate?driver_id=${driver_id}`, values)
        if (data.message === "Success") {
          setdriverData(data.driverData)
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


  const updateStatus = async () => {
    try {
      const { data } = await axiosInstance.get(`/driver/updateStatus?driver_id=${driver_id}`)
      if (data.message === "Success") {
        setdriverData(data.driverData)
        toast.success("Status updated successfully!")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error((error as Error).message)
    }
  }


  return (
    <>
      <div className='bg-gray-100 w-[96%] mx-auto h-fit rounded-2xl drop-shadow-2xl md:flex items-center px-5'>
        <div className='md:w-1/3 md:h-96 h-80'>
          <div className='h-full flex flex-col gap-1 justify-center items-center'>
            <div className="avatar">
              <div className="w-36 rounded-full drop-shadow-xl">
                <img src={driverData?.driverImage} />
              </div>
            </div>
            <div>
              <h1 className='text-xl font-semibold'>
                {driverData?.name}
              </h1>
            </div>
            <div className='flex gap-1'>
              <h1 className='text-sm'>Safely Rating :</h1>
              <h1 className='text-sm'> {driverData?.ratings} ratings</h1>
            </div>
            <div className='flex gap-3 mt-2'>
              <h1 className='font-medium text-lg'>Currently Available </h1>
              <Switch
                checked={driverData?.isAvailable}
                onChange={updateStatus}
                id="custom-switch-component"
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                crossOrigin={undefined}
              />
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
                <Input label={driverData?.name} disabled crossOrigin={undefined} />
                <p className='w-1/2 md:hidden'>Mobile</p>
                <Input label={driverData && driverData.mobile ? driverData.mobile.toString() : ''} disabled crossOrigin={undefined} />
              </div>
              <div className='w-full flex gap-6 -mb-3'>
                <p className='w-1/2'>Email</p>
                <p className='w-1/2 hidden md:block'>Referral Code</p>
              </div>
              <div className='md:flex gap-6'>
                <Input label={driverData?.email} disabled crossOrigin={undefined} />
                <p className='w-1/2 md:hidden'>Refferl Code</p>
                <Input label={driverData?.referral_code} disabled crossOrigin={undefined} />
              </div>
              <div className='w-full flex gap-6 -mb-3'>
                <p className='w-1/2'>Account Status</p>
                <p className='w-1/2 hidden md:block'>Joining Date</p>
              </div>
              <div className='md:flex gap-6'>
                <Input label={driverData?.account_status} disabled crossOrigin={undefined} />
                <p className='w-1/2 md:hidden'>Joining Date</p>
                <Input label={driverData?.joiningDate} disabled crossOrigin={undefined} />
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
                <input name='name' onChange={formik.handleChange} type="text" placeholder={driverData?.name} className="input input-bordered input-sm py-[1.16rem] w-full max-w-xs" />
                <p className='w-1/2 md:hidden'>Mobile</p>
                <input name='mobile' onChange={formik.handleChange} type="number" placeholder={driverData?.mobile} className="input input-bordered input-sm py-[1.16rem] w-full max-w-xs" />
              </div>
              <div className='w-full flex gap-6 -mb-3'>
                <p className='w-1/2'>Email</p>
                <p className='w-1/2 hidden md:block'>Referral Code</p>
              </div>
              <div className='md:flex gap-6'>
                <input name='email' onChange={formik.handleChange} type="text" placeholder={driverData?.email} className="input input-bordered input-sm py-[1.16rem] w-full max-w-xs" />
                <p className='w-1/2 md:hidden'>Refferl Code</p>
                <Input label={driverData?.referral_code} disabled crossOrigin={undefined} />
              </div>
              <div className='w-full flex gap-6 -mb-3'>
                <p className='w-1/2'>Account Status</p>
                <p className='w-1/2 hidden md:block'>Joining Date</p>
              </div>
              <div className='md:flex gap-6'>
                <Input label={driverData?.account_status} disabled crossOrigin={undefined} />
                <p className='w-1/2 md:hidden'>Joining Date</p>
                <Input label={driverData?.joiningDate} disabled crossOrigin={undefined} />
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
  )
}

export default DriverInfo