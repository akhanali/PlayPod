import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';


export default function Search() {
    const [query, setQuery] = useState("");
    const [albums, setAlbums] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const res = await axios.get("http://localhost:5000/api/search", {
                params: { term: query },
            });
            setAlbums(res.data);
            setSearched(true);
        } catch (e) {
            console.error("Search failed", e);
        }
    };

    return (
        <div className="screen-container">
            <h2>Search Music</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by artist or song..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>

            <div className="album-results">
                {searched && albums.length === 0 && (
                    <p className="no-results">No albums found for "{query}"</p>
                )}
                {albums.map((album) => (
                    <div
                        key={album.collectionId}
                        className="album-card"
                        onClick={() => navigate(`/album/${album.collectionId}`)}
                    >
                        <img src={album.artworkUrl100} alt={album.collectionName} />
                        <p className="album-title">{album.collectionName}</p>
                        <p className="album-artist">{album.artistName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
