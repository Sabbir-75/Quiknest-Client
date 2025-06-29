import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure/UseAxiosSecure';
import { useAuth } from '../../../Hooks/UseAuth/UseAuth';
import { Helmet } from 'react-helmet';

const PaymentHistory = () => {
    const {user} = useAuth()
    const useSecure = UseAxiosSecure()
    const { data: paymentHst = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const data = await useSecure.get(`/payments?email=${user?.email}`)
            return data.data
        }
    })

    console.log(paymentHst);
    return (
        <div className="overflow-x-auto rounded shadow">
            <Helmet>
                <title>Quiknest || PaymentHistory</title>
            </Helmet>
            <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">#</th>
                        <th className="px-4 py-3 text-left">Parcel ID</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Transaction ID</th>
                        <th className="px-4 py-3 text-left">Method</th>
                        <th className="px-4 py-3 text-left">Paid At</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {paymentHst && paymentHst.length > 0 ? (
                        paymentHst.map((payment, index) => (
                            <tr key={payment.transactionId} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{payment.parcelId}</td>
                                <td className="px-4 py-2">{payment.customerEmail}</td>
                                <td className="px-4 py-2">{payment.transactionId}</td>
                                <td className="px-4 py-2">{payment.paymentMethod}</td>
                                <td className="px-4 py-2">
                                    {new Date(payment.created_At_string).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-4 py-4 text-center text-gray-500" colSpan="6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;