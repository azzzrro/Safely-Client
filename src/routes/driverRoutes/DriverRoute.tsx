// import { RouterProvider, createBrowserRouter,Navigate } from "react-router-dom";
// import { ProtectedRoutes } from "./ProtectedRoutes";
// import { useSelector } from "react-redux";


// import DriverSignupPage from "../../pages/driver/Authentication/DriverSignupPage";
// import DriverIdentificationPage from "../../pages/driver/Authentication/DriverIdentificationPage";
// import DriverLoginPage from "../../pages/driver/Authentication/DriverLoginPage";
// import { DriverDashboardpage } from "../../pages/driver/Dashboard/DriverDashboardpage";


// const DriverRoute = () => {
//     const driver = useSelector((store:any)=>store.driver.driver)

//     const routesForAuthenticatedOnly = [
//         {
//             path: "/driver/dashboard",
//             element: <ProtectedRoutes />,
//             children: [
//                 {
//                     path: "/driver/dashboard",
//                     element: <DriverDashboardpage/>,
//                 },
//             ],
//         },
//     ];

//     const routesForNotAuthenticatedOnly = [
//         {
//             path: "/driver/signup",
//             element: <DriverSignupPage />,
//         },
//         {
//             path: "/driver/login",
//             element: <DriverLoginPage />,
//         },
//         {
//             path: "/driver/identification",
//             element: <DriverIdentificationPage />,
//         }
//     ];

//     const redirect = [
//         {
//             path: "/driver/signup",
//             element: <Navigate to={"/driver/dashboard"}/>,
//         },
//         {
//             path: "/driver/login",
//             element: <Navigate to={"/driver/dashboard"}/>,
//         },
//         {
//             path: "/driver/identification",
//             element: <Navigate to={"/driver/dashboard"}/>,
//         },
//     ];


//     const driverRoutes = createBrowserRouter([
//         ...(!driver ? routesForNotAuthenticatedOnly : redirect),
//         ...routesForAuthenticatedOnly,
//     ]);

//     return <RouterProvider router={driverRoutes} />;
// }

// export default DriverRoute