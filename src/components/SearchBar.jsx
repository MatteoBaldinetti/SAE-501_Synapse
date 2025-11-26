import { useState } from "react";
import "../styles/Cours.css";

function SearchBar({ placeholder, data, onResults }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (onResults && data) {
            const filtered = data.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            onResults(filtered);
        }
    };

    return (
        <div className="search-container">
            <div className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </div>

            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="form-control search-input"
            />
        </div>
    );
}

export default SearchBar;