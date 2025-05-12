import React, { useEffect, useState } from "react";
import {
  getFavorites,
  removeFavorite,
} from "../../utils/favorites";
import "../../shared/trackListStyle.css";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/playerContext";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";


export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { setTrack } = usePlayer();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleUnfavorite = (trackId) => {
    removeFavorite(trackId);
    setFavorites(getFavorites());
  };

  return (
    <div className='screen-container'>
      <h2>My Favorite Tracks</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet 💔</p>
      ) : (
        <div className="track-list">
          {favorites.map((track) => (
            <div key={track.trackId} className="track-item">
              <div className="track-header">
                <p className="track-name">{track.trackName}</p>
                <div className="track-actions">
                  <button onClick={() => handleUnfavorite(track.trackId)}>
                    <MdFavorite />
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
          ))}
        </div>
      )}
    </div>
  );
}
