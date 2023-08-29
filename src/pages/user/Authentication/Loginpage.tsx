import Login from "../../../components/user/Authentication/Login/Login"
import {useLocation} from 'react-router-dom'

function Loginpage() {
  const location = useLocation()
  const {status} = location.state || { status: "" }
  return (
    <div>
        <Login status={status}/>
    </div>
  )
}

export default Loginpage