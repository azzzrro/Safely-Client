import DriverLogin from "../../../components/driver/Authentication/Login/DriverLogin";
import { useSelector } from "react-redux";
import { PendingModal } from "../../../components/PendingModal";

function DriverLoginPage() {
    const { isOpen } = useSelector((store: any) => store.pendingModal);
    return (
        <div>
            {isOpen && <PendingModal />}
            <DriverLogin />
        </div>
    );
}

export default DriverLoginPage;
