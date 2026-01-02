import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Film } from 'lucide-react';

export default function Navbar() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className="bg-black text-white shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
                <Link to="/" className="flex items-center gap-2">
                    <Film className="text-primary w-8 h-8" />
                    <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
                        <span className="text-primary">Movie</span>
                        <span className="text-white">Ticket</span>
                    </h1>
                </Link>
                <ul className="flex gap-4 items-center">
                    <Link to="/">
                        <li className="hidden sm:inline hover:text-primary cursor-pointer transition">Home</li>
                    </Link>
                    {currentUser ? (
                        <Link to="/profile">
                            <img
                                className="rounded-full h-8 w-8 object-cover border-2 border-primary"
                                src={currentUser.profilePicture}
                                alt="profile"
                            />
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li className="bg-primary px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">Sign in</li>
                        </Link>
                    )}
                    {currentUser?.role === 'admin' && (
                        <Link to="/admin">
                            <li className="hidden sm:inline hover:text-primary cursor-pointer transition">Admin</li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    );
}
