import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {

  const admin = useSelector((store:any)=>store.admin.admin)

  if(!admin){
    return <Navigate to="/admin/login" />;
  }
  return <Outlet />;
}
