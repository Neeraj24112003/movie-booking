import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Film, Tv, Clock, LogOut, Users, Ticket } from 'lucide-react'; // Added Users, Ticket icons
import { signOutSuccess } from '../redux/userSlice';
import api from '../api/axios';
import Swal from 'sweetalert2';
import MoviesList from './Admin/MoviesList';
import TheatersList from './Admin/TheatersList';
import ShowsList from './Admin/ShowsList';
import UsersList from './Admin/UsersList'; // New
import BookingsList from './Admin/BookingsList'; // New

export default function AdminDashboard() {
    const { currentUser } = useSelector((state) => state.user);
    const [activeTab, setActiveTab] = useState('movies');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await api.get('/auth/logout');
            dispatch(signOutSuccess());
            Swal.fire({
                title: 'Logged out',
                text: 'See you soon!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    if (currentUser?.role !== 'admin') {
        return <div className="text-center mt-20 text-2xl font-bold text-red-500">Access Denied: Admins Only</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center my-8">
                <div className="flex items-center gap-3">
                    <LayoutDashboard className="text-primary w-8 h-8" />
                    <h1 className="text-3xl font-bold">Admin Console</h1>
                </div>
                <button
                    onClick={handleSignOut}
                    className="bg-zinc-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            <div className="flex gap-4 mb-6 border-b border-zinc-800 pb-2 overflow-x-auto">
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${activeTab === 'movies' ? 'bg-primary text-white' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveTab('movies')}
                >
                    <Film className="w-4 h-4" /> Movies
                </button>
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${activeTab === 'theaters' ? 'bg-primary text-white' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveTab('theaters')}
                >
                    <Tv className="w-4 h-4" /> Theaters
                </button>
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${activeTab === 'shows' ? 'bg-primary text-white' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveTab('shows')}
                >
                    <Clock className="w-4 h-4" /> Shows
                </button>
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${activeTab === 'users' ? 'bg-primary text-white' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveTab('users')}
                >
                    <Users className="w-4 h-4" /> Users
                </button>
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${activeTab === 'bookings' ? 'bg-primary text-white' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    <Ticket className="w-4 h-4" /> Bookings
                </button>
            </div>

            <div className="mb-20">
                {activeTab === 'movies' && <MoviesList />}
                {activeTab === 'theaters' && <TheatersList />}
                {activeTab === 'shows' && <ShowsList />}
                {activeTab === 'users' && <UsersList />}
                {activeTab === 'bookings' && <BookingsList />}
            </div>
        </div>
    );
}
