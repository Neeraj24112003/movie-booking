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
    const [walletBalance, setWalletBalance] = useState(0);
    const [useWallet, setUseWallet] = useState(false);

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
        if (currentUser) {
            const fetchWallet = async () => {
                try {
                    const res = await api.get('/auth/me');
                    setWalletBalance(res.data.walletBalance);
                } catch (error) {
                    console.error('Error fetching wallet:', error);
                }
            };
            fetchWallet();
        }
    }, [showId, currentUser]);

    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const sections = [
        { name: 'Classic', rows: ['A', 'B', 'C'], priceKey: 'Classic' },
        { name: 'Prime', rows: ['D', 'E', 'F', 'G'], priceKey: 'Prime' },
        { name: 'Premium', rows: ['H', 'I'], priceKey: 'Premium' }
    ];

    const handleSeatClick = (seat) => {
        if (show.bookedSeats.some(bs => bs.seatNumber === seat)) return;

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const getPrice = (seat) => {
        const row = seat.charAt(0);
        if (sections[0].rows.includes(row)) return show.price.Classic || show.price.Regular; // Fallback
        if (sections[1].rows.includes(row)) return show.price.Prime || (show.price.Regular + 100);
        if (sections[2].rows.includes(row)) return show.price.Premium || (show.price.Regular + 200);
        return 0;
    };

    const calculateTotal = () => {
        return selectedSeats.reduce((total, seat) => total + getPrice(seat), 0);
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
            const bookingRes = await api.post('/bookings', {
                showId,
                seats: selectedSeats,
                totalPrice: calculateTotal(),
                useWallet
            });

            if (bookingRes.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Successful!',
                    text: `You have successfully booked ${selectedSeats.join(', ')}`,
                });
                navigate('/profile');
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: error.response?.data?.message || 'Something went wrong',
            });
        }
    };

    if (loading) return <div className="text-center mt-20 text-2xl">Loading Seats...</div>;
    if (!show) return <div className="text-center mt-20 text-2xl">Show not found or Error loading data.</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-8 text-primary uppercase tracking-widest">{show.movie.title}</h1>
            <p className="text-zinc-500 mb-8">{show.theater.name} • {show.screenName}</p>

            <div className="perspective-[1000px] mb-4 flex justify-center w-full">
                <div className="w-3/4 h-24 border-t-4 border-white/50 rounded-[50%] transform rotate-x-12 scale-100 opacity-80"></div>
            </div>
            <p className="text-xs text-zinc-600 mb-12">All eyes this way please!</p>

            <div className="w-full max-w-2xl mb-20 space-y-8">
                {sections.map(section => (
                    <div key={section.name} className="flex flex-col items-center">
                        <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4">
                            {section.name} - ₹{show.price[section.priceKey] || (section.priceKey === 'Classic' ? show.price.Regular : section.priceKey === 'Prime' ? (show.price.Regular + 100) : (show.price.Regular + 200))}
                        </h3>
                        <div className="grid gap-4">
                            {section.rows.map(row => (
                                <div key={row} className="flex gap-4 items-center">
                                    <span className="text-zinc-600 w-4 font-bold">{row}</span>
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
                                    w-8 h-8 rounded-t-lg transition-all flex items-center justify-center text-xs font-bold
                                    ${isBooked ? 'bg-zinc-800 cursor-not-allowed opacity-50 text-zinc-600' :
                                                            isSelected ? 'bg-primary scale-110 shadow-lg shadow-red-900/40 text-white' :
                                                                'bg-zinc-700 hover:bg-zinc-600 hover:scale-105 text-zinc-400'}
                                  `}
                                                    title={seatNo}
                                                >{col}</button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
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
                            {walletBalance > 0 && (
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="useWallet"
                                        checked={useWallet}
                                        onChange={(e) => setUseWallet(e.target.checked)}
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <label htmlFor="useWallet" className="text-sm cursor-pointer select-none">
                                        Use Wallet Balance (Available: <span className="font-bold text-green-500">₹{walletBalance}</span>)
                                    </label>
                                </div>
                            )}
                            {useWallet && (
                                <p className="text-sm text-zinc-400 mt-1">
                                    To Pay: <span className="text-white font-bold">₹{Math.max(0, calculateTotal() - walletBalance)}</span>
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleBooking}
                            className="bg-primary px-10 py-3 rounded-full font-bold hover:bg-red-700 transition transform hover:scale-105 shadow-xl shadow-red-900/20"
                        >
                            {useWallet && walletBalance >= calculateTotal() ? 'Pay with Wallet' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
