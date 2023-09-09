import React from "react";
import PendingUserDetails from "../../../components/admin/UsersData/UserDetails";
import { AdminNavbar } from "../../../components/admin/AdminNavbar";

const AdminUserDetails = () => {
    return (
        <>
            <AdminNavbar />
            <div className="admin-container drop-shadow-xl">
                <PendingUserDetails />
            </div>
        </>
    );
};

export default AdminUserDetails;
