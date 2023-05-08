import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)

    const handleDelete = _id => {
        console.log(_id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('deleted successfully');
                    const remaining = users.filter(user => user._id !== _id);
                    setUsers(remaining)
                }
            })
    }

    return (
        <div>
            <h3>Total users: {users.length}</h3>
            {
                users.map(user => <h4 key={user._id}>{user.name} : {user.email} : {user._id} <Link to={`/update/${user._id}`}>Update</Link> <button onClick={() => handleDelete(user._id)}>X</button></h4>)
            }

        </div>
    );
};

export default Users;