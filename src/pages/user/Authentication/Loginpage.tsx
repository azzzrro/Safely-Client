import Login from "../../../components/user/Authentication/Login/Login";
import { PendingModal } from "../../../components/PendingModal";
import { useSelector } from "react-redux";
import { RejectedModal } from "../../../components/RejectedModal";

function Loginpage() {
    const { isOpenPending } = useSelector((store: any) => store.pendingModal);
    const {isOpenRejected} = useSelector((store:any)=>store.rejectedModal)

    return (
        <div>
            {isOpenPending && <PendingModal />}
            {isOpenRejected && <RejectedModal/>}
            <Login />
        </div>
    );
}

export default Loginpage;
