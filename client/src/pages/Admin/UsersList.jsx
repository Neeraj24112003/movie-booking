
import React, { useEffect, useState } from 'react';
import { GetAllUsers } from '../../apicalls/users';
import Swal from 'sweetalert2';
import moment from 'moment';

function UsersList() {
    const [users, setUsers] = useState([]);

    const getData = async () => {
        try {
            const response = await GetAllUsers();
            if (response.success) {
                setUsers(response.users);
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.message || "Failed to fetch users",
                    icon: "error"
                });
            }
        } catch (error) {

            Swal.fire({
                title: "Error fetching Users",
                text: error.message || "Unknown error",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-800 text-zinc-400">
                            <th className="p-3 rounded-tl-lg">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 rounded-tr-lg">Joined At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-3">{moment(user.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p className="text-center text-zinc-500 py-10">No users found.</p>}
            </div>
        </div>
    );
}

export default UsersList;
