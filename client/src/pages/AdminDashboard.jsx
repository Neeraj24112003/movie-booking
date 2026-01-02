import { useSelector } from 'react-redux';
import { LayoutDashboard, Users, Film, Clock, IndianRupee } from 'lucide-react';

export default function AdminDashboard() {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser?.role !== 'admin') {
        return <div className="text-center mt-20 text-2xl font-bold text-red-500">Access Denied: Admins Only</div>;
    }

    const stats = [
        { label: 'Total Revenue', value: '₹45,200', icon: <IndianRupee className="text-green-500" /> },
        { label: 'Total Users', value: '124', icon: <Users className="text-blue-500" /> },
        { label: 'Active Movies', value: '8', icon: <Film className="text-primary" /> },
        { label: 'Current Shows', value: '32', icon: <Clock className="text-yellow-500" /> },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center gap-3 my-8">
                <LayoutDashboard className="text-primary w-8 h-8" />
                <h1 className="text-3xl font-bold">Admin Console</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div className="bg-zinc-800 p-3 rounded-xl">{stat.icon}</div>
                            <span className="text-zinc-500 text-sm font-medium">Last 30 days</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-primary hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition">Add New Movie</button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg font-bold transition">Create Show</button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg font-bold transition">Manage Theaters</button>
                    </div>
                </div>

                <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                    <h2 className="text-xl font-bold mb-4">System Alerts</h2>
                    <div className="space-y-3">
                        <div className="bg-yellow-900/20 text-yellow-500 p-3 rounded-lg border border-yellow-900/50 text-sm">
                            Server load is high. Recommended to check Redis caching.
                        </div>
                        <div className="bg-green-900/20 text-green-500 p-3 rounded-lg border border-green-900/50 text-sm">
                            All payment webhooks are functional.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
