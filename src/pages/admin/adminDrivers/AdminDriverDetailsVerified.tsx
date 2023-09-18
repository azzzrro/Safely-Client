import React from "react";
import { AdminNavbar } from "../../../components/admin/AdminNavbar";
import VerifiedDetails from "../../../components/admin/DriversData/VerifiedDetails";

const AdminDriverDetailsVerified = () => {
    return (
        <>
            <AdminNavbar />
            <div className="admin-container rounded-3xl bg-gray-100 drop-shadow-xl md:mx-[8rem] mt-[2.5rem] pt-1">
                <VerifiedDetails />
            </div>
        </>
    );
};

export default AdminDriverDetailsVerified;
