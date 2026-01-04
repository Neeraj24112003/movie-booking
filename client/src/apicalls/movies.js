
import { axiosInstance } from '.';

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get('/api/movies');
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/movies', payload);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const UpdateMovie = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/movies/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const DeleteMovie = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/movies/${id}`);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}
