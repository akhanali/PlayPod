import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";

import { usePlayer } from "../../context/playerContext";
import {
    isFavorited,
    addFavorite,
    removeFavorite,
} from "../../utils/favorites";


export default function Search() {
    const [query, setQuery] = useState("");
    const [albums, setAlbums] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const { setTrack } = usePlayer();
    const [songs, setSongs] = useState([]);
    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const [albumRes, songRes] = await Promise.all([
                axios.get(`${process.env.REACT_APP_API_URL}/api/search`, {
                  params: { term: query },
                }),
                axios.get(`${process.env.REACT_APP_API_URL}/api/search-songs`, {
                  params: { term: query },
                }),
            ]);              

            setAlbums(albumRes.data);
            setSongs(songRes.data);
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
            <h3>Matching Songs</h3>
            <div className="track-list">
                {songs.length === 0 && searched && (
                    <p className="no-results">No matching songs found</p>
                )}
                {songs.map((track) => {
                    const fav = isFavorited(track.trackId);

                    return ( 
                        <div key={track.trackId} className="track-item">
                            <div className="track-header">
                                <p className="track-name">{track.trackName}</p>
                                <p className="track-artist">{track.artistName}</p> 
                                <IconContext.Provider value={{ size: "20px", color: "#ffc5a1" }}>
                                    <div className="track-actions">
                                        <button
                                            onClick={() => {
                                                setTrack(track);
                                                navigate("/player");
                                            }}
                                        >
                                            <FaPlay />
                                        </button>
                                        <button
                                            onClick={() => {
                                                fav ? removeFavorite(track.trackId) : addFavorite(track);
                                                setSongs((s) => [...s]);
                                            }}
                                        >
                                            {fav ? <MdFavorite /> : <MdFavoriteBorder />}
                                        </button>
                                    </div>
                                </IconContext.Provider>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
