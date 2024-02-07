// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserList from './components/UserList/UserList';
import SearchUser from './components/SearchUser/SearchUser';
import store from './store/store';  // Assuming you named your store configuration file as 'store.js'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">User List</Link>
              </li>
              <li>
                <Link to="/search">Search User</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/search" element={<SearchUser />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
