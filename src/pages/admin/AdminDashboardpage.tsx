import React from "react";
import { AdminDashboard } from "../../components/admin/DashboardData/AdminDashboard";
import { AdminNavbar } from "../../components/admin/AdminNavbar";

export const AdminDashboardpage = () => {
    return (
        <>
            <AdminNavbar />
            <AdminDashboard />
        </>
    );
};
