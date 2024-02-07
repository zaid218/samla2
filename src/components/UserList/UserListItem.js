// components/UserListItem.js

import React from 'react';

const UserListItem = ({ user, onClick }) => {
    return (
        <li className="user-list-item" onClick={onClick}>
            {user.name}
        </li>
    );
};

export default UserListItem;
