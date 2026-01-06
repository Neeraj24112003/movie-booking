import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Swal from 'sweetalert2';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post('/auth/register', formData);
            if (res.data.success === false) {
                setLoading(false);
                setError(res.data.message);
                return;
            }
            setLoading(false);
            setError(null);
            Swal.fire({
                icon: 'success',
                title: 'Account Created!',
                text: 'You can now sign in.',
            });
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto mt-20 bg-zinc-900 rounded-xl shadow-2xl">
            <h1 className="text-3xl text-center font-bold my-7 text-primary">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-zinc-800 border-zinc-700 p-3 rounded-lg text-white"
                    id="username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-zinc-800 border-zinc-700 p-3 rounded-lg text-white"
                    id="email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-zinc-800 border-zinc-700 p-3 rounded-lg text-white"
                    id="password"
                    onChange={handleChange}
                    required
                />
                <button
                    disabled={loading}
                    className="bg-primary text-white p-3 rounded-lg uppercase font-bold hover:opacity-90 disabled:opacity-50 transition"
                >
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-primary font-semibold hover:underline">Sign in</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
