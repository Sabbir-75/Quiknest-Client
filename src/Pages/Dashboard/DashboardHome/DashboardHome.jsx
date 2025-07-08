import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../Hooks/UseAuth/UseAuth";
import { useNavigate } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { FaBox, FaCheckCircle, FaPlus, FaSearch, FaTruck } from "react-icons/fa";
import { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Bar, Rectangle, Legend, Cell } from 'recharts';


const DashboardHome = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const useSecure = UseAxiosSecure()
    const { data: emails = [], isLoading } = useQuery({
        queryKey: ["userdashboardsummarydetails"],
        queryFn: async () => {
            const res = await useSecure.get(`/user/dashboard-summary/details`);
            return res.data;
        },
    });
    const { data: status = [] } = useQuery({
        queryKey: ["userdashboard-summarydelivery_status"],
        queryFn: async () => {
            const res = await useSecure.get(`/user/dashboard-summary/delivery_status`);
            return res.data;
        },
    });

    const COLORS = {
        assigned: "#8884d8",
        pending: "#FFBB28",
        delivered: "#82ca9d",
    };

    const newData = emails.filter(d => d.email === user?.email)
    console.log(newData);
    const newdelivery_status_assigned = status.filter(d => d.delivery_status === "assigned")
    const newdelivery_status_delivered = status.filter(d => d.delivery_status === "delivered")

    if (isLoading) return <p className="text-center mt-10">Loading dashboard...</p>;
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-4xl font-extrabold text-base-content text-center py-3">User</h1>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <FaBox className="text-3xl text-indigo-600 mx-auto" />
                    <h2 className="text-lg font-semibold mt-2">My Parcels</h2>
                    <p className="text-2xl font-bold text-indigo-800">{newData[0].count}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <FaTruck className="text-3xl text-yellow-500 mx-auto" />
                    <h2 className="text-lg font-semibold mt-2">Assigned</h2>
                    <p className="text-2xl font-bold text-yellow-600">{newdelivery_status_assigned[0].count}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <FaCheckCircle className="text-3xl text-green-500 mx-auto" />
                    <h2 className="text-lg font-semibold mt-2">Delivered</h2>
                    <p className="text-2xl font-bold text-green-600">{newdelivery_status_delivered[0].count}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-6">
                <button onClick={() => navigate("/addparcel")} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700">
                    <FaPlus /> Send New Parcel
                </button>
                <button onClick={() => navigate("tracking")} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600">
                    <FaSearch /> Track Parcel
                </button>
                {/* <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
          <FaDollarSign /> My Earnings
        </button> */}
            </div>



            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={status}
                        dataKey="count"
                        nameKey="delivery_status"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name} (${value})`}
                        fill="#8884d8"
                    >
                        {status.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[entry.delivery_status] || "#ccc"}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        formatter={(value) => (
                            <span className="text-gray-700 capitalize">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>



        </div>
    );
};

export default DashboardHome;
