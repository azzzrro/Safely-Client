import { AdminNavbar } from "../../../components/admin/AdminNavbar";
import PendingDetails from "../../../components/admin/DriversData/PendingDetails";

export const AdminDriverDetailsPending = () => {
    return (
        <>
            <AdminNavbar />
            <div className="admin-container">
                <PendingDetails />
            </div>
        </>
    );
};
