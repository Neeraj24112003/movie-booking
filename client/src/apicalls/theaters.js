
import { axiosInstance } from '.';

export const GetAllTheaters = async () => {
    try {
        const response = await axiosInstance.get('/api/theaters');
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const AddTheater = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theaters', payload);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const UpdateTheater = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/theaters/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}

export const DeleteTheater = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/theaters/${id}`);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}
