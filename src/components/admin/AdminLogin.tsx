import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../services/redux/slices/adminAuthSlice";
import axiosAdmin from '../../services/axios/axiosAdmin'


export const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Please enter a valid email").required("Please enter an email"),
            password: Yup.string()
                .required("Passowrd is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const {data} = await axiosAdmin(null).post('login',values)
                console.log(data,"dataaaaa");
                
                if(data.message === "Success"){
                    toast.success("Login successfull!")
                    dispatch(adminLogin({admin:data.email,adminToken:data.token}))
                    navigate('/admin/dashboard')
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error((error as Error).message);
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const iconsColor = "text-gray-400";
    const with_error_class = "pl-2 outline-none border-b border-red-400 w-full";
    const without_error_class = "pl-2 outline-none border-b w-full";

    return (
        <>
            <div className="admin-login-container h-screen flex justify-center items-center">
                <div className="admin-login-container-second w-5/6 md:w-3/6 md:h-4/6  md:flex justify-center items-center bg-white rounded-3xl my-5 drop-shadow-2xl">
                    <div className="flex flex-col justify-center h-full sm:pl-14 md:pl-10 md:w-1/2 i mb-3 md:m-0">
                        <div className="">
                            <h1 className="text-blue-800 font-bold text-4xl mx-7 md:mx-0  md:text-5xl user-signup-title md:max-w-sm">
                                Admin Login
                            </h1>
                        </div>
                        <div className="">
                            <h1 className="text-blue-800 md:max-w-xs font-normal text-sm my-3 mx-7 md:mx-0  md:text-base md:mt-3 user-signup-title">
                            Please enter the admin email and password to login!
                            </h1>
                        </div>
                    </div>

                    <div className="flex md:w-1/2 justify-center pb-10 md:py-10 md:pr-3 md:mr-4 items-center">
                        <div className="admin-login-form md:w-11/12 px-7 py-8  bg-white drop-shadow-2xl">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="text-center">
                                    <h1 className="text-gray-800 font-bold text-3xl mt-7 mb-7">Welcome back!</h1>
                                </div>
                                {/* <div className="text-center">
                                    <h1 className="text-gray-800 font-normal max-w-xs mb-5">
                                        Please enter the admin email and password to login
                                    </h1>
                                </div> */}
                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <AlternateEmailIcon className={iconsColor} />
                                    <input
                                        className={
                                            formik.touched.email && formik.errors.email
                                                ? with_error_class
                                                : without_error_class
                                        }
                                        type="text"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id=""
                                        placeholder="Email Address"
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <p className="form-error-p-tag">{formik.errors.email}</p>
                                )}

                                <div className="flex items-center  py-2 px-3 rounded-2xl mb-2">
                                    <VpnKeyIcon className={iconsColor} />
                                    <input
                                        className={
                                            formik.touched.password && formik.errors.password
                                                ? with_error_class
                                                : without_error_class
                                        }
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        id=""
                                        placeholder="Password"
                                    />
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="form-error-p-tag">{formik.errors.password}</p>
                                )}

                                <button
                                    type="submit"
                                    className="block w-full bg-blue-800 py-2 rounded-2xl text-golden font-semibold mt-3 mb-3"
                                >
                                    Log in
                                </button>
                                {/* <span
                                    onClick={() => {
                                        navigate("/login", { state: { status: "" } });
                                    }}
                                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                                >
                                    Already a member? Login here
                                </span> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
