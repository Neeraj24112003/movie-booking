
import React, { useEffect, useState } from 'react';
import { GetAllShows, DeleteShow } from '../../apicalls/shows';
import { Trash2, Edit } from 'lucide-react';
import Swal from 'sweetalert2';
import moment from 'moment';
import Modal from '../../components/Modal';
import ShowForm from './ShowForm';

function ShowsList() {
    const [shows, setShows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedShow, setSelectedShow] = useState(null);

    const getData = async () => {
        try {
            const response = await GetAllShows();
            if (response && Array.isArray(response)) {
                setShows(response);
            } else {
                setShows([]);
                Swal.fire({
                    title: "Error",
                    text: response?.message || "Failed to fetch shows",
                    icon: "error"
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error fetching Shows",
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
                const response = await DeleteShow(id);
                if (response.message === 'Show deleted') {
                    Swal.fire("Deleted!", "Show removed.", "success");
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
                <h2 className="text-xl font-bold">Shows</h2>
                <button
                    className="bg-primary px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
                    onClick={() => {
                        setSelectedShow(null);
                        setShowModal(true);
                    }}
                >
                    Add Show
                </button>
            </div>
            <table className="w-full text-left">
                <thead className="bg-zinc-800 text-zinc-400">
                    <tr>
                        <th className="p-3 rounded-tl-lg">Movie</th>
                        <th className="p-3">Theater</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Time</th>
                        <th className="p-3 rounded-tr-lg">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shows.map((show) => (
                        <tr key={show._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="p-3">{show.movie?.title || 'Unknown Movie'}</td>
                            <td className="p-3">{show.theater?.name || 'Unknown Theater'}</td>
                            <td className="p-3">{moment(show.startTime).format("MMM Do YYYY")}</td>
                            <td className="p-3">{moment(show.startTime).format("h:mm A")}</td>
                            <td className="p-3 gap-2 flex">
                                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleDelete(show._id)} />
                                <Edit className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-400"
                                    onClick={() => {
                                        setSelectedShow(show);
                                        setShowModal(true);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {shows.length === 0 && <p className="text-center text-zinc-500 py-10">No shows found.</p>}

            {showModal && (
                <Modal title={selectedShow ? "Edit Show" : "Add Show"} onClose={() => setShowModal(false)}>
                    <ShowForm
                        onClose={() => setShowModal(false)}
                        refreshData={getData}
                        initialData={selectedShow}
                    />
                </Modal>
            )}
        </div>
    );
}

export default ShowsList;
