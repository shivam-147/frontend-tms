import { useState } from 'react';
import { useTiffin } from '../contexts/TiffineContext'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';

const Dashboard = () => {
    const { clients, addClient, loading } = useTiffin();
    const { logout } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', ratePerTiffin: 60 });

    const handleAddClient = async (e) => {
        e.preventDefault();
        await addClient(form);
        setForm({ name: '', phone: '', ratePerTiffin: 60 });
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tiffin Dashboard</h1>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </div>

            {/* Add Client Button */}
            <div className="mb-4">
                <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded">
                    {showForm ? 'Close' : '➕ Add Client'}
                </button>
            </div>

            {/* Add Client Form */}
            {showForm && (
                <form onSubmit={handleAddClient} className="bg-white p-4 mb-4 rounded shadow max-w-md">
                    <h2 className="text-lg font-bold mb-2">New Client</h2>
                    <input
                        className="w-full border p-2 mb-2"
                        placeholder="Client Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <input
                        className="w-full border p-2 mb-2"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                    />
                    <input
                        className="w-full border p-2 mb-2"
                        placeholder="Rate Per Tiffin (₹)"
                        type="number"
                        value={form.ratePerTiffin}
                        onChange={(e) => setForm({ ...form, ratePerTiffin: e.target.value })}
                        required
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Client</button>
                </form>
            )}

            {/* Client Cards */}
            {loading ? (
                <p>Loading clients...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map(client => (
                        <div key={client._id} className="flex justify-between items-center bg-white p-4 shadow rounded">
                            <div >
                                <h2 className="text-lg font-semibold">{client.name}</h2>
                                <p className="text-sm text-gray-600">{client.phone}</p>
                                <p className="text-sm text-gray-500">₹{client.ratePerTiffin}/tiffin</p>

                            </div>
                            <Link to={`/client/${client._id}`}>
                                <button className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">
                                    View Tiffine
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
