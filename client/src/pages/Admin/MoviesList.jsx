
import React, { useEffect, useState } from 'react';
import { GetAllMovies, DeleteMovie } from '../../apicalls/movies';
import { useDispatch } from 'react-redux';
import { Trash2, Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal';
import MovieForm from './MovieForm';

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const response = await GetAllMovies();
            if (response && Array.isArray(response)) {
                setMovies(response);
            } else {
                setMovies([]);
                Swal.fire({
                    title: "Error",
                    text: response?.message || "Failed to fetch movies",
                    icon: "error"
                });
            }
        } catch (error) {

            Swal.fire({
                title: "Error fetching Movies",
                text: `${error.response?.status} - ${error.response?.data?.message || error.message || "Unknown error"}`,
                icon: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await DeleteMovie(id);
                    if (response.message === 'Movie deleted') {
                        Swal.fire("Deleted!", "Movie has been deleted.", "success");
                        getData();
                    } else {
                        Swal.fire("Error!", response.message, "error");
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Movies</h2>
                <button
                    className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
                    onClick={() => {
                        setSelectedMovie(null);
                        setShowModal(true);
                    }}
                >
                    Add Movie
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-800 text-zinc-400">
                            <th className="p-3 rounded-tl-lg">Title</th>
                            <th className="p-3">Genre</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3 rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                <td className="p-3">{movie.title}</td>
                                <td className="p-3">{movie.genre.join(", ")}</td>
                                <td className="p-3">{movie.duration} mins</td>
                                <td className="p-3 flex gap-2">
                                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-400" onClick={() => handleDelete(movie._id)} />
                                    <Edit
                                        className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-400"
                                        onClick={() => {
                                            setSelectedMovie(movie);
                                            setShowModal(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {movies.length === 0 && <p className="text-center text-zinc-500 py-10">No movies found.</p>}
            </div>

            {showModal && (
                <Modal title={selectedMovie ? "Edit Movie" : "Add Movie"} onClose={() => setShowModal(false)}>
                    <MovieForm
                        onClose={() => setShowModal(false)}
                        refreshData={getData}
                        initialData={selectedMovie}
                    />
                </Modal>
            )}
        </div>
    );
}

export default MoviesList;
