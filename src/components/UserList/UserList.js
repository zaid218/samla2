// components/UserList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserModal from '../../components/UserModal/UserModal';
import { getUsers, selectUsers, sortUsers } from '../../redux/userSlice';
import UserListItem from './UserListItem';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div>
            <h2>User List</h2>
            <button onClick={() => dispatch(sortUsers())}>Sort by Name</button>
            <ul className="user-list">
                {users.map((user) => (
                    <UserListItem key={user.id} user={user} onClick={() => handleUserClick(user)} />
                ))}
            </ul>

            {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
        </div>
    );
};

export default UserList;
