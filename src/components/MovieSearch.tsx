import React, { useState } from 'react';

interface MovieSearchProps {
    onSearch: (query: string) => void;
    onResetPage: () => void;
}

export const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch, onResetPage }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onResetPage();
        onSearch(query.trim() === '' ? 'all' : query);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ค้นหาภาพยนตร์..."
                    className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r"
                >
                    ค้าหา
                </button>
            </div>
        </form>
    );
};
