// redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to retrieve search history from local storage
const getSearchHistoryFromStorage = () => {
    const searchHistory = localStorage.getItem('searchHistory');
    return searchHistory ? JSON.parse(searchHistory) : [];
};

// Helper function to update search history in local storage

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});
const filterUsers = (users, term) => {
    return users.filter((user) => user.name === term); // Use strict equality for exact match
};

export const searchUser = createAsyncThunk('users/searchUser', async (term, { getState, dispatch }) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const filteredUsers = filterUsers(response.data, term);
        dispatch(updateSearchHistory([...getState().users.searchHistory, term]));
        return filteredUsers;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error; // Re-throw the error to handle it in the component
    }
});


const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        searchHistory: getSearchHistoryFromStorage(),
        isSorted: false,
    },
    reducers: {
        sortUsers: (state) => {
            state.isSorted = !state.isSorted;

            if (state.isSorted) {
                state.users = state.users.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
            } else {
                state.users = state.users.sort((a, b) => a.id - b.id);
            }
        },
        updateSearchHistory: (state, action) => {
            state.searchHistory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

export const { updateSearchHistory,sortUsers } = userSlice.actions;

export const selectUsers = (state) => state.users.users;
export const selectSearchHistory = (state) => state.users.searchHistory;

export default userSlice.reducer;
