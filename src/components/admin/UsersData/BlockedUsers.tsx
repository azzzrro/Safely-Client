import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { useNavigate } from "react-router-dom";

const BlockedUsers = () => {

    const [usersData, setusersData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get("/admin/blockedUsers");
            setusersData(data);
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

                        {usersData.map((users: any, index) => {
                            return (
                                <tr key={index + 1}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={users.userImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{users.name}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{users.mobile}</td>
                                    <td>{users.email}</td>
                                    <th>
                                        <button
                                            onClick={() => navigate("/admin/userDetails/" + users._id)}
                                            className="btn btn-primary btn-xs relative right-2"
                                        >
                                            MORE DETAILS
                                        </button>
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

export default BlockedUsers