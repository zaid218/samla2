// components/SearchUser.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser, selectSearchHistory, updateSearchHistory } from '../../redux/userSlice';
import SearchHistoryItem from './SearchHistoryItem';

const SearchUser = () => {
    const dispatch = useDispatch();
    const searchHistory = useSelector(selectSearchHistory);
    const [searchTerm, setSearchTerm] = useState('');
    const isLoading = useSelector((state) => state.users.status === 'loading');
    const users = useSelector((state) => state.users.users);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = async () => {
        try {
            await dispatch(searchUser(searchTerm));
            setSearchPerformed(true);
        } catch (error) {
            console.error('Error searching users:', error);
            // Display an error message to the user
        }
    };

    const updateSearchHistoryInStorage = (newSearchHistory) => {
        localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
    };

    // Clear searchPerformed state when component mounts or unmounts
    useEffect(() => {
        setSearchPerformed(false);
    }, []);

    return (
        <div>
            <h2>Search User</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>

            {/* Only show messages when search is performed and button is pressed */}
            {searchPerformed && (
                <div>
                    {users.length > 0 ? (
                        <p>User found!</p>
                    ) : (
                        <p>No user found.</p>
                    )}
                </div>
            )}

            <h3>Search History</h3>
            <ul>
                {searchHistory.map((term, index) => (
                    <SearchHistoryItem
                        key={index}
                        term={term}
                        index={index}
                        onDelete={(index) => {
                            const updatedHistory = [...searchHistory];
                            updatedHistory.splice(index, 1);
                            dispatch(updateSearchHistory(updatedHistory));
                            updateSearchHistoryInStorage(updatedHistory);
                        }}
                    />
                ))}
            </ul>

            {searchHistory.length > 0 && (
                <button
                    onClick={() => {
                        dispatch(updateSearchHistory([]));
                        updateSearchHistoryInStorage([]);
                    }}
                >
                    Clear All History
                </button>
            )}

            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default SearchUser;
