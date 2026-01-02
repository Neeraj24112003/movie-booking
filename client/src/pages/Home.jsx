import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await api.get('/movies');
                setMovies(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div className="text-center mt-20 text-2xl">Loading movies...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold my-8 text-primary">Now Showing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Link key={movie._id} to={`/movie/${movie._id}`} className="group">
                            <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-80 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-bold text-lg truncate">{movie.title}</h2>
                                    <p className="text-zinc-400 text-sm">{movie.genre.join(', ')}</p>
                                    <p className="text-zinc-500 text-xs mt-1">{movie.language} • {movie.duration}m</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-zinc-500">No movies available at the moment.</p>
                )}
            </div>
        </div>
    );
}
