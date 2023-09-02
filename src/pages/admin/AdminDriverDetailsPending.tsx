import React from "react";
import { AdminNavbar } from "../../components/admin/AdminNavbar";
import DriversDetails from "../../components/admin/DriversData/DriversDetails";

export const AdminDriverDetailsPending = () => {
    return (
        <>
            <AdminNavbar />
            <div className="admin-container">
                <DriversDetails />
            </div>
        </>
    );
};
