
import React, { useState } from 'react';
import { AddMovie, UpdateMovie } from '../../apicalls/movies';
import Swal from 'sweetalert2';

function MovieForm({ onClose, refreshData, initialData }) {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        duration: initialData?.duration || '',
        genre: initialData?.genre ? initialData.genre.join(', ') : '',
        language: initialData?.language || '',
        releaseDate: initialData?.releaseDate ? new Date(initialData.releaseDate).toISOString().split('T')[0] : '',
        posterUrl: initialData?.posterUrl || '',
        trailerUrl: initialData?.trailerUrl || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, genre: formData.genre.split(',').map(g => g.trim()) };
            let response;
            if (initialData) {
                response = await UpdateMovie(initialData._id, payload);
            } else {
                response = await AddMovie(payload);
            }

            if (response.success === false || !response._id) {
                Swal.fire("Error!", response.message || "Failed to save movie", "error");
            } else {
                Swal.fire("Success!", initialData ? "Movie updated successfully." : "Movie added successfully.", "success");
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
                <input type="text" name="title" value={formData.title} placeholder="Title" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
                <input type="number" name="duration" value={formData.duration} placeholder="Duration (min)" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
            </div>
            <textarea name="description" value={formData.description} placeholder="Description" required className="bg-zinc-800 p-2 rounded h-24" onChange={handleChange}></textarea>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="genre" value={formData.genre} placeholder="Genre (comma separated)" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
                <input type="text" name="language" value={formData.language} placeholder="Language" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <input type="date" name="releaseDate" value={formData.releaseDate} required className="bg-zinc-800 p-2 rounded text-zinc-400" onChange={handleChange} />
                <input type="number" name="rating" placeholder="Rating (0-10)" className="bg-zinc-800 p-2 rounded" step="0.1" onChange={handleChange} />
            </div>
            <input type="url" name="posterUrl" value={formData.posterUrl} placeholder="Poster URL" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
            <input type="url" name="trailerUrl" value={formData.trailerUrl} placeholder="Trailer URL" className="bg-zinc-800 p-2 rounded" onChange={handleChange} />

            <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary rounded font-bold hover:bg-red-700 transition">
                    {initialData ? 'Update Movie' : 'Save Movie'}
                </button>
            </div>
        </form>
    );
}

export default MovieForm;
