import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api/axios';
import moment from 'moment';
import { signOutSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LogOut, Ticket, Mail, Wallet } from 'lucide-react';

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [walletBalance, setWalletBalance] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const res = await api.get('/auth/me');
            setWalletBalance(res.data.walletBalance);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    }

    useEffect(() => {
        if (currentUser) {
            fetchUserData();
        }
    }, [currentUser]);

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

    const handleAddFunds = async () => {
        const { value: amount } = await Swal.fire({
            title: 'Add Funds to Wallet',
            input: 'number',
            inputLabel: 'Enter amount to add (₹)',
            inputPlaceholder: 'e.g. 500',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return 'Please enter a valid amount!';
                }
            }
        });

        if (amount) {
            try {
                const response = await api.post('/auth/add-funds', { amount });
                if (response.data.success) {
                    Swal.fire('Success', `Added ₹${amount} to wallet!`, 'success');
                    setWalletBalance(response.data.walletBalance);
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to add funds', 'error');
            }
        }
    };

    const handleCancel = async (bookingId, price) => {
        const refundAmount = price * 0.8;

        const result = await Swal.fire({
            title: 'Cancel Booking?',
            text: `You will be refunded ₹${refundAmount} (80% of ₹${price}). This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await api.post(`/bookings/cancel/${bookingId}`);
                if (response.data.success) {
                    if (response.data.refundAmount > 0) {
                        Swal.fire('Cancelled!', `Your ticket has been cancelled. ₹${response.data.refundAmount} added to wallet.`, 'success');
                    } else {
                        Swal.fire('Cancelled!', 'Successfully cancelled ticket', 'success');
                    }
                    // Refresh data
                    const res = await api.get('/bookings/user');
                    setBookings(res.data);
                    fetchUserData();
                } else {
                    Swal.fire('Error', response.data.message, 'error');
                }
            } catch (error) {
                Swal.fire('Error', error.response?.data?.message || 'Failed to cancel', 'error');
            }
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

                        <div className="w-full bg-zinc-800 p-4 rounded-lg mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/20 p-2 rounded-full text-primary"><Wallet size={20} /></div>
                                <div>
                                    <p className="text-xs text-zinc-400">Wallet Balance</p>
                                    <p className="text-lg font-bold text-white">₹{walletBalance}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleAddFunds}
                                className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
                            >
                                + Add Money
                            </button>
                        </div>

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
                            {bookings.map(booking => {
                                // Robust Fallback Logic for Orphaned Bookings
                                const show = booking.show || {};
                                const movie = show.movie || {};
                                const theater = show.theater || {};

                                const movieTitle = movie.title || "Movie Unavailable";
                                const theaterName = theater.name || "Theater Unavailable";
                                const posterUrl = movie.posterUrl || "https://via.placeholder.com/150x225?text=No+Data";
                                const screenName = show.screenName || "N/A";

                                const showDate = show.startTime || booking.bookingDate || booking.createdAt;
                                const isPastShow = moment(showDate).isBefore(moment());

                                let statusLabel = booking.paymentStatus;
                                let statusColor = booking.paymentStatus === 'Completed' ? 'bg-green-900/30 text-green-500' :
                                    booking.paymentStatus === 'Cancelled' ? 'bg-red-900/30 text-red-500' :
                                        'bg-yellow-900/30 text-yellow-500';

                                if (booking.paymentStatus === 'Completed' && isPastShow) {
                                    statusLabel = 'Watched';
                                    statusColor = 'bg-blue-900/30 text-blue-500';
                                }

                                return (
                                    <div key={booking._id} className="bg-zinc-900 overflow-hidden rounded-xl border border-zinc-800 flex flex-col sm:flex-row shadow-lg">
                                        <img
                                            src={posterUrl}
                                            alt={movieTitle}
                                            className="w-full sm:w-32 h-48 sm:h-auto object-cover opacity-80"
                                        />
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white/90">{movieTitle}</h3>
                                                    <p className="text-primary font-medium">{theaterName}</p>
                                                </div>
                                                <span className={`${statusColor} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                                                    {statusLabel}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                                <div>
                                                    <p className="text-zinc-500 uppercase text-xs tracking-wider">Date & Time</p>
                                                    <p className="font-semibold">{moment(showDate).format('DD MMM, hh:mm A')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-zinc-500 uppercase text-xs tracking-wider">Seats</p>
                                                    <p className="font-semibold">{booking.seats.join(', ')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-zinc-500 uppercase text-xs tracking-wider">Screen</p>
                                                    <p className="font-semibold">{screenName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-zinc-500 uppercase text-xs tracking-wider">Amount</p>
                                                    <p className="font-semibold text-primary">₹{booking.totalPrice}</p>
                                                </div>
                                            </div>

                                            {booking.paymentStatus !== 'Cancelled' && !isPastShow ? (
                                                <button
                                                    onClick={() => handleCancel(booking._id, booking.totalPrice)}
                                                    className="w-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition py-2 rounded-lg font-semibold text-sm border border-red-500/20"
                                                >
                                                    Cancel Booking
                                                </button>
                                            ) : booking.paymentStatus === 'Cancelled' ? (
                                                <div className="w-full bg-zinc-800 py-2 rounded-lg text-center text-sm text-zinc-400">
                                                    Successfully Cancelled {booking.refundAmount > 0 && `• Refunded ₹${booking.refundAmount}`}
                                                </div>
                                            ) : (
                                                <div className="w-full bg-blue-900/10 py-2 rounded-lg text-center text-sm text-blue-500 font-semibold border border-blue-500/20">
                                                    Movie Watched
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
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
