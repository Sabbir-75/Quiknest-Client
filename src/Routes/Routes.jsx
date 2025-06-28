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
                path: "/addparcel",
                loader: () => fetch("./warehouses.json"),
                Component: AddParcel
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
                path: "myparcels",
                Component: MyParcels,
            },
            {
                path: "payment/:id",
                Component: Payment,
            },
        ]
    }
])