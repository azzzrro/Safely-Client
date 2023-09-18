// import { RouterProvider, createBrowserRouter,Navigate } from "react-router-dom";
// import { ProtectedRoutes } from "./ProtectedRoutes";
// import { useSelector } from "react-redux";


// import { AdminDrivers } from "../../pages/admin/adminDrivers/AdminDrivers";
// import { AdminDriverDetailsPending } from "../../pages/admin/adminDrivers/AdminDriverDetailsPending";
// import AdminDriverDetailsVerified from "../../pages/admin/adminDrivers/AdminDriverDetailsVerified";
// import AdminUsers from "../../pages/admin/adminUsers/AdminUsers";
// import AdminUserDetails from "../../pages/admin/adminUsers/AdminUserDetails";

// import { AdminLoginPage } from "../../pages/admin/AdminLoginPage";
// import { AdminDashboardpage } from "../../pages/admin/AdminDashboardpage";


// const AdminRoute = () => {
//     const admin = useSelector((store:any)=>store.admin.admin)

//     const routesForAuthenticatedOnly = [
//         {
//             path: "/admin/",
//             element: <ProtectedRoutes />,
//             children: [
//                 {
//                     path: "/admin/dashboard",
//                     element: <AdminDashboardpage/>,
//                 },
//                 {
//                     path: "/admin/drivers",
//                     element: <AdminDrivers/>,
//                 },
//                 {
//                     path: "/admin/pendingDriver/:id",
//                     element: <AdminDriverDetailsPending/>,
//                 },
//                 {
//                     path: "/admin/verifiedDriver/:id",
//                     element: <AdminDriverDetailsVerified/>,
//                 },
//                 {
//                     path: "/admin/users",
//                     element: <AdminUsers/>,
//                 },
//                 {
//                     path: "/admin/userDetails/:id",
//                     element: <AdminUserDetails/>,
//                 },
//             ],
//         },
//     ];

//     const routesForNotAuthenticatedOnly = [
//         {
//             path: "/admin/login",
//             element: <AdminLoginPage />,
//         },
//     ]

//     const redirect = [
//         {
//             path: "/admin/login",
//             element: <Navigate to={"/admin/dashboard"}/>,
//         },
//     ]

//     const adminRoutes = createBrowserRouter([
//         ...(!admin ? routesForNotAuthenticatedOnly : redirect),
//         ...routesForAuthenticatedOnly,
//     ]);

//     return <RouterProvider router={adminRoutes} />;

// }

// export default AdminRoute