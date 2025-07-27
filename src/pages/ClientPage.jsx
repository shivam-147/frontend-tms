import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import API from "../axios/api";
import React from 'react';
import { useRef } from "react";

function ClientPage() {
    const { clientId } = useParams();
    const { user } = useAuth();
    const [client, setClient] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null)

    const authHeader = {
        headers: { Authorization: `Bearer ${user?.token}` }
    };

    const fetchSummary = async () => {
        const today = new Date(); // ✅ Create a Date object
        try {
            const res = await API.get(`/tiffins/${clientId}/summary`, {
                params: {
                    month: today.getMonth() + 1,
                    year: today.getFullYear()
                },
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            setSummary(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Failed to fetch summary:", error);
        }
    };

    const fetchClientData = async () => {
        setLoading(true);
        try {
            const clientRes = await API.get(`/clients/${clientId}`, authHeader);
            const tiffinRes = await API.get(`/tiffins/${clientId}`, authHeader);
            setClient(clientRes.data);
            setRecords(tiffinRes.data.reverse()); // Most recent first
        } catch (error) {
            console.error('Error loading client page', error);
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const handleMark = async (mealType) => {
        try {
            const data = {
                clientId,
                date: new Date(),
                [mealType]: true
            };

            await API.post('/tiffins/', data, authHeader);
            fetchClientData();
            fetchSummary();
        } catch (err) {
            console.error('Failed to mark tiffin:', err);
        }
    };

    useEffect(() => {
        fetchClientData();
        fetchSummary();
    }, [clientId]);

    if (loading || !client) return <p className="p-4">Loading...</p>;

    return (
        <div className="mb-6 space-x-3 p-4">
            <h1 className="text-2xl font-bold mb-2">{client?.name}'s Tiffin Record</h1>
            <p className="text-gray-600 mb-4">Phone: {client?.phone}</p>

            {/* Mark Today's Tiffin */}
            <div className="mb-6 space-x-3">
                <button onClick={() => handleMark('morning')} className="bg-yellow-500 text-white px-4 py-2 rounded">☀️ Morning</button>
                <button onClick={() => handleMark('evening')} className="bg-purple-500 text-white px-4 py-2 rounded">🌙 Evening</button>
            </div>

            {/* Past Records Table */}
            <h2 className="text-lg font-semibold mb-2">Past Records</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Morning</th>
                            <th className="px-4 py-2 border">Evening</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((r) => (
                            <tr key={r._id} className="text-center">
                                <td className="px-4 py-2 border">
                                    {new Date(r.date).toISOString().split('T')[0]}
                                </td>
                                <td className="px-4 py-2 border">{r.morning ? '✅' : '❌'}</td>
                                <td className="px-4 py-2 border">{r.evening ? '✅' : '❌'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {summary && (
                <div className="bg-green-100 p-4 rounded bb-4 shadow">
                    <p className="tex-lg font-semibold"> Monthly summary (This month)</p>
                    <p>Month: {summary?.month}, year: {summary?.year}</p>
                    <p>Morning Tiffins: {summary?.morningCount}</p>
                    <p>Evening Tiffine: {summary?.eveningCount}</p>
                    <p>Total Tiffines: {summary?.totalTiffin}</p>
                    <p>Rate Per Tiffine: {summary?.ratePerTiffin}</p>
                    <p>Total Amount : {summary?.totalAmount}</p>
                </div>
            )}

        </div>
    );
}

export default ClientPage;
