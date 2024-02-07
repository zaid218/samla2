// components/SearchHistoryItem.js

import React from 'react';

const SearchHistoryItem = ({ term, index, onDelete }) => {
    return (
        <li>
            {term}
            <button className="delete-button" onClick={() => onDelete(index)}>
                &#10060; {/* Unicode for red cross */}
            </button>
        </li>
    );
};

export default SearchHistoryItem;
