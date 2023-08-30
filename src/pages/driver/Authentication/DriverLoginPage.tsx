import DriverLogin from '../../../components/driver/Authentication/Login/DriverLogin'
import {useLocation} from 'react-router-dom'

function DriverLoginPage() {
  const location = useLocation()
  const {status} = location.state || { status: "" }
  return (
    <div>
        <DriverLogin status={status}/>
    </div>
  )
}

export default DriverLoginPage