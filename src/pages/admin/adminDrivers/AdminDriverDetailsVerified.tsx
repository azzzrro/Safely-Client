import React from "react";
import { AdminNavbar } from "../../../components/admin/AdminNavbar";
import VerifiedDetails from "../../../components/admin/DriversData/VerifiedDetails";

const AdminDriverDetailsVerified = () => {
    return (
        <>
            <AdminNavbar />
            <div className="admin-container">
                <VerifiedDetails />
            </div>
        </>
    );
};

export default AdminDriverDetailsVerified;
