
import React, { useEffect, useState } from 'react';
import { GetAllTheaters, DeleteTheater } from '../../apicalls/theaters';
import { Trash2, Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import Modal from '../../components/Modal';
import TheaterForm from './TheaterForm';

function TheatersList() {
    const [theaters, setTheaters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTheater, setSelectedTheater] = useState(null);

    const getData = async () => {
        try {
            const response = await GetAllTheaters();
            if (response && Array.isArray(response)) {
                setTheaters(response);
            } else {
                setTheaters([]);
                Swal.fire({
                    title: "Error",
                    text: response?.message || "Failed to fetch theaters",
                    icon: "error"
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error fetching Theaters",
                text: `${error.response?.status} - ${error.response?.data?.message || error.message || "Unknown error"}`,
                icon: "error"
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This process is irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await DeleteTheater(id);
                if (response.message === 'Theater deleted') {
                    Swal.fire("Deleted!", "Theater removed.", "success");
                    getData();
                } else {
                    Swal.fire("Error", response.message, "error")
                }
            }
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Theaters</h2>
                <button
                    className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
                    onClick={() => {
                        setSelectedTheater(null);
                        setShowModal(true);
                    }}
                >
                    Add Theater
                </button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-zinc-800 text-zinc-400">
                    <tr>
                        <th className="p-3 rounded-tl-lg">Name</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">City</th>
                        <th className="p-3 rounded-tr-lg">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {theaters.map((theater) => (
                        <tr key={theater._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="p-3">{theater.name}</td>
                            <td className="p-3">{theater.location}</td>
                            <td className="p-3">{theater.city}</td>
                            <td className="p-3 gap-2 flex">
                                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleDelete(theater._id)} />
                                <Edit
                                    className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-400"
                                    onClick={() => {
                                        setSelectedTheater(theater);
                                        setShowModal(true);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal title={selectedTheater ? "Edit Theater" : "Add Theater"} onClose={() => setShowModal(false)}>
                    <TheaterForm
                        onClose={() => setShowModal(false)}
                        refreshData={getData}
                        initialData={selectedTheater}
                    />
                </Modal>
            )}

        </div>
    );
}

export default TheatersList;
