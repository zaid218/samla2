// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserList from './components/UserList/UserList';
import SearchUser from './components/SearchUser/SearchUser';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> 
          <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}> 
            <nav style={{ display: 'flex', justifyContent: 'space-between', width: '500px' }}>
              <Link to="/">
                <button>User List</button>
              </Link>
              <Link to="/search">
                <button>Search User</button>
              </Link>
            </nav>

            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/search" element={<SearchUser />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
