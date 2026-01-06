
import React, { useEffect, useState } from 'react';
import { GetAllBookings } from '../../apicalls/bookings';
import Swal from 'sweetalert2';
import moment from 'moment';

function BookingsList() {
    const [bookings, setBookings] = useState([]);

    const getData = async () => {
        try {
            const response = await GetAllBookings();
            if (response.success) {
                setBookings(response.data);
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.message || "Failed to fetch bookings",
                    icon: "error"
                });
            }
        } catch (error) {

            Swal.fire({
                title: "Error fetching Bookings",
                text: error.message || "Unknown error",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Bookings</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-800 text-zinc-400">
                            <th className="p-3 rounded-tl-lg">User</th>
                            <th className="p-3">Movie</th>
                            <th className="p-3">Theater</th>
                            <th className="p-3">Date/Time</th>
                            <th className="p-3">Seats</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 rounded-tr-lg">Booked At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                <td className="p-3">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{booking.user?.username || 'N/A'}</span>
                                        <span className="text-xs text-zinc-500">{booking.user?.email}</span>
                                    </div>
                                </td>
                                <td className="p-3">{booking.show?.movie?.title || 'N/A'}</td>
                                <td className="p-3">{booking.show?.theater?.name || 'N/A'}</td>
                                <td className="p-3">
                                    {moment(booking.show?.date).format("DD-MM-YYYY")} <br />
                                    <span className="text-xs text-zinc-400">{booking.show?.time}</span>
                                </td>
                                <td className="p-3">{booking.seats.join(", ")}</td>
                                <td className="p-3">₹{booking.totalPrice}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${booking.paymentStatus === 'Completed' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                                <td className="p-3">{moment(booking.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && <p className="text-center text-zinc-500 py-10">No bookings found.</p>}
            </div>
        </div>
    );
}

export default BookingsList;
