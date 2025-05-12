import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../shared/trackListStyle.css";
import {
    isFavorited,
    addFavorite,
    removeFavorite,
} from "../../utils/favorites";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/playerContext";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";


export default function AlbumPage() {
    const { id } = useParams();
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();
    const { setTrack } = usePlayer();

    useEffect(() => {
        async function fetchTracks() {
            try {
                const res = await axios.get("http://localhost:5000/api/album-tracks", {
                    params: { id }
                });
                setTracks(res.data);
            } catch (e) {
                console.error("Error fetching tracks", e);
            }
        }
        fetchTracks();
    }, [id]);

    return (
        <div className="screen-container">
            <h2>Tracks</h2>
            <div className="track-list">
                {tracks.map((track) => {
                    const fav = isFavorited(track.trackId);
                    return (
                        <div key={track.trackId} className="track-item">
                            <div className="track-header">
                                <p className="track-name">{track.trackName}</p>
                                <div className="track-actions">
                                    <button
                                        onClick={() => {
                                            fav ? removeFavorite(track.trackId) : addFavorite(track);
                                            setTracks((t) => [...t]);
                                        }}
                                    >
                                        <IconContext.Provider value={{ size: "20px", color: "#ffc5a1" }}>
                                            {fav ? <MdFavorite /> : <MdFavoriteBorder />}
                                        </IconContext.Provider>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTrack(track);
                                            navigate("/player");
                                        }}
                                    >
                                        <IconContext.Provider value={{ size: "20px", color: "#ffc5a1" }}>
                                            <FaPlay />
                                        </IconContext.Provider>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
