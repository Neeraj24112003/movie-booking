import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice';
import Swal from 'sweetalert2';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await api.post('/auth/login', formData);
            if (res.data.success === false) {
                dispatch(signInFailure(res.data.message));
                return;
            }
            dispatch(signInSuccess(res.data));
            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                timer: 1500,
                showConfirmButton: false,
            });
            if (res.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.response?.data?.message || 'Something went wrong'));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto mt-20 bg-zinc-900 rounded-xl shadow-2xl">
            <h1 className="text-3xl text-center font-bold my-7 text-primary">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don&apos;t have an account?</p>
                <Link to="/sign-up">
                    <span className="text-primary font-semibold hover:underline">Sign up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
