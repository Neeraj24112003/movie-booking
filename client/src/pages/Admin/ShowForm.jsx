
import React, { useState, useEffect } from 'react';
import { AddShow, UpdateShow } from '../../apicalls/shows';
import { GetAllMovies } from '../../apicalls/movies';
import { GetAllTheaters } from '../../apicalls/theaters';
import Swal from 'sweetalert2';
import moment from 'moment';

function ShowForm({ onClose, refreshData, initialData }) {
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [formData, setFormData] = useState({
        movie: initialData?.movie?._id || '',
        theater: initialData?.theater?._id || '',
        date: initialData?.startTime ? moment(initialData.startTime).format("YYYY-MM-DD") : '',
        time: initialData?.startTime ? moment(initialData.startTime).format("HH:mm") : '',
        price: initialData?.price?.Classic || '',
        duration: initialData?.duration || 0
    });

    const getLinks = async () => {
        try {
            const moviesData = await GetAllMovies();
            const theatersData = await GetAllTheaters();
            if (moviesData) setMovies(moviesData);
            if (theatersData) setTheaters(theatersData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLinks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'movie') {
            const selectedMovie = movies.find(m => m._id === value);
            setFormData({
                ...formData,
                [name]: value,
                duration: selectedMovie ? selectedMovie.duration : 0
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Combine date and time
            const dateTimeString = `${formData.date}T${formData.time}`;
            const startTime = new Date(dateTimeString);

            // Backend expects just duration to calculate endTime
            const payload = {
                movie: formData.movie,
                theater: formData.theater,
                screenName: "Screen 1", // Hardcoded for simplified version
                startTime: startTime,
                duration: formData.duration,
                price: {
                    Classic: Number(formData.price),
                    Prime: Number(formData.price) + 100, // +100 for Prime
                    Premium: Number(formData.price) + 200 // +200 for Premium
                }
            };

            let response;
            if (initialData) {
                response = await UpdateShow(initialData._id, payload);
            } else {
                response = await AddShow(payload);
            }

            if (response.success === false || !response._id) {
                Swal.fire("Error!", response.message || "Failed to save show", "error");
            } else {
                Swal.fire("Success!", initialData ? "Show updated successfully." : "Show created successfully.", "success");
                refreshData();
                onClose();
            }
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <select name="movie" value={formData.movie} required className="bg-zinc-800 p-2 rounded text-white" onChange={handleChange}>
                    <option value="">Select Movie</option>
                    {movies.map(m => <option key={m._id} value={m._id}>{m.title} ({m.duration} min)</option>)}
                </select>

                <select name="theater" value={formData.theater} required className="bg-zinc-800 p-2 rounded text-white" onChange={handleChange}>
                    <option value="">Select Theater</option>
                    {theaters.map(t => <option key={t._id} value={t._id}>{t.name}, {t.city}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input type="date" name="date" value={formData.date} required className="bg-zinc-800 p-2 rounded text-white" onChange={handleChange} />
                <input type="time" name="time" value={formData.time} required className="bg-zinc-800 p-2 rounded text-white" onChange={handleChange} />
            </div>

            <input type="number" name="price" value={formData.price} placeholder="Base Ticket Price (Classic)" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
            <p className="text-xs text-zinc-500">*Prime (+100) and Premium (+200) prices will be auto-calculated.</p>

            <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary rounded font-bold hover:bg-red-700 transition">
                    {initialData ? "Update Show" : "Create Show"}
                </button>
            </div>
        </form>
    );
}

export default ShowForm;
