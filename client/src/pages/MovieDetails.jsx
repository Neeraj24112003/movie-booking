import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import moment from 'moment';
import { Play, Clock, Calendar, Globe } from 'lucide-react';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieAndShows = async () => {
            try {
                const movieRes = await api.get(`/movies/${id}`);
                setMovie(movieRes.data);

                const showsRes = await api.get(`/shows?movieId=${id}`);
                setShows(showsRes.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching details:', error);
                setLoading(false);
            }
        };
        fetchMovieAndShows();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-2xl">Loading...</div>;
    if (!movie) return <div className="text-center mt-20 text-2xl">Movie not found</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-2xl h-auto object-contain bg-zinc-950"
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
                    <div className="flex flex-wrap gap-4 text-zinc-400 mb-6">
                        <span className="flex items-center gap-1"><Clock size={16} /> {movie.duration} min</span>
                        <span className="flex items-center gap-1"><Calendar size={16} /> {moment(movie.releaseDate).format('DD MMM, YYYY')}</span>
                        <span className="flex items-center gap-1"><Globe size={16} /> {movie.language}</span>
                    </div>

                    <div className="flex gap-2 mb-6">
                        {movie.genre.map(g => (
                            <span key={g} className="px-3 py-1 bg-zinc-800 rounded-full text-sm">{g}</span>
                        ))}
                    </div>

                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        {movie.description}
                    </p>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-primary">Select Showtimes</h2>
                        {shows.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {shows.map(show => {
                                    if (!show.theater) return null;
                                    return (
                                        <div key={show._id} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center border border-zinc-800 hover:border-primary transition">
                                            <div>
                                                <p className="font-bold text-lg">{show.theater.name}</p>
                                                <p className="text-zinc-500 text-sm">{show.theater.location}, {show.theater.city}</p>
                                                <p className="text-primary font-semibold mt-1">
                                                    {moment(show.startTime).format('hh:mm A')} - {show.screenName}
                                                </p>
                                            </div>
                                            <Link to={`/show/${show._id}`}>
                                                <button className="bg-primary px-6 py-2 rounded-md font-bold hover:bg-red-700 transition">
                                                    Book Now
                                                </button>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-zinc-500">No shows available for this movie.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
