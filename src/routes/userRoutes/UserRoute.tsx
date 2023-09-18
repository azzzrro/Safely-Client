// import { RouterProvider, createBrowserRouter,Navigate } from "react-router-dom";
// import { ProtectedRoutes } from "./ProtectedRoutes";
// import { useSelector } from "react-redux";

// import { Homepage } from "../../pages/user/Home/Homepage";
// import Loginpage from "../../pages/user/Authentication/Loginpage";
// import Signuppage from "../../pages/user/Authentication/Signuppage";
// import Identificationpage from "../../pages/user/Authentication/Identificationpage";
// import Profilepage from "../../pages/user/Home/Profilepage";

// const UserRoute = () => {
//     const user = useSelector((store: any) => store.user.user);

//     const routesForPublic = [
//         {
//             path: "/",
//             element: <Homepage />,
//         },
//     ];

//     const routesForAuthenticatedOnly = [
//         {
//             path: "/",
//             element: <ProtectedRoutes />,
//             children: [
//                 {
//                     path: "/profile",
//                     element: <Profilepage />,
//                 },
//             ],
//         },
//     ];


//     const routesForNotAuthenticatedOnly = [
//         {
//             path: "/login",
//             element: <Loginpage />,
//         },
//         {
//             path: "/signup",
//             element: <Signuppage />,
//         },
//         {
//             path: "/identification",
//             element: <Identificationpage />,
//         },
//     ];

//     const redirect = [
//         {
//             path: "/login",
//             element: <Navigate to={'/'}/>,
//         },
//         {
//             path: "/signup",
//             element: <Navigate to={'/'}/>,
//         },
//         {
//             path: "/identification",
//             element: <Navigate to={'/'}/>,
//         },
//     ];
    

//     const userRoutes = createBrowserRouter([
//         ...routesForPublic,
//         ...(!user ? routesForNotAuthenticatedOnly : redirect),
//         ...routesForAuthenticatedOnly,
//     ]);

//     return <RouterProvider router={userRoutes} />;
// };

// export default UserRoute;
