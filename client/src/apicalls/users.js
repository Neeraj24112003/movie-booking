
import { axiosInstance } from '.';

export const GetAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/auth/all-users');
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}
