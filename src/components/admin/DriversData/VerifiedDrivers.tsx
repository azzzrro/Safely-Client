import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { useNavigate } from "react-router-dom";

export const VerifiedDrivers = () => {
    const [driversData, setdriversData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get("/admin/verifiedDrivers");
            setdriversData(data);
        };
        getData();
    }, []);

  return (
    <>
    <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SELECT</th>
                            <th>NO</th>
                            <th>NAME</th>
                            <th>MOBILE</th>
                            <th>EMAIL </th>
                            <th>MORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {driversData.map((drivers:any,index) => {
                            return (
                                <tr key={index+1} >
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>{index+1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={drivers.driverImage}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{drivers.name}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{drivers.mobile}</td>
                                    <td>{drivers.email}</td>
                                    <th>
                                        <button 
                                        onClick={()=>navigate('/admin/pendingDriver/'+drivers._id)}
                                        className="btn btn-primary btn-xs relative right-2">MORE DETAILS</button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                    {/* foot */}
                </table>
            </div>
    </>
  )
}
