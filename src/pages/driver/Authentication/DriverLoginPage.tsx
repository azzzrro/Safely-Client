import DriverLogin from "../../../components/driver/Authentication/Login/DriverLogin";
import { useSelector } from "react-redux";
import { PendingModal } from "../../../components/PendingModal";
import { RejectedModal } from "../../../components/RejectedModal";

function DriverLoginPage() {
    const { isOpenPending } = useSelector((store: any) => store.pendingModal);
    const {isOpenRejected} = useSelector((store:any)=>store.rejectedModal)

    return (
        <div>
            {isOpenPending && <PendingModal />}
            {isOpenRejected && <RejectedModal/>}
            <DriverLogin />
        </div>
    );
}

export default DriverLoginPage;
