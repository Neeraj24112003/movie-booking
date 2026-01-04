
import { axiosInstance } from '.';

export const GetAllShows = async (movieId) => {
    try {
        const response = await axiosInstance.get(`/api/shows?movieId=${movieId || ''}`);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const AddShow = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/shows', payload);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const UpdateShow = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/shows/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const DeleteShow = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/shows/${id}`);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}
