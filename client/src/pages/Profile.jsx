import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api/axios';
import moment from 'moment';
import { signOutSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogOut, Ticket, Mail } from 'lucide-react';

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await api.get('/bookings/user');
                setBookings(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };
        if (currentUser) fetchBookings();
    }, [currentUser]);

    const handleSignOut = async () => {
        try {
            await api.get('/auth/logout');
            dispatch(signOutSuccess());
            Swal.fire('Logged out', 'See you soon!', 'success');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    if (!currentUser) return <div className="text-center mt-20 text-2xl">Unauthorized</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <div className="w-full md:w-1/3 bg-zinc-900 p-8 rounded-2xl shadow-xl h-fit border border-zinc-800">
                    <div className="flex flex-col items-center">
                        <img
                            src={currentUser.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-primary mb-4 object-cover"
                        />
                        <h1 className="text-2xl font-bold mb-1">{currentUser.username}</h1>
                        <p className="text-zinc-500 mb-6 flex items-center gap-2"><Mail size={16} /> {currentUser.email}</p>

                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-lg transition font-semibold"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Ticket className="text-primary" /> Your Bookings
                    </h2>

                    {loading ? (
                        <p>Loading bookings...</p>
                    ) : bookings.length > 0 ? (
                        <div className="space-y-6">
                            {bookings.map(booking => (
                                <div key={booking._id} className="bg-zinc-900 overflow-hidden rounded-xl border border-zinc-800 flex flex-col sm:flex-row shadow-lg">
                                    <img
                                        src={booking.show.movie.posterUrl}
                                        alt={booking.show.movie.title}
                                        className="w-full sm:w-32 h-48 sm:h-auto object-cover"
                                    />
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{booking.show.movie.title}</h3>
                                                <p className="text-primary font-medium">{booking.show.theater.name}</p>
                                            </div>
                                            <span className="bg-green-900/30 text-green-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                {booking.paymentStatus}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                            <div>
                                                <p className="text-zinc-500 uppercase text-xs tracking-wider">Date & Time</p>
                                                <p className="font-semibold">{moment(booking.show.startTime).format('DD MMM, hh:mm A')}</p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 uppercase text-xs tracking-wider">Seats</p>
                                                <p className="font-semibold">{booking.seats.join(', ')}</p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 uppercase text-xs tracking-wider">Screen</p>
                                                <p className="font-semibold">{booking.show.screenName}</p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-500 uppercase text-xs tracking-wider">Amount</p>
                                                <p className="font-semibold text-primary">₹{booking.totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900 border-2 border-dashed border-zinc-800 p-12 rounded-2xl text-center">
                            <p className="text-zinc-500 text-lg">You haven't booked any movies yet.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-4 bg-primary px-8 py-3 rounded-md font-bold hover:bg-red-700 transition"
                            >
                                Explore Movies
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
