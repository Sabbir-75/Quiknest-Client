import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Coverage from "../Pages/Coverage/Coverage";
import AddParcel from "../Pages/AddParcel/AddParcel";
import PrivateRoute from "../Context/PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/PaymentStripe/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "../Context/AdminRoute/AdminRoute";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoute from "../Context/RiderRoute/RiderRoute";
import CompleteDelivered from "../Pages/Dashboard/CompleteDelivered/CompleteDelivered";
import Earning from "../Pages/Dashboard/Earning/Earning";
import TrackingParcels from "../Pages/Dashboard/TrackingParcels/TrackingParcels";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/coverage",
                loader: () => fetch("./warehouses.json"),
                Component: Coverage
            },
            {
                path: "/bearider",
                loader: () => fetch("./warehouses.json"),
                Component: BeARider
            },
            {
                path: "/addparcel",
                loader: () => fetch("./warehouses.json"),
                element: <PrivateRoute><AddParcel></AddParcel></PrivateRoute>
            },
            {
                path: "/forbidden",
                Component: Forbidden
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/signup",
                Component: Signup
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index:true,
                Component: DashboardHome,
            },
            {
                path: "myparcels",
                Component: MyParcels,
            },
            {
                path: "payment/:id",
                Component: Payment,
            },
            {
                path: "payment-history",
                Component: PaymentHistory,
            },
            {
                path: "tracking",
                Component: TrackingParcels,
            },
            {
                path: "earning",
                element:<RiderRoute><Earning></Earning></RiderRoute>
            },
            {
                path: "complete_delivered",
                element: <RiderRoute><CompleteDelivered></CompleteDelivered></RiderRoute>
            },
            {
                path: "pending_deliveries",
                element:<RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
            },
            {
                path: "pending_riders",
                element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
            },
            {
                path: "active_riders",
                element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
            },
            {
                path: "make_admin",
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
            },
            {
                path: "assignrider",
                element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
            },
        ]
    }
])