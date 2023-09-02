import Login from "../../../components/user/Authentication/Login/Login";
import { PendingModal } from "../../../components/PendingModal";
import { useSelector } from "react-redux";

function Loginpage() {
    const { isOpen } = useSelector((store: any) => store.pendingModal);

    return (
        <div>
            {isOpen && <PendingModal />}
            <Login />
        </div>
    );
}

export default Loginpage;
