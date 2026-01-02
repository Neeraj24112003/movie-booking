import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export default function SeatSelection() {
    const { showId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const res = await api.get(`/shows/${showId}`);
                setShow(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching show:', error);
                setLoading(false);
            }
        };
        fetchShow();
    }, [showId]);

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleSeatClick = (seat) => {
        if (show.bookedSeats.some(bs => bs.seatNumber === seat)) return;

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const calculateTotal = () => {
        return selectedSeats.length * show.price.Regular;
    };

    const handleBooking = async () => {
        if (!currentUser) {
            Swal.fire('Please sign in to book tickets');
            navigate('/sign-in');
            return;
        }

        if (selectedSeats.length === 0) {
            Swal.fire('Please select at least one seat');
            return;
        }

        try {
            await api.post('/bookings', {
                showId,
                seats: selectedSeats,
                totalPrice: calculateTotal()
            });

            Swal.fire({
                icon: 'success',
                title: 'Booking Successful!',
                text: `You have successfully booked ${selectedSeats.join(', ')}`,
            });
            navigate('/profile');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: error.response?.data?.message || 'Something went wrong',
            });
        }
    };

    if (loading) return <div className="text-center mt-20 text-2xl">Loading Seats...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-8 text-primary uppercase tracking-widest">{show.movie.title}</h1>
            <p className="text-zinc-500 mb-8">{show.theater.name} • {show.screenName}</p>

            <div className="w-full h-2 bg-zinc-700 rounded-t-3xl shadow-[0_-10px_20px_rgba(229,9,20,0.3)] mb-12"></div>
            <p className="text-xs text-zinc-600 mb-12">All eyes this way please!</p>

            <div className="grid gap-4 mb-20 place-items-center">
                {rows.map(row => (
                    <div key={row} className="flex gap-4 items-center">
                        <span className="text-zinc-600 w-4">{row}</span>
                        <div className="flex gap-2">
                            {cols.map(col => {
                                const seatNo = `${row}${col}`;
                                const isBooked = show.bookedSeats.some(bs => bs.seatNumber === seatNo);
                                const isSelected = selectedSeats.includes(seatNo);

                                return (
                                    <button
                                        key={seatNo}
                                        onClick={() => handleSeatClick(seatNo)}
                                        disabled={isBooked}
                                        className={`
                        w-8 h-8 rounded-t-lg transition-all
                        ${isBooked ? 'bg-zinc-800 cursor-not-allowed opacity-50' :
                                                isSelected ? 'bg-primary scale-110 shadow-lg shadow-red-900/40' :
                                                    'bg-zinc-700 hover:bg-zinc-600 hover:scale-105'}
                      `}
                                        title={seatNo}
                                    ></button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-8 mb-12 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-zinc-700 rounded"></div> Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div> Selected
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-zinc-800 opacity-50 rounded"></div> Occupied
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-6 border-t border-zinc-800 animate-slide-up font-sans">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <div>
                            <p className="text-zinc-400 text-sm">Selected Seats: <span className="text-white font-bold">{selectedSeats.join(', ')}</span></p>
                            <p className="text-2xl font-bold">Total: <span className="text-primary">₹{calculateTotal()}</span></p>
                        </div>
                        <button
                            onClick={handleBooking}
                            className="bg-primary px-10 py-3 rounded-full font-bold hover:bg-red-700 transition transform hover:scale-105 shadow-xl shadow-red-900/20"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
