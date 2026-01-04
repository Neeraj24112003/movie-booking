
import React, { useState } from 'react';
import { AddTheater, UpdateTheater } from '../../apicalls/theaters';
import Swal from 'sweetalert2';

function TheaterForm({ onClose, refreshData, initialData }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        city: initialData?.city || '',
        location: initialData?.location || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (initialData) {
                response = await UpdateTheater(initialData._id, formData);
            } else {
                // Default screen configuration for simplicity
                const payload = {
                    ...formData,
                    screens: [
                        {
                            name: "Screen 1",
                            screenType: "Regular",
                            seatLayout: {
                                rows: 10,
                                cols: 10,
                                seats: []
                            }
                        }
                    ]
                };
                response = await AddTheater(payload);
            }

            if (response.success === false || !response._id) {
                Swal.fire("Error!", response.message || "Failed to save theater", "error");
            } else {
                Swal.fire("Success!", initialData ? "Theater updated successfully." : "Theater added successfully.", "success");
                refreshData();
                onClose();
            }
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="name" value={formData.name} placeholder="Theater Name" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
            <input type="text" name="city" value={formData.city} placeholder="City" required className="bg-zinc-800 p-2 rounded" onChange={handleChange} />
            <textarea name="location" value={formData.location} placeholder="Full Address / Location" required className="bg-zinc-800 p-2 rounded h-24" onChange={handleChange}></textarea>
            {!initialData && <p className="text-xs text-zinc-500">*Automatically creates a default 'Screen 1' with 100 seats.</p>}

            <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary rounded font-bold hover:bg-red-700 transition">
                    {initialData ? 'Update Theater' : 'Save Theater'}
                </button>
            </div>
        </form>
    );
}

export default TheaterForm;
