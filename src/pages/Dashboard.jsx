import { useState } from 'react';
import { useTiffin } from '../contexts/TiffineContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';
import Loader from '../components/Loader';
import API from '../axios/api';

const Dashboard = () => {
    const { clients, addClient, loading, fetechClients } = useTiffin();
    const { logout, user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', ratePerTiffin: 60 });

    const handleAddClient = async (e) => {
        e.preventDefault();
        await addClient(form);
        setForm({ name: '', phone: '', ratePerTiffin: 60 });
        setShowForm(false);
    };

    const handleDelete = async (clientId) => {
        try {
            const res = await API.delete(`/clients/${clientId}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
            console.log(res.data.message)
            fetechClients()
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message)
            }
            else {
                console.log('Internal server error', err)
            }
        }

    }

    const getInitials = (name) => {
        const arr = name.split(' ');
        if (arr.length === 1) return arr[0][0].toUpperCase();
        return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">🥗 Tiffin Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 shadow"
                >
                    Logout
                </button>
            </div>

            <div className="mb-6">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition duration-200 shadow"
                >
                    {showForm ? 'Close Form' : '➕ Add New Client'}
                </button>
            </div>

            {/* Add Client Form */}
            {showForm && (
                <form
                    onSubmit={handleAddClient}
                    className="bg-white p-6 rounded-xl shadow-md max-w-md mb-8 animate-fadeIn"
                >
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Add Client</h2>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Client Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Rate Per Tiffin (₹)"
                        value={form.ratePerTiffin}
                        onChange={(e) => setForm({ ...form, ratePerTiffin: e.target.value })}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition duration-200 shadow"
                    >
                        ✅ Add Client
                    </button>
                </form>
            )}

            {/* Clients */}
            {loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map(client => (
                        <div
                            key={client._id}
                            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 text-white text-lg font-bold w-12 h-12 flex items-center justify-center rounded-full shadow">
                                    {getInitials(client.name)}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                                    <p className="text-gray-500 text-sm">{client.phone}</p>
                                    <p className="text-gray-600 text-sm mt-1">₹{client.ratePerTiffin}/tiffin</p>
                                </div>
                            </div>
                            <Link to={`/client/${client._id}`}>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 w-full">
                                    View Tiffin Records
                                </button>
                            </Link>
                            <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 my-2 rounded-md text-sm font-medium transition duration-200 w-full" onClick={() => handleDelete(client._id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
