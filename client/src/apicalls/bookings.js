
import { axiosInstance } from '.';

export const GetAllBookings = async () => {
    try {
        const response = await axiosInstance.get('/api/bookings/all-bookings');
        console.log("GetAllBookings Response:", response.data);
        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
}
